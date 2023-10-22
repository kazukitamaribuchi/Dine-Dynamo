import { ShopOutlined, ShopTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";

export const ShopSettingBtn = () => {
  return (
    <Button
      type="text"
      icon={<ShopTwoTone twoToneColor="#DC143C" />}
      style={{
        padding: "0 0 0 10px",
        height: "32px",
        width: "100%",
        textAlign: "left"
      }}
    >
      <Link href="/tenant">店舗管理</Link>
    </Button>
  );
};
