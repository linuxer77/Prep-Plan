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
    desc = StringField(required=True)


class Problem(Document):
    name = StringField(required=True)
    desc = StringField(required=True)
    is_done = BooleanField(default=False)
    pattern = ReferenceField(Pattern)
    note = StringField()
    approachCode = StringField(default=True)
    solcode = StringField(default=True)
    url = StringField()
