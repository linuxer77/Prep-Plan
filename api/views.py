from .serializers import PatternSerializer, ProblemSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from app.models import Pattern, Problem

from api import serializers


@api_view(["POST"])
def addPattern(request):
    serializer = PatternSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def getAllPatterns(request):
    patterns = Pattern.objects.all()
    serializer = PatternSerializer(patterns, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["DELETE"])
def deletePattern(request, id):
    try:
        pattern = Pattern.objects.get(id=id)
    except Pattern.DoesNotExist:
        return Response({"detail": "Pattern not found."})
    else:
        pattern.delete()
        return Response(status=status.HTTP_200_OK)


@api_view(["PUT"])
def updatePattern(request, id):
    try:
        pattern = Pattern.objects.get(id=id)
    except Pattern.DoesNotExist:
        return Response({"detail": "Pattern not found."})
    else:
        serializer = PatternSerializer(pattern, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def addProblem(request):
    serializer = ProblemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def getAllProblemsByPattern(request, id):
    problems = Problem.objects.filter(pattern=id)
    serializer = ProblemSerializer(problems, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["DELETE"])
def deleteProblem(request, id):
    try:
        problem = Problem.objects.get(id=id)
    except Problem.DoesNotExist:
        return Response({"detail": "Problem not found."})
    else:
        problem.delete()
        return Response(status=status.HTTP_200_OK)


@api_view(["PUT"])
def updateProblem(request, id):
    try:
        Problem = Problem.objects.get(id=id)
    except Problem.DoesNotExist:
        return Response({"detail": "Pattern not found."})
    else:
        serializer = ProblemSerializer(Problem, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
