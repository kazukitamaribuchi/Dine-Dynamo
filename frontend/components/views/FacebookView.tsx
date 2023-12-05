import BaseDashboardView from "./BaseDashboardView";

import { AuthView } from "./AuthView";

import { loginUserIdAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { useAccessToken } from "@/hooks/api/useAccessToken";
import { useGetUserDetail } from "@/hooks/api/useGetUserDetail";

export default function FacebookView(props: any) {
  const [loginUserId] = useAtom(loginUserIdAtom);

  const { finalToken: token, error: accessTokenError } = useAccessToken();

  const { userDetail, error } = useGetUserDetail({
    auth0Id: loginUserId,
    token: token
  });

  console.log("userDetail: ", userDetail);
  console.log("subscription: ", props);

  return (
    <AuthView>
      <BaseDashboardView title="index">
        <div>Facebook</div>
      </BaseDashboardView>
    </AuthView>
  );
}
