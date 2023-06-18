import { Divider, Typography } from "antd";
import { SignOutBtn } from "../elements/SignOutBtn";
import { Subtitle } from "../elements/Subtitle";
import { loginUserAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { UserIcon } from "../elements/UserIcon";
import { UserSettingBtn } from "../elements/UserSettingBtn";
import { ShopSettingBtn } from "../elements/ShopSettingBtn";
import { ShopChangeBtn } from "../elements/ShopChangeBtn";

const { Title } = Typography;

import { useRouter } from "next/router";
import { ToPageBtn } from "../elements/ToPageBtn";

export const HoverUserIconMenu = () => {
  const router = useRouter();
  const [loginUser, setLoginUser] = useAtom(loginUserAtom);

  const divider = (
    <Divider
      style={{ borderColor: "rgba(150, 150, 150, 0.5)", margin: "10px 0" }}
    />
  );

  console.log("router.pathname: ", router.pathname);

  return (
    <div style={{ width: "250px", padding: "0 10px" }}>
      {router.pathname == "/" && (
        <>
          <ToPageBtn content="管理画面へ" link="/dashboard" />
          {divider}
        </>
      )}

      <Subtitle level={5} content="ユーザー情報" />
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <div>
          <UserIcon />
        </div>
        <div style={{ marginLeft: 7 }}>
          <Title
            level={5}
            style={{ marginTop: 0, fontSize: 15, marginBottom: 2 }}
          >
            {loginUser && <>{loginUser.username[0]}</>}
            {!loginUser && <></>}
          </Title>
          <Subtitle
            level={5}
            content={loginUser ? loginUser.email : ""}
          ></Subtitle>
        </div>
      </div>
      <UserSettingBtn />
      {divider}
      <Subtitle level={5} content="店情報" />
      <Title level={5} style={{ marginTop: 0, fontSize: 15, marginBottom: 10 }}>
        <div style={{ marginLeft: 7 }}>焼肉トラジ 横浜モアーズ店</div>
      </Title>
      <ShopSettingBtn />
      <ShopChangeBtn />
      {divider}
      <SignOutBtn />
    </div>
  );
};
