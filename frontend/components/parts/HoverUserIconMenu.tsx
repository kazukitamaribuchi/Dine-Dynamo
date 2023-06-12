import { Button, Card, Divider, Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { SignOutBtn } from "../elements/SignOutBtn";
import { Subtitle } from "../elements/Subtitle";

const { Title } = Typography;

export const HoverUserIconMenu = () => {
  const divider = (
    <Divider
      style={{ borderColor: "rgba(150, 150, 150, 0.5)", margin: "10px 0" }}
    />
  );

  return (
    <div style={{ width: "250px", padding: "0 10px" }}>
      <Subtitle level={1} content="店名" />
      <Title level={5} style={{ marginTop: 0 }}>
        焼肉トラジ 横浜モアーズ店
      </Title>
      <div>店舗切り替え</div>
      <div>店舗設定</div>
      <div>店舗管理</div>
      {divider}
      <div>設定</div>
      {divider}
      <SignOutBtn />
    </div>
  );
};
