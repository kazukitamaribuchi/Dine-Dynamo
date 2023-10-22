import { Divider, Typography } from "antd";
import { Subtitle } from "../elements/Subtitle";
import { loginUserAtom } from "@/store/atoms";
import { useAtom } from "jotai";

const { Title } = Typography;

export const HoverNotificationIconMenu = () => {
  const [loginUser, setLoginUser] = useAtom(loginUserAtom);

  const divider = (
    <Divider
      style={{ borderColor: "rgba(150, 150, 150, 0.5)", margin: "10px 0" }}
    />
  );

  return (
    <div style={{ width: "250px", padding: "0 10px" }}>
      <Title level={5} style={{ marginTop: 0, fontSize: 15, marginBottom: 2 }}>
        お知らせ
      </Title>
      {divider}
      <Subtitle level={5} content="通知はありません。"></Subtitle>
    </div>
  );
};
