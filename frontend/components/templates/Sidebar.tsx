import { Button, Layout, Menu } from "antd";
import React, { useState } from "react";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineSetting
} from "react-icons/ai";
const { Header, Content, Footer, Sider } = Layout;
import {
  FacebookOutlined,
  FacebookFilled,
  InstagramOutlined,
  HomeOutlined,
  TwitterOutlined,
  CommentOutlined,
  HeartOutlined,
  ShopTwoTone,
  ShopOutlined
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";

export const CommonSidebar = () => {
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
  };

  const selectedKey = router.pathname.slice(1);

  const fontSize = "14px";

  const menuItems = [
    {
      key: "dashboard",
      icon: <HomeOutlined style={{ fontSize: fontSize }} />,
      label: <Link href="/dashboard">home</Link>
    },
    {
      key: "instagram",
      icon: <InstagramOutlined style={{ fontSize: fontSize }} />,
      label: <Link href="/instagram">instagram</Link>
    },
    {
      key: "tenant",
      icon: (
        <ShopTwoTone twoToneColor="#DC143C" style={{ fontSize: fontSize }} />
      ),
      label: <Link href="/tenant">tenant</Link>
    },
    {
      key: "settings",
      icon: <AiOutlineSetting style={{ fontSize: fontSize }} />,
      label: <Link href="/settings">settings</Link>
    }
    // 他のメニューアイテムがあれば、以下に追加
    // {
    //   key: "your-key",
    //   icon: <YourIconComponent style={{ fontSize: fontSize }} />,
    //   label: <Link href="/your-path">your-label</Link>,
    // },
  ];

  return (
    <Sider
      collapsed={collapsed}
      collapsedWidth={50}
      width={160}
      style={{ background: "#fff" }} // Set the background color of Sider to white
    >
      <div className="logo" />
      <Menu
        theme="light"
        selectedKeys={[selectedKey]}
        defaultSelectedKeys={["dashboard"]}
        mode="inline"
        items={menuItems} // ここを変更
      />
      {/* <Menu
        theme="light"
        selectedKeys={[selectedKey]}
        defaultSelectedKeys={["dashboard"]}
        mode="inline"
      >
        <Menu.Item
          key="dashboard"
          icon={<HomeOutlined style={{ fontSize: fontSize }} />}
        >
          <Link href="/dashboard">home</Link>
        </Menu.Item>
        <Menu.Item
          key="instagram"
          icon={<InstagramOutlined style={{ fontSize: fontSize }} />}
        >
          <Link href="/instagram">instagram</Link>
        </Menu.Item>
        <Menu.Item
          key="tenant"
          icon={
            <ShopTwoTone
              twoToneColor="#DC143C"
              style={{ fontSize: fontSize }}
            />
          }
        >
          <Link href="/tenant">tenant</Link>
        </Menu.Item>
        <Menu.Item
          key="settings"
          icon={<AiOutlineSetting style={{ fontSize: fontSize }} />}
        >
          <Link href="/settings">settings</Link>
        </Menu.Item>
      </Menu> */}
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          width: "100%",
          padding: "25px 0",
          cursor: "pointer"
        }}
        onClick={onCollapse}
      >
        {!collapsed && (
          <div style={{ textAlign: "right" }}>
            <AiOutlineDoubleLeft style={{ marginRight: "35px" }} />
          </div>
        )}
        {collapsed && (
          <div style={{ textAlign: "center" }}>
            <AiOutlineDoubleRight />
          </div>
        )}
      </div>
    </Sider>
  );
};
