import BaseView from "./BaseView";

import { AuthView } from "./AuthView";
import { Header } from "../templates/Header";

import { loginUserIdAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { useAccessToken } from "@/hooks/api/useAccessToken";
import { useGetUserDetail } from "@/hooks/api/useGetUserDetail";

export default function DashBoardView() {
  const [loginUserId] = useAtom(loginUserIdAtom);

  const { finalToken: token, error: accessTokenError } = useAccessToken();

  const { userDetail, error } = useGetUserDetail({
    auth0_id: loginUserId,
    token: token,
  });

  console.log("userDetail: ", userDetail);

  return (
    <AuthView>
      <BaseView title="index">
        <Header />
        <div>dashboard</div>
      </BaseView>
    </AuthView>
  );
}
