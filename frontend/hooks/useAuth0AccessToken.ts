import { loginUserAccessTokenAtom, loginUserIdAtom } from "@/store/atoms";
import { useAuth0 } from "@auth0/auth0-react";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

// Auth0のAccessTokenを取得するためのhooks
export const useAuth0AccessToken = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [loginUserId, setLoginUserId] = useAtom(loginUserIdAtom);

  const [isLoadingToken, setIsLoadingToken] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  const [loginUserAccessToken, setLoginUserAccessToken] = useAtom(
    loginUserAccessTokenAtom
  );

  useEffect(() => {
    // ログイン時じゃなければエラーになるのでログイン時のみAccessTokenの取得を試みる
    // AuthViewにてログイン状況を各ページで確認しstoreに保存しているので、storeで判断
    if (loginUserId) {
      const fetchToken = async () => {
        setIsLoadingToken(true);
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
        setIsLoadingToken(false);
      };
      fetchToken();
    }
    // トークン取得結果やログイン状況が変わる度に処理させる。
  }, [getAccessTokenSilently, loginUserId]);

  return { token, isLoadingToken };
};
