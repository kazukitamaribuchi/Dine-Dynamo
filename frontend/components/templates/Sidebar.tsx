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
  console.log("selectedKey: ", selectedKey);

  const fontSize = "14px";

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
        {/* <Menu.Item key="facebook" icon={<FacebookFilled />}>
          <Link href="/facebook">facebook</Link>
        </Menu.Item>
        <Menu.Item key="twitter" icon={<TwitterOutlined />}>
          <Link href="/twitter">twitter</Link>
        </Menu.Item>
        <Menu.Item key="comment" icon={<CommentOutlined />}>
          <Link href="/comment">comment</Link>
        </Menu.Item>
        <Menu.Item key="like" icon={<HeartOutlined />}>
          <Link href="/like">like</Link>
        </Menu.Item>
        <Menu.Item key="competitor" icon={<ShopOutlined />}>
          <Link href="/competitor">competitor</Link>
        </Menu.Item> */}
        <Menu.Item
          key="settings"
          icon={<AiOutlineSetting style={{ fontSize: fontSize }} />}
        >
          <Link href="/settings">settings</Link>
        </Menu.Item>
      </Menu>
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
