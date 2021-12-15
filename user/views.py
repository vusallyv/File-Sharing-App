from django.shortcuts import render
from django.views.generic import View
from django.contrib import auth
from user.forms import LoginForm, RegisterForm
from user.models import User
# Create your views here.


class RegisterView(View):
    def get(self, request):
        context = {
            'title': 'Register',
            'form': RegisterForm
        }
        return render(request, 'register.html', context=context)

    def post(self, request, *args, **kwargs):
        print(request.POST)
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = User(
                username=form.cleaned_data['username'],
                email=form.cleaned_data['email'],
            )
            user.set_password(form.cleaned_data['password'])
            user.save()
            return render(request, 'login.html')
        return render(request, 'register.html', context={'form': form})


class LoginView(View):
    def get(self, request):
        context = {
            'title': 'Login',
            'form': LoginForm
        }
        return render(request, 'login.html', context=context)

    def post(self, request, *args, **kwargs):
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            user = User.objects.filter(email=email).first()
            if user and user.check_password(password):
                auth.login(request, user)
                return render(request, 'login.html', context={'form': form})
            else:
                return render(request, 'login.html', context={'form': form})
        return render(request, 'login.html', context={'form': form})
