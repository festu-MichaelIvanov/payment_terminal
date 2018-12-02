from django.views.generic.base import TemplateView


class IndexView(TemplateView):
    """
    Base entry point for app
    """
    template_name = 'core/index.html'
