import BaseDashboardView from "./BaseDashboardView";

import { AuthView } from "./AuthView";
import { CommonHeader } from "../templates/Header";

import { loginUserIdAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { useAccessToken } from "@/hooks/api/useAccessToken";
import { useGetUserDetail } from "@/hooks/api/useGetUserDetail";
import { useEffect, useState } from "react";
import axios from "axios";
import { CommonSidebar } from "../templates/Sidebar";
import { Layout, Menu, Avatar, Divider, MenuProps, Tabs } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

const { Header, Sider, Content } = Layout;

export default function DashBoardView(props: any) {
  const [loginUserId] = useAtom(loginUserIdAtom);

  const { finalToken: token, error: accessTokenError } = useAccessToken();

  const { userDetail, error } = useGetUserDetail({
    auth0_id: loginUserId,
    token: token,
  });

  console.log("userDetail: ", userDetail);
  console.log("subscription: ", props);

  return (
    <AuthView>
      <BaseDashboardView title="index">dashboard</BaseDashboardView>
    </AuthView>
  );
}
