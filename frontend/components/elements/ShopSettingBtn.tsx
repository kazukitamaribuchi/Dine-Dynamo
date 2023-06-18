import { ShopOutlined, ShopTwoTone } from "@ant-design/icons";
import { Button } from "antd";

export const ShopSettingBtn = () => {
  return (
    <Button
      type="text"
      icon={<ShopTwoTone twoToneColor="#DC143C" />}
      style={{
        padding: "0 0 0 10px",
        height: "32px",
        width: "100%",
        textAlign: "left",
      }}
    >
      店舗管理
    </Button>
  );
};
