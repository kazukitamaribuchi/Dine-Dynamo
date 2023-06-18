import { Button, Layout, Menu } from "antd";
import React, { useState } from "react";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineSetting,
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
  ShopOutlined,
} from "@ant-design/icons";
import Link from "next/link";

export const CommonSidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const onCollapse = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
  };

  return (
    <Sider
      collapsed={collapsed}
      style={{ background: "#fff" }} // Set the background color of Sider to white
    >
      <div className="logo" />
      <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link href="/dashboard">home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<InstagramOutlined />}>
          <Link href="/instagram">instagram</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<FacebookFilled />}>
          <Link href="/facebook">facebook</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<TwitterOutlined />}>
          <Link href="/twitter">twitter</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<CommentOutlined />}>
          <Link href="/comment">comment</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<HeartOutlined />}>
          <Link href="/like">like</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<ShopOutlined />}>
          <Link href="/competitor">competitor</Link>
        </Menu.Item>
        <Menu.Item key="8" icon={<AiOutlineSetting />}>
          <Link href="/settings">settings</Link>
        </Menu.Item>
      </Menu>
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          width: "100%",
          padding: "25px 0",
          cursor: "pointer",
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
