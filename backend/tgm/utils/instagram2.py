import requests

# TODO ユーザー毎のアクセストークンを動的に取得 DB必要
access_token = "EAACDWqv1OZCkBAIJvge4ZCysb1v9VczYTGJtS1D2IOmlYqkvcrb9nyZBqx7CBSirDgsZAL35C5JA5WLXlQk4Qlb2SUGxXnJkF5xLPJB6qTZBZClSK6mtAqO6N2qXAw8hPdwqezxz5PLMh8amMDnFbDR9sZBGpM7CXUUtg1ShM9kkKRqfjPeZC51R9ZBjoZBJC31WQZD"

# TODO ユーザー毎のIDを動的に取得 DB必要
instagram_business_account_id = "17841459125073071"

INSTAGRAM_API_BASE_URL = "https://graph.facebook.com/v17.0"


def get_users_media_info():
    url = f"{INSTAGRAM_API_BASE_URL}/{instagram_business_account_id}/media"

    headers = {
        "Contet-Type": "application/json",
        "Authorization": f"Bearer {access_token}",
    }
    response = requests.get(url, headers=headers).json()

    return response


def get_users_other_info():
    # TODO認証エラー
    url = f"{INSTAGRAM_API_BASE_URL}/{instagram_business_account_id}/albums"

    headers = {
        "Contet-Type": "application/json",
        "Authorization": f"Bearer {access_token}",
    }
    response = requests.get(url, headers=headers).json()

    return response


def get_id_info():
    url = f"{INSTAGRAM_API_BASE_URL}/ig_hashtag_search?user_id={instagram_business_account_id}&q=coke&access_token={access_token}"
    response = requests.get(url).json()
    return response["data"][0]["id"]


def get_cocacola_info():
    # TODO認証エラー
    response = requests.get("https://graph.facebook.com/cocacola", verify=False).json()

    return response


def get_recent_media_info():
    # ハッシュタグIDをキーにして、最新投稿順またはこう評価順に検索をかける
    HASHTAG_ID = get_id_info()
    url = (
        f"{INSTAGRAM_API_BASE_URL}/{HASHTAG_ID}/recent_media"
        + "?user_id={instagram_business_account_id}&fields=id,media_type,media_url,permalink&"
        + "access_token={access_token}"
    )
    response = requests.get(url).json()
    return response


result1 = get_users_media_info()
print("get_users_media_info :")
print(result1)

print("======================")
result2 = get_users_other_info()
print("result2:")
print(result2)

print("======================")
result3 = get_cocacola_info()
print("get_cocacola_info:")
print(result3)


print("======================")
result4 = get_id_info()
print("get_id_info:")
print(result4)


print("======================")
result5 = get_recent_media_info()
print("get_recent_media_info:")
print(result5)
