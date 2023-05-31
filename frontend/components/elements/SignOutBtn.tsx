import { Button, Modal } from "antd";

import { useAuth0 } from "@auth0/auth0-react";
import {
  loginUserAtom,
  loginUserAccessTokenAtom,
  loginUserIdAtom,
} from "@/store/atoms";
import { useAtom } from "jotai";

export const SignOutBtn = () => {
  const { confirm } = Modal;

  const { logout } = useAuth0();
  const [loginUserId, setLoginUserId] = useAtom(loginUserIdAtom);
  const [loginUser, setLoginUser] = useAtom(loginUserAtom);
  const [loginUserAccessToken, setLoginUserAccessToken] = useAtom(
    loginUserAccessTokenAtom
  );

  // TODO envから取得するようにする
  const redirectUrl = "http://localhost:8000/";

  const initLoginUser = () => {
    setLoginUserId(null);
    setLoginUser(null);
    setLoginUserAccessToken(null);
  };

  const showConfirm = () => {
    confirm({
      title: "Sign out",
      content: "サインアウトします。よろしいですか？",
      onOk() {
        initLoginUser();
        logout({ logoutParams: { returnTo: redirectUrl } });
      },
    });
  };

  return (
    <Button type="text" onClick={showConfirm}>
      Signout
    </Button>
  );
};
