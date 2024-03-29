from enum import Enum
from typing import Union

import requests

INSTAGRAM_API_BASE_URL = "https://graph.facebook.com/v17.0"


class MEDIA_TYPE(Enum):
    """メディアタイプ."""

    CAROUSEL_ALBUM = "CAROUSEL_ALBUM"
    IMAGE = "IMAGE"
    VIDEO = "VIDEO"


class MEDIA_PRODUCT_TYPE(Enum):
    """メディアプロダクトタイプ."""

    AD = "AD"
    FEED = "FEED"
    STORY = "STORY"
    REELS = "REELS"


class APIEndPoint:
    """エンドポイント."""

    def __init__(self, business_account_id):
        self.business_account_id = business_account_id

    @property
    def BUSINESS_ACCOUNT(self):
        return f"{INSTAGRAM_API_BASE_URL}/{self.business_account_id}"

    @property
    def MEDIA(self):
        return f"{INSTAGRAM_API_BASE_URL}/{self.business_account_id}/media"

    @property
    def STORY(self):
        return f"{INSTAGRAM_API_BASE_URL}/{self.business_account_id}/stories"

    def MEDIA_DETAIL(self, media_id):
        return f"{INSTAGRAM_API_BASE_URL}/{media_id}"


def check_instagram_user(business_account_id: str, token: str):
    """ビジネスアカウントIDとトークンからユーザーの存在確認を行う."""

    APIPath = APIEndPoint(business_account_id)
    headers = {
        "Contet-Type": "application/json",
        "Authorization": f"Bearer {token}",
    }

    fields = [
        "username",
        "biography",
        "followers_count",
        "follows_count",
        "media_count",
        "name",
        "profile_picture_url",
        "website",
    ]
    params = {"fields": ",".join(fields)}
    response = requests.get(
        url=APIPath.BUSINESS_ACCOUNT, headers=headers, params=params
    ).json()

    return response


