from django.shortcuts import render
from django.template import RequestContext, TemplateDoesNotExist


class StatusCodeMiddleware(object):
    """
    Returns the status_code.html file for the response.
    """

    def process_response(self, request, response):
        status_code = getattr(response, "status_code", None)
        print(status_code)
        if status_code and status_code >= 400:
            template = "%s.html" % status_code
            try:
                response = render(
                    template,
                    {"content": response.content},
                    # context_instance=RequestContext(request),
                )
                response.status_code = status_code
            except TemplateDoesNotExist:
                pass

        return response


def simple_middleware(get_response):
    # One-time configuration and initialization.
    def middleware(request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        response = get_response(request)
        if response.status_code >= 400:
            template = "404page.html"
            try:
                response = render(
                    template_name=template,
                    request=request,
                )
            except TemplateDoesNotExist:
                pass
        # Code to be executed for each request/response after
        # the view is called.
        return response
    return middleware