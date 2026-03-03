from bson.json_util import default
from mongoengine import (
    Document,
    ReferenceField,
    StringField,
    IntField,
    BooleanField,
    DateTimeField,
)
from datetime import datetime


class Pattern(Document):
    name = StringField(required=True)
    desc = StringField(null=True)


class Problem(Document):
    name = StringField(required=True)
    is_done = BooleanField(default=False)
    pattern = ReferenceField(Pattern)
    note = StringField()
    approachCode = StringField(default="")
    solcode = StringField(default="")
    url = StringField()
    timetaken = DateTimeField(null=True)
    difficulty = StringField(null=True)