class InstagramAPIHandler:
    """インスタのAPIを扱うHandler."""

    def __init__(self, user_id: str = None):
        """初期設定.

        user_idを元DBからインスタの認証情報などを取得
        """

        self.setting()

    def setting(self) -> None:
        """APIの初期設定をセットする."""

        # TODO instagram_business_account_idをDBから取得
        self.business_account_id = "17841403279193745"

        self.APIPath = APIEndPoint(self.business_account_id)

        # TODO エラーハンドリング
        self.set_common_headers()
        self.get_basic_info()

    def set_common_headers(self) -> None:
        """共通のヘッダーを設定する処理.

        access_tokenはDBから取得
        """

        access_token = "EAALviXTZBIO4BO6GanNX1qcZB1AgddRZBOyG5LQPnzB2aARz5MQdpPMAJOjRwJFxH5ZA72BSZBoitJEhGlCYMFkvYA90ZA9U9OLkkxHiQX9WYon0jweLh3IQOdmbfUc50kQCZCJA3XzTp8lG9HQktaNsp33IZBratGDHkKLj44aewE1OUJNux9fOBlgDmWD1kfEZD"

        # TODO DBからアクセストークン取得
        self.headers = {
            "Contet-Type": "application/json",
            "Authorization": f"Bearer {access_token}",
        }

    def get_basic_info(self) -> None:
        """Instagramの基本情報を取得し設定する関数."""

        print("インスタグラムの基本情報を取得しセットします。")

        fields = [
            "username",
            "biography",
            "followers_count",
            "follows_count",
            "media_count",
            "name",
            "profile_picture_url",
            "website",
        ]

        params = {"fields": ",".join(fields)}
        response = requests.get(
            url=self.APIPath.BUSINESS_ACCOUNT, headers=self.headers, params=params
        ).json()

        # print(response)

        for key, value in response.items():
            setattr(self, key, value)

    def get_users_media_list(self) -> list:
        """ユーザーのメディア一覧を取得する."""

        print("ユーザーのメディアID一覧を取得します。")

        result = []
        response = requests.get(url=self.APIPath.MEDIA, headers=self.headers).json()
        result += response["data"]
        after = (
            response["paging"]["cursors"]["after"]
            if "after" in response["paging"]["cursors"]
            else ""
        )

        while after:
            param = {"after": after}
            response = requests.get(
                url=self.APIPath.MEDIA, headers=self.headers, params=param
            ).json()
            result += response["data"]
            try:
                after = response["paging"]["cursors"]["after"]
            except KeyError:
                break

        print(result)

        return result

    def get_users_story_list(self) -> list:
        """ユーザーのストーリー一覧を取得する."""

        print("ユーザーのストーリーID一覧を取得します。")
        result = []
        response = requests.get(url=self.APIPath.STORY, headers=self.headers).json()
        result += response["data"]

        print(result)
        return result

    def get_users_media_detail(self, insight=False) -> list:
        """ユーザーのメディア詳細一覧を取得する."""

        print("ユーザーのメディア詳細一覧を取得します。")

        result = []
        users_media_list = self.get_users_media_list()

        fields = [
            "id",
            "like_count",
            "media_type",
            "media_product_type",
            "permalink",
            "timestamp",
            "username",
            "media_url",
            "thumbnail_url",
            "caption",
            "is_comment_enabled",
            # "comments_count",
            # "is_shared_to_feed",
            # "comments{id,hidden,text,timestamp,user,username,like_count,replies{id,timestamp,text,username,like_count,parent_id}}",
        ]

        for media in users_media_list:
            print("メディア詳細取得")
            params = {"fields": ",".join(fields)}
            response = requests.get(
                url=self.APIPath.MEDIA_DETAIL(media["id"]),
                headers=self.headers,
                params=params,
            ).json()

            print("メディア詳細取得終了")

            if insight:
                # メディアタイプによって分岐してinsights取得
                # print("★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★")
                response["insight"] = self.get_users_media_insights(
                    media["id"], response["media_type"], response["media_product_type"]
                )
            result.append(response)

        print("★★★★★★★★★★★最終結果★★★★★★★★★★★")
        print(result)

        return result

    def get_users_story_detail(self) -> list:
        """ユーザーのストーリー詳細一覧を取得する."""

        result = []
        users_story_list = self.get_users_story_list()

        fields = [
            "id",
            "caption",
            "media_type",
            "media_url",
            "comments_count",
            "like_count",
            "permalink",
            "thumbnail_url",
            "timestamp",
            "username",
            "media_product_type",
        ]

        for story in users_story_list:
            print("ストーリー詳細取得")
            params = {"fields": ",".join(fields)}
            response = requests.get(
                url=self.APIPath.MEDIA_DETAIL(story["id"]),
                headers=self.headers,
                params=params,
            ).json()

            print(response)
            print("ストーリー詳細取得終了")

            response["insight"] = self.get_users_media_insights(
                story["id"], response["media_type"], response["media_product_type"]
            )
            result.append(response)

        print("★★★★★★★★★★★最終結果★★★★★★★★★★★")
        print(result)

        return result

    def get_users_media_insights(
        self, media_id: str, media_type: str, media_product_type: str
    ) -> Union[dict, None]:
        """メディアのインサイトを取得する.

        まとめて取得しマージした結果を返す
        """

        print("メディアインサイト取得")

        if media_product_type == MEDIA_PRODUCT_TYPE.STORY.value:
            fields = [
                "exits",
                "impressions",
                "reach",
                "replies",
                "taps_forward",
                "taps_back",
                # "follows",
                # "navigation",
                # "profile_activity",
                # "profile_visits",
                # "shares",
                # "total_interactions",
            ]
        elif media_product_type == MEDIA_PRODUCT_TYPE.REELS.value:
            fields = [
                "comments",
                "likes",
                "plays",
                "reach",
                "saved",
                "shares",
                "total_interactions",
            ]
        elif media_product_type == MEDIA_PRODUCT_TYPE.FEED.value:
            fields = [
                "engagement",
                "impressions",
                "reach",
                "saved",
                "video_views",
                "carousel_album_engagement",
                "carousel_album_impressions",
                "carousel_album_reach",
                "carousel_album_saved",
                "carousel_album_video_views",
                # "comments",
                # "follows",
                # "likes",
                # "profile_activity",
                # "profile_visits",
                # "shares",
                # "total_interactions",
            ]
        else:
            return None

        params = {"fields": "insights.metric({})".format(",".join(fields))}
        response = requests.get(
            url=self.APIPath.MEDIA_DETAIL(media_id), headers=self.headers, params=params
        ).json()

        # print(response)
        print("メディアインサイト取得終了")

        return response

    def get_users_media_info(self):
        """Instagramのユーザーのメディア情報一覧を返す関数."""

        # TODO 上限まで取得した時の挙動確認し状況次第で対応

        url = f"{INSTAGRAM_API_BASE_URL}/{self.business_account_id}"

        # TODO ユーザー名をどこで入れるか？
        params = {
            # "fields": f"business_discovery.username({self.username}){{followers_count,media_count,media{{comments_count,like_count,media_url,caption,timestamp,media_type,media_product_type,permalink}}}}"
            "fields": f"business_discovery.username({self.username}){{media{{comments_count,like_count,media_url,caption,timestamp,media_type,media_product_type,permalink}}}}"
        }
        response = requests.get(url, headers=self.headers, params=params).json()

        # VIDEOの場合はサムネイルを個別で取得する
        result = response["business_discovery"]["media"]["data"]

        for data in result:
            if data["media_type"] == "VIDEO":
                data["thumbnail_url"] = self.get_media_thumbnail_url(data["id"])

        return result

    def get_media_thumbnail_url(self, media_id):
        """VIDEOのサムネイルを取得する."""

        params = {"fields": "thumbnail_url"}

        response = requests.get(
            url=self.APIPath.MEDIA_DETAIL(media_id),
            headers=self.headers,
            params=params,
        ).json()

        return response["thumbnail_url"]
