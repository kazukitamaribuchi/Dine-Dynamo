import { useAuth0 } from "@auth0/auth0-react";

import React, { ReactElement, useEffect } from "react";
import { useAtom } from "jotai";
import { isLoadingDataAtom, loginUserIdAtom } from "@/store/atoms";

interface Props {
  children: ReactElement;
}

export const AuthView = (props: Props) => {
  // auth0のログイン状況を確認するコンポーネント
  // auth0_idのみstoreに保存する
  // 有効期限が切れていたらuser取れないので、その際はstoreのuser情報初期化してログイン画面へリダイレクトさせる

  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const [loginUserId, setLoginUserId] = useAtom(loginUserIdAtom);
  const [isLoadingData, setIsLoadingData] = useAtom(isLoadingDataAtom);
  setIsLoadingData(true);

  useEffect(() => {
    setIsLoadingData(isLoading);
    if (!isLoading) {
      if (user && isAuthenticated) {
        // Auth0ユーザー情報取得が成功したらstoreにセットして、アプリAPIからユーザー情報取得
        let auth0_id: string | null = null;
        if (user.sub != undefined) {
          auth0_id = user.sub;
        }
        setLoginUserId(auth0_id);
      }

      // ローディングが終了したが、認証フラグfalseの場合はログイン画面へリダイレクト
      if (!isAuthenticated) {
        // storeのユーザー情報初期化
        setLoginUserId(null);
        loginWithRedirect();
      }
    }
  }, [isLoading]);

  // storeにユーザーIDがあるか、ユーザー情報取得出来たら画面を表示
  if (loginUserId != null || isAuthenticated) {
    return props.children;
  }

  // // storeに存在しない場合はローディングが終わるまで画面を表示しない。
  // // ログイン前はstoreに存在しないのでauth0のログインを確認しないとユーザー情報取得出来ない
  return <></>;
};
