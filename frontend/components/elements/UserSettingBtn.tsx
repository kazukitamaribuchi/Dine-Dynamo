import { SettingOutlined, SettingTwoTone } from "@ant-design/icons";
import { Button } from "antd";

export const UserSettingBtn = () => {
  return (
    <Button
      type="text"
      icon={<SettingTwoTone twoToneColor="#2f4f4f" />}
      style={{
        padding: "0 0 0 10px",
        height: "32px",
        width: "100%",
        textAlign: "left",
      }}
    >
      設定
    </Button>
  );
};
