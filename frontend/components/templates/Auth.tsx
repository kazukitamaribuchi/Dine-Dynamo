import { useUser } from "@auth0/nextjs-auth0/client";
import { Spin } from "antd";

import { useRouter } from "next/router";

import lscache from "lscache";
import { useEffect } from "react";

interface Props {
  children: any;
}

export const Auth = (props: Props) => {
  const { user, error, isLoading } = useUser();

  const router = useRouter();

  useEffect(() => {
    console.log("キャッシュ情報", lscache.get("loginUser"));
    console.log(user);
    console.log(error);
    console.log(isLoading);

    if (!lscache.get("loginUser")) {
      // user情報が空の場合はauth0からauth0_idを取得
      if (isLoading) {
        return <Spin tip="Loading..."></Spin>;
      }

      if (user == undefined) {
        // どちらにもuser情報が無い場合、ログイン画面へリダイレクト
        router.push("/api/auth/login");
      } else {
        // localStorageに無いがauth0の有効期限が切れていなかった場合再セット
        // ※ユーザーがlocalStorage削除しない限りあまりないケースだと思われる。
        // 2592000秒 => 30日間 43200分
        lscache.set("loginUser", JSON.stringify(user), 43200);
      }
    }
  }, [user, isLoading]);

  return props.children;
};
