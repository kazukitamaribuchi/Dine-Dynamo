import BaseView from "./BaseView";

import { AuthView } from "./AuthView";
import { Header } from "../templates/Header";

import { loginUserIdAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { useAccessToken } from "@/hooks/api/useAccessToken";
import { useGetUserDetail } from "@/hooks/api/useGetUserDetail";
import { useEffect } from "react";
import axios from "axios";

export default function DashBoardView(props) {
  const [loginUserId] = useAtom(loginUserIdAtom);

  const { finalToken: token, error: accessTokenError } = useAccessToken();

  const { userDetail, error } = useGetUserDetail({
    auth0_id: loginUserId,
    token: token,
  });

  console.log("userDetail: ", userDetail);

  console.log("subscription: ", props);

  return (
    <AuthView>
      <BaseView title="index">
        <Header />
        <div>dashboard</div>
      </BaseView>
    </AuthView>
  );
}
