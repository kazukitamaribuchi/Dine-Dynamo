import { RetweetOutlined, SwapOutlined } from "@ant-design/icons";
import { Button } from "antd";

export const ShopChangeBtn = () => {
  return (
    <Button
      type="text"
      icon={<SwapOutlined style={{ color: "#2f4f4f" }} />}
      style={{
        padding: "0 0 0 10px",
        height: "32px",
        width: "100%",
        textAlign: "left",
      }}
    >
      店舗切り替え
    </Button>
  );
};
