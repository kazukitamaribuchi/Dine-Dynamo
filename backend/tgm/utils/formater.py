import pytz


def utc_to_jst(timestamp_utc):
    """Utcの時刻をjstで分かりやすく表示する."""

    tokyo_tz = pytz.timezone("Asia/Tokyo")
    datetime_jst = timestamp_utc.astimezone(tokyo_tz)
    return datetime_jst
