import { Button, Dropdown, Menu, Modal, Popconfirm, message } from "antd";

import {
  SearchOutlined,
  MoreOutlined,
  DeleteOutlined,
  SwapOutlined,
  ExclamationCircleFilled
} from "@ant-design/icons";

import type { MenuProps } from "antd";

interface Props {
  tenantId: number;
  tenantName: string;
  handleDeleteTenant: (tenantId: number) => void;
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

export const TenantDotDropDownBtn = ({
  tenantId,
  tenantName,
  handleDeleteTenant
}: Props) => {
  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "テナント削除",
      icon: <ExclamationCircleFilled />,
      content: `${tenantName}を削除します。宜しいですか？`,
      okText: "削除",
      okType: "danger",
      cancelText: "キャンセル",
      onOk() {
        handleDeleteTenant(tenantId);
      },
      maskClosable: true
    });
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
        // console.log(e);
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
