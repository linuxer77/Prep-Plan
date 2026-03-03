from django.urls import path, include
from .views import (
    getAllPatterns,
    addPattern,
    deletePattern,
    updatePattern,
    addProblem,
    deleteProblem,
    updateProblem,
    getAllProblemsByPattern,
)


urlpatterns = [
    path("pattern/list", getAllPatterns),
    path("pattern/add", addPattern),
    path("pattern/delete/<str:id>", deletePattern),
    path("pattern/update/<str:id>", updatePattern),
    path("problem/add", addProblem),
    path("problem/<str:id>", getAllProblemsByPattern),
    path("problem/delete/<str:id>", deleteProblem),
    path("problem/update/<str:id>", updateProblem),
]
