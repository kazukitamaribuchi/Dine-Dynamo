import { AuthView } from "./AuthView";

import { loginUserIdAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { useAccessToken } from "@/hooks/api/useAccessToken";
import { useGetUserDetail } from "@/hooks/api/useGetUserDetail";
import { useState } from "react";
import { Tabs } from "antd";
import BaseDashboardView from "./BaseDashboardView";

export default function InstagramView(props: any) {
  const [loginUserId] = useAtom(loginUserIdAtom);

  const { finalToken: token, error: accessTokenError } = useAccessToken();

  const { userDetail, error } = useGetUserDetail({
    auth0_id: loginUserId,
    token: token,
  });

  // TODO ページ遷移時に全てのタブのデータ取得

  // TODO childrenのコンポーネント化

  const [items, setItems] = useState([
    {
      key: "1",
      label: `サマリー`,
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: `投稿`,
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: `ストーリーズ`,
      children: "Content of Tab Pane 3",
    },
    {
      key: "4",
      label: `フォロワー`,
      children: "Content of Tab Pane 4",
    },
    {
      key: "5",
      label: `アクション`,
      children: "Content of Tab Pane 5",
    },
    {
      key: "6",
      label: `リーチ`,
      children: "Content of Tab Pane 6",
    },
  ]);

  const changeTabs = (key: string) => {
    console.log("changeTabs", key);
  };

  console.log("userDetail: ", userDetail);
  console.log("subscription: ", props);

  return (
    <AuthView>
      <BaseDashboardView title="index">
        <Tabs items={items} onChange={changeTabs}></Tabs>
      </BaseDashboardView>
    </AuthView>
  );
}
