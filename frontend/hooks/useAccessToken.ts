import { loginUserAccessTokenAtom, loginUserIdAtom } from "@/store/atoms";
import { AxiosClient } from "@/utils/axiosClient";
import { useAuth0 } from "@auth0/auth0-react";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

// 各コンポーネントからAPIにリクエストを送るための認証情報となるAccessTokenをAPIから取得するためのhooks
export const useAccessToken = () => {
  const [token, setToken] = useState(null);

  const [loginUserId, setLoginUserId] = useAtom(loginUserIdAtom);
  const [loginUserAccessToken, setLoginUserAccessToken] = useAtom(
    loginUserAccessTokenAtom
  );

  useEffect(() => {
    // ログイン時じゃなければエラーになるのでログイン時のみAccessTokenの取得を試みる
    // AuthViewにてログイン状況を各ページで確認しstoreに保存しているので、storeで判断
    if (loginUserId) {
      const obtain_jwt_token = async () => {
        const response = await AxiosClient({
          url: "api/auth/jwt/",
          method: "POST",
          data: {
            auth0_id: loginUserId,
          },
        });
        console.log("response", response);
        setLoginUserAccessToken(response.data.token);
        setToken(response.data.token);
      };

      obtain_jwt_token();
    }
  }, [loginUserId]);

  return { token };
};
