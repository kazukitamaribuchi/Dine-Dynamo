import { Button, Modal, Tooltip } from "antd";
import { VscSignOut } from "react-icons/vsc";
import { GoSignOut } from "react-icons/go";

import { useAuth0 } from "@auth0/auth0-react";
import {
  loginUserAccessTokenAtom,
  loginUserAtom,
  loginUserIdAtom,
  loginUserRefreshTokenAtom,
} from "@/store/atoms";
import { useAtom } from "jotai";

export const SignOutIconBtn = () => {
  const { confirm } = Modal;

  const { logout } = useAuth0();

  const [loginUserId, setLoginUserId] = useAtom(loginUserIdAtom);
  const [loginUser, setLoginUser] = useAtom(loginUserAtom);
  const [loginUserAccessToken, setLoginUserAccessToken] = useAtom(
    loginUserAccessTokenAtom
  );
  const [loginUserRefreshToken, setLoginUserRefreshToken] = useAtom(
    loginUserRefreshTokenAtom
  );

  // TODO envから取得するようにする
  const redirectUrl = "http://localhost:8000/";

  const initLoginUser = () => {
    setLoginUserId(null);
    setLoginUser(null);
    setLoginUserAccessToken(null);
    setLoginUserRefreshToken(null);
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
    <Tooltip title="signout">
      <Button
        style={{ display: "block" }}
        type="text"
        shape="circle"
        icon={<VscSignOut />}
        onClick={showConfirm}
      ></Button>
    </Tooltip>
  );
};
