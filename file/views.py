from django.db.models.query_utils import Q
from django.http.response import FileResponse, Http404
from django.shortcuts import render
from django.views.generic import ListView
from django.views.generic.detail import DetailView
from file.forms import CommentForm

from file.models import File, FileAccess
# Create your views here.


class MyFilesView(ListView):
    template_name = 'myfiles.html'

    def get_queryset(self):
        accessed_files = File.objects.filter(
            Q(fileaccess__user=self.request.user) | Q(user=self.request.user))
        return accessed_files

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'My Files'
        context['files'] = self.get_queryset()
        return context


class FileDetailView(DetailView):
    template_name = 'file_detail.html'
    model = File

    def get(self, request, pk):
        try:
            file = File.objects.get(pk=pk)
        except File.DoesNotExist:
            raise Http404("File does not exist")
        response = FileResponse(open(file.file.path, 'rb'))
        response['Content-Disposition'] = 'inline; filename="{}"'.format(
            file.file.name)
        return response
        # else:
        #     form = CommentForm(request.POST)
        #     if form.is_valid():
        #         file = self.get_object()
        #         file.comments.create(
        #             user=request.user,
        #             file=file,
        #             comment=request.data['comment']
        #         )
        #         return render(request, 'file_detail.html', context={'file': file, 'form': CommentForm})
        #     return render(request, 'file_detail.html', context={'file': self.get_object(), 'form': form})


class FileCommentView(DetailView):
    template_name = 'file_detail.html'
    model = File

    def get(self, request, pk):
        context = {
            'title': 'Comment',
            'form': CommentForm,
            'file': self.get_object()
        }
        return render(request, 'file_detail.html', context=context)

    def post(self, request, pk):
        try:
            file = File.objects.get(pk=pk)
        except File.DoesNotExist:
            raise Http404("File does not exist")
        form = CommentForm(request.POST)
        if FileAccess.objects.filter(user=request.user, file=file, can_comment=True).exists():
            if form.is_valid():
                file.comments.create(
                    user=request.user,
                    file=file,
                    content=request.POST.get('comment')
                )
                return render(request, 'file_detail.html', context={'file': file, 'form': CommentForm})
            return render(request, 'file_detail.html', context={'file': self.get_object(), 'form': CommentForm})
        else:
            return render(request, 'file_detail.html', context={'file': file, 'form': CommentForm, 'error': 'You do not have permission to comment on this file'})