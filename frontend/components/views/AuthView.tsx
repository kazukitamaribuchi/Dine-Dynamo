import { useAuth0 } from "@auth0/auth0-react";
import { Spin } from "antd";

import { LoadingSpin } from "../elements/LoadingSpin";

import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  isLoadingUserInfoAtom,
  loginUserAccessTokenAtom,
  loginUserAtom,
  loginUserIdAtom,
} from "@/store/atoms";

interface Props {
  children: any;
}

const RedirectToLogin: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  loginWithRedirect();
  return <></>;
};

export const AuthView = (props: Props) => {
  // auth0のログイン状況を確認するコンポーネント
  // auth0_idのみstoreに保存する
  // 有効期限が切れていたらuser取れないので、その際はstoreのuser情報初期化してログイン画面へリダイレクトさせる

  const [loginUserId, setLoginUserId] = useAtom(loginUserIdAtom);
  const [loginUserAccessToken, setLoginUserAccessToken] = useAtom(
    loginUserAccessTokenAtom
  );
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useAtom(
    isLoadingUserInfoAtom
  );

  const initUserInfo = () => {
    setLoginUserId(null);
    setLoginUserAccessToken(null);
    setIsLoadingUserInfo(false);
  };

  const { user, isAuthenticated, isLoading } = useAuth0();

  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    setIsLoadingUserInfo(isLoading);
    if (!isLoading) {
      if (user && isAuthenticated) {
        // Auth0ユーザー情報取得が成功したらstoreにセットして、アプリAPIからユーザー情報取得
        console.log("ログインユーザー: ", user);

        let auth0_id: string | null = null;
        if (user.sub != undefined) {
          auth0_id = user.sub;
        }
        setLoginUserId(auth0_id);
      }
      if (loginUserId && !isAuthenticated) {
        // storeのユーザー情報初期化
        initUserInfo();
        loginWithRedirect();
      }
    }
  }, [user, isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <>
        <LoadingSpin />
      </>
    );
  }

  if (isAuthenticated) {
    return props.children;
  }
};
