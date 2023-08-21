import { AuthView } from "./AuthView";

import { loginUserIdAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { useAccessToken } from "@/hooks/api/useAccessToken";
import { useGetUserDetail } from "@/hooks/api/useGetUserDetail";
import { useState } from "react";
import { Tabs } from "antd";
import BaseDashboardView from "./BaseDashboardView";
import { InstagramMediaList } from "./instagram/InstagramMediaList";
import { InstagramAction } from "./instagram/InstagramAction";
import { InstagramReach } from "./instagram/InstagramReach";
import { InstagramFollower } from "./instagram/InstagramFollower";
import { InstagramSummary } from "./instagram/InstagramSummary";

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
      label: `summary`,
      children: (
        <>
          <InstagramSummary />
        </>
      )
    },
    {
      key: "2",
      label: `media`,
      children: (
        <>
          <InstagramMediaList />
        </>
      )
    },
    {
      key: "3",
      label: `follower`,
      children: (
        <>
          <InstagramFollower />
        </>
      )
    },
    {
      key: "4",
      label: `action`,
      children: (
        <>
          <InstagramAction />
        </>
      )
    },
    {
      key: "5",
      label: `reach`,
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
