import BaseView from "./BaseView";

import { AuthView } from "./AuthView";
import { Header } from "../templates/Header";

import { useAxiosRequest } from "@/hooks/useAxiosRequest";
import { useEffect } from "react";
import { API_URL } from "@/api/urls";

import {
  loginUserAccessTokenAtom,
  loginUserAtom,
  loginUserIdAtom,
} from "@/store/atoms";
import { useAtom } from "jotai";
import { getAccessToken } from "@/api/jwt";
import { getUserDetail } from "@/api/user";

export default function DashBoardView() {
  // 基本情報は既に取得したので詳細情報取得
  // 　➡このViewでのLoading（スケルトン）へ

  const [loginUserId, setLoginUserId] = useAtom(loginUserIdAtom);
  const [loginUser, setLoginUser] = useAtom(loginUserAtom);
  const [loginUserAccessToken, setLoginUserAccessToken] = useAtom(
    loginUserAccessTokenAtom
  );

  // auth0から取得したauth0_idをを元にAPPのAPIからtoken取得
  useEffect(() => {
    if (loginUserId) {
      const obtain_jwt = async () => {
        const response = await getAccessToken({ auth0_id: loginUserId });
        const token = response.token;
        const refresh = response.refresh;

        // TODO 有効期限等どうするか
        setLoginUserAccessToken(token);
      };
      obtain_jwt();
    }
  }, [loginUserId]);

  // トークン取得出来たらAPIから情報読み込む。
  // 各サービスのトークンはサーバー側で扱う。
  useEffect(() => {
    if (loginUserId && loginUserAccessToken) {
      const fetchUserDetail = async () => {
        const response = await getUserDetail({
          auth0_id: loginUserId,
          token: loginUserAccessToken,
        });
        const user = response.user;
        console.log("user: ", user);
      };
      fetchUserDetail();
    }
  }, [loginUserId, loginUserAccessToken]);

  return (
    <AuthView>
      <BaseView title="index">
        <Header />
        <div>dashboard</div>
      </BaseView>
    </AuthView>
  );
}
