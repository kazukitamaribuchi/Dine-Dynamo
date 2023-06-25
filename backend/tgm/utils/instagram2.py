import requests

# TODO ユーザー毎のアクセストークンを動的に取得 DB必要
access_token = "EAACDWqv1OZCkBAIJvge4ZCysb1v9VczYTGJtS1D2IOmlYqkvcrb9nyZBqx7CBSirDgsZAL35C5JA5WLXlQk4Qlb2SUGxXnJkF5xLPJB6qTZBZClSK6mtAqO6N2qXAw8hPdwqezxz5PLMh8amMDnFbDR9sZBGpM7CXUUtg1ShM9kkKRqfjPeZC51R9ZBjoZBJC31WQZD"
# access_token = "EAAEPYVgwnQoBAHHA3H3mQhVzykLQDhODOc6OWqZAtnwzcAZCZB4ZAbmuypOCQ9qawlyVogVXOQZABZC9ZBhgCvbEZCHEP40u5ZASJcNVTjylwDJAlon3uzXQBrZBcxO0hLs40KKVzBjjgooZB12QC9dA9TlmHKqnuwArfZAnhvYoRmHKrtkEHufhVs3aZAvPyBjCnuJZBoBBKMQgyGlFq73Uc6yeVonjagu3ipLS0oaaUs5HPSN3rib132IvZCn"
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


def get_cocacola_info():
    # TODO認証エラー
    response = requests.get("https://graph.facebook.com/cocacola", verify=False).json()

    return response


result1 = get_users_media_info()
print("result1 :")
print(result1)

print("======================")
result2 = get_users_other_info()
print("result2:")
print(result2)

print("======================")
result3 = get_cocacola_info()
print("result3:")
print(result3)
