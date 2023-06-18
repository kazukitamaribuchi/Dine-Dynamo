import { Button, Modal } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import { useAuth0 } from "@auth0/auth0-react";
import {
  loginUserAtom,
  loginUserAccessTokenAtom,
  loginUserIdAtom,
  loginUserRefreshTokenAtom,
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
    <Button
      type="text"
      icon={<LogoutOutlined />}
      onClick={showConfirm}
      style={{
        padding: "0 0 0 10px",
        height: "32px",
        width: "100%",
        textAlign: "left",
      }}
    >
      <span style={{ fontSize: "15px" }}>logout</span>
    </Button>
  );
};
