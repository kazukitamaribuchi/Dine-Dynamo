import {
  loginUserAccessTokenAtom,
  loginUserIdAtom,
  loginUserRefreshTokenAtom
} from "@/store/atoms";
import { AxiosClient } from "@/utils/axiosClient";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useGetTokensFromStore } from "../useGetTokensFromStore";
import { API_URL } from "./urls";

// 各コンポーネントからAPIにリクエストを送るための認証情報となるAccessTokenをAPIから取得するためのhooks
export const useAccessToken = () => {
  const [loginUserId] = useAtom(loginUserIdAtom);
  const [loginUserAccessToken, setLoginUserAccessToken] = useAtom(
    loginUserAccessTokenAtom
  );
  const [loginUserRefreshToken, setLoginUserRefreshToken] = useAtom(
    loginUserRefreshTokenAtom
  );

  const { token, refreshToken } = useGetTokensFromStore();
  const [finalToken, setFinalToken] = useState<string | null>(null);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (loginUserId) {
      const obtain_jwt_token = async () => {
        // storeのトークンが存在する場合、検証を行う
        if (token) {
          try {
            const varifyResponse = await AxiosClient({
              url: `${API_URL.AUTH}/token/verify/`,
              method: "POST",
              data: {
                token: token
              }
            });

            // 有効なトークンならstoreのトークンを使用する
            // console.log("storeのトークンはまだ有効なので使用する", token);
            setFinalToken(token);
            return;
          } catch (err) {
            // console.log("無効なトークン");
          }
        }

        if (refreshToken) {
          try {
            const refreshResponse = await AxiosClient({
              url: `${API_URL.AUTH}/token/refresh/`,
              method: "POST",
              data: {
                refresh: refreshToken
              }
            });
            // console.log(
            //   "リフレッシュトークンからトークンを再発行: ",
            //   refreshResponse.data.access
            // );
            setFinalToken(refreshResponse.data.access);
            setLoginUserAccessToken(refreshResponse.data.access);
            return;
          } catch (err) {
            // console.log("リフレッシュトークンが無効");
          }
        }

        try {
          const response = await AxiosClient({
            url: "api/auth/token/",
            method: "POST",
            data: {
              auth0_id: loginUserId
            }
          });
          // console.log("再発行したトークン: ", response.data);

          setFinalToken(response.data.access_token);
          setLoginUserAccessToken(response.data.access_token);
          setLoginUserRefreshToken(response.data.refresh_token);
          return;
        } catch (err) {
          setError(err);
          return;
        }
      };
      if (finalToken == null) {
        obtain_jwt_token();
      }
    }
  }, [loginUserId, token, refreshToken]);

  return { finalToken, error };
};
