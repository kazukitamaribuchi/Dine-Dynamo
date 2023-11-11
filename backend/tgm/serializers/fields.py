from datetime import datetime

import pytz
from rest_framework import serializers


class LastUpdatedAtField(serializers.Field):
    """最終更新日時."""

    def to_representation(self, value):
        tokyo_tz = pytz.timezone("Asia/Tokyo")
        now = datetime.now(tokyo_tz)
        delta = now - value

        days = delta.days

        if days < 30:
            return f"{days}日前"
        elif days < 365:
            months = days // 30
            return f"{months}か月前"
        else:
            years = days // 365
            return f"{years}年前"
