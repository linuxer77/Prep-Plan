from django.urls import path, include
from .views import (
    getAllPatterns,
    addPattern,
    addProblem,
    deletePattern,
    deleteProblem,
    getAllProblemsByPattern,
)


urlpatterns = [
    path("pattern/list", getAllPatterns),
    path("pattern/add", addPattern),
    path("pattern/delete/<str:id>", deletePattern),
    path("problem/add", addProblem),
    path("problem/<str:id>", getAllProblemsByPattern),
    path("problem/delete/<str:id>", deleteProblem),
]
