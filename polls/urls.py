from django.urls import path

from . import views

app_name = 'polls'
urlpatterns = [
    # path('', views.IndexView.as_view(), name='index'),
    # path('<int:pk>/', views.DetailView.as_view(), name='detail'),
    # # path('<int:pk>/results/', views.ResultsView.as_view(), name='results'),
    # path('<int:pk>/drag/', views.DragView.as_view(), name='drag'),
    path('<int:pk>/graphs/', views.GraphView.as_view(), name='graph'),
    path('<int:pk>/graphs/run', views.RunView.as_view(), name='run'),

    # path('<int:pk>/graphs/results', views.RunView.as_view(), name='results'),

    # path('<int:question_id>/vote/', views.vote, name='vote'),
]
