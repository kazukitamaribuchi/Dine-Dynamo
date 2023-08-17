import { AuthView } from "./AuthView";

import { loginUserIdAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { useAccessToken } from "@/hooks/api/useAccessToken";
import { useGetUserDetail } from "@/hooks/api/useGetUserDetail";
import { useState } from "react";
import { Tabs } from "antd";
import BaseDashboardView from "./BaseDashboardView";
import { InstagramMediaList } from "../templates/instagram/InstagramMediaList";
import { InstagramAction } from "../templates/instagram/InstagramAction";
import { InstagramReach } from "../templates/instagram/InstagramReach";
import { InstagramFollower } from "../templates/instagram/InstagramFollower";
import { InstagramStory } from "../templates/instagram/InstagramStory";
import { InstagramSummary } from "../templates/instagram/InstagramSummary";

export default function InstagramView(props: any) {
  const [loginUserId] = useAtom(loginUserIdAtom);

  const { finalToken: token, error: accessTokenError } = useAccessToken();

  const { userDetail, error } = useGetUserDetail({
    auth0_id: loginUserId,
    token: token
  });

  const [items, setItems] = useState([
    {
      key: "1",
      label: `サマリー`,
      children: (
        <>
          <InstagramSummary />
        </>
      )
    },
    {
      key: "2",
      label: `投稿`,
      children: (
        <>
          <InstagramMediaList />
        </>
      )
    },
    {
      key: "3",
      label: `ストーリーズ`,
      children: (
        <>
          <InstagramStory />
        </>
      )
    },
    {
      key: "4",
      label: `フォロワー`,
      children: (
        <>
          <InstagramFollower />
        </>
      )
    },
    {
      key: "5",
      label: `アクション`,
      children: (
        <>
          <InstagramAction />
        </>
      )
    },
    {
      key: "6",
      label: `リーチ`,
      children: (
        <>
          <InstagramReach />
        </>
      )
    }
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
