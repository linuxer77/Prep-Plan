from app.models import Pattern, Problem
from rest_framework_mongoengine import serializers


class PatternSerializer(serializers.DocumentSerializer):
    class Meta:
        model = Pattern
        fields = "__all__"


class ProblemSerializer(serializers.DocumentSerializer):
    class Meta:
        model = Problem
        fields = "__all__"
