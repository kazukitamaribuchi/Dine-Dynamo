import { useUser } from "@auth0/nextjs-auth0/client";

import BaseView from "./BaseView";

import { Auth } from "../templates/Auth";
import { Header } from "../templates/Header";
import { Spin } from "antd";
import { useRouter } from "next/router";

export default function DashBoardView() {
  const { user, error, isLoading } = useUser();

  console.log(user);

  const router = useRouter();

  if (isLoading) {
    return <Spin tip="Loading..."></Spin>;
  }

  if (user == undefined) {
    // どちらにもuser情報が無い場合、ログイン画面へリダイレクト
    router.push("/api/auth/login");
    return <></>;
  }

  return (
    <BaseView title="index">
      <Header isChecking={false} isLogin={true} />
      <div>dashboard</div>
    </BaseView>
  );
}
