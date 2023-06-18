import { BellOutlined, BellFilled, BellTwoTone } from "@ant-design/icons";
import { Avatar, Badge, Button, Popover } from "antd";
import { HoverNotificationIconMenu } from "../parts/HoverNotificationIconMenu";

export const PopoverNotificationIcon = () => {
  const content = <HoverNotificationIconMenu />;

  // TODO APIから取得
  const count = 41;

  return (
    <Popover placement="bottomLeft" content={content} trigger="click">
      <Badge color="red" count={count}>
        <Button shape="circle" icon={<BellOutlined />}></Button>
      </Badge>
    </Popover>
  );
};
