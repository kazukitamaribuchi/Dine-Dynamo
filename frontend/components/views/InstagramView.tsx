import { AuthView } from "./AuthView";

import { loginUserIdAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { useAccessToken } from "@/hooks/api/useAccessToken";
import { useGetUserDetail } from "@/hooks/api/useGetUserDetail";
import { useState } from "react";
import { Tabs, Typography } from "antd";
import BaseDashboardView from "./BaseDashboardView";
import { InstagramMediaList } from "./instagram/InstagramMediaList";
import { InstagramMedia } from "./instagram/InstagramMedia";
import { InstagramAction } from "./instagram/InstagramAction";
import { InstagramReach } from "./instagram/InstagramReach";
import { InstagramFollower } from "./instagram/InstagramFollower";
import { InstagramSummary } from "./instagram/InstagramSummary";
import { InstagramStoryList } from "./instagram/InstagramStoryList";

const { Title, Paragraph, Text, Link } = Typography;

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
          <InstagramMedia />
        </>
      )
    },
    {
      key: "3",
      label: `story`,
      children: (
        <>
          <InstagramStoryList />
        </>
      )
    },
    {
      key: "4",
      label: `follower`,
      children: (
        <>
          <InstagramFollower />
        </>
      )
    }
    // {
    //   key: "5",
    //   label: `action`,
    //   children: (
    //     <>
    //       <InstagramAction />
    //     </>
    //   )
    // },
    // {
    //   key: "6",
    //   label: `reach`,
    //   children: (
    //     <>
    //       <InstagramReach />
    //     </>
    //   )
    // }
  ]);

  const changeTabs = (key: string) => {
    console.log("changeTabs", key);
  };

  console.log("userDetail: ", userDetail);
  console.log("subscription: ", props);

  return (
    <AuthView>
      <BaseDashboardView title="index">
        {/* <Title level={2}>instaram</Title> */}
        <Tabs items={items} onChange={changeTabs}></Tabs>
      </BaseDashboardView>
    </AuthView>
  );
}
