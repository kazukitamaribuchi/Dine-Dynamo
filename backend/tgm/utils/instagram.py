import requests


INSTAGRAM_API_BASE_URL = "https://graph.facebook.com/v16.0"


# TODO ユーザー毎のアクセストークンを動的に取得 DB必要
access_token = "EAACDWqv1OZCkBAIJvge4ZCysb1v9VczYTGJtS1D2IOmlYqkvcrb9nyZBqx7CBSirDgsZAL35C5JA5WLXlQk4Qlb2SUGxXnJkF5xLPJB6qTZBZClSK6mtAqO6N2qXAw8hPdwqezxz5PLMh8amMDnFbDR9sZBGpM7CXUUtg1ShM9kkKRqfjPeZC51R9ZBjoZBJC31WQZD"

# TODO ユーザー毎のIDを動的に取得 DB必要
instagram_business_account_id = "17841459125073071"


def get_users_media_list() -> list:
    """Instagramのユーザーのメディア一覧を返す関数."""

    url = f"{INSTAGRAM_API_BASE_URL}/{instagram_business_account_id}/media"

    result = []
    headers = {
        "Contet-Type": "application/json",
        "Authorization": f"Bearer {access_token}",
    }
    response = requests.get(url, headers=headers).json()
    result += response["data"]
    after = (
        response["paging"]["cursors"]["after"]
        if "after" in response["paging"]["cursors"]
        else ""
    )

    while after:
        param = {"after": after}
        response = requests.get(url, headers=headers, params=param).json()
        result += response["data"]
        try:
            after = response["paging"]["cursors"]["after"]
        except KeyError:
            break

    return result


def get_users_media_detail() -> list:
    """Instagramのユーザーのメディア詳細一覧を取得する関数."""

    result = []
    users_media_list = get_users_media_list()

    for media_id in users_media_list:
        url = f"{INSTAGRAM_API_BASE_URL}/{media_id['id']}"
        headers = {
            "Contet-Type": "application/json",
            "Authorization": f"Bearer {access_token}",
        }
        params = {"fields": "id,like_count,comments_count,media_url,thumbnail_url"}
        response = requests.get(url, headers=headers, params=params).json()
        result.append(response)

    return result


def get_users_media_info():
    """Instagramのユーザーの情報一覧を返す関数."""

    url = (
        f"{INSTAGRAM_API_BASE_URL}/{instagram_business_account_id}"
        + "?fields=business_discovery.username(yoshiyoshitanabe){followers_count,media_count,media{comments_count,like_count,media_url,caption}}"
    )

    headers = {
        "Contet-Type": "application/json",
        "Authorization": f"Bearer {access_token}",
    }
    response = requests.get(url, headers=headers).json()
    return response


result = get_users_media_info()
print(result)
