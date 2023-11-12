import { Button, Dropdown, Menu, Modal, Popconfirm, message } from "antd";

import {
  SearchOutlined,
  MoreOutlined,
  DeleteOutlined,
  SwapOutlined,
  ExclamationCircleFilled
} from "@ant-design/icons";

import type { MenuProps } from "antd";
import { isBreakOrContinueStatement } from "typescript";

interface Props {
  tenantId: number;
}

const items: MenuProps["items"] = [
  {
    label: "詳細確認",
    icon: <SearchOutlined />,
    key: "0"
  },
  {
    type: "divider"
  },
  {
    label: "テナント切替",
    icon: <SwapOutlined />,
    key: "1"
  },
  {
    label: "削除",
    icon: <DeleteOutlined />,
    danger: true,
    key: "2"
  }
];

export const TenantDotDropDownBtn = ({ tenantId }: Props) => {
  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleFilled />, // 必要に応じてこのアイコンをインポートしてください
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      }
    });

    console.log("tenantId", tenantId);
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "0":
        // 詳細確認 => 親のメソッド呼ぶ
        break;
      case "1":
        // テナント切り替え => 親のメソッド呼ぶ
        break;
      case "2":
        // テナント削除 => コンファームしてから親のメソッド呼ぶ
        console.log(e);
        showDeleteConfirm();
        break;
    }
  };

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]}>
      <Button type="text" icon={<MoreOutlined />}></Button>
    </Dropdown>
  );
};
