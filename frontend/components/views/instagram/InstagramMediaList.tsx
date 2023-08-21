import { Skeleton, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ReactNode } from "react";
import { formatDateToJST } from "../../../utils/functions";
import { useAccessToken } from "@/hooks/api/useAccessToken";
import { useInstagramMediaList } from "@/hooks/api/useInstagramMediaList";
import { loginUserIdAtom } from "@/store/atoms";
import { useAtom } from "jotai";

interface DataType {
  key: string;
  date: string;
  username: string;
  media: ReactNode;
  caption: string;
  like: number;
  impr: number;
  reach: number;
}

let data: DataType[] = [];

export const InstagramMediaList = () => {
  const [loginUserId] = useAtom(loginUserIdAtom);
  const { finalToken: token, error: accessTokenError } = useAccessToken();

  const {
    instagramMediaList,
    instagramMediaListError,
    lodingInstagramMediaList
  } = useInstagramMediaList({ auth0_id: loginUserId, token: token });

  const columns: ColumnsType<DataType> = [
    {
      title: "date",
      dataIndex: "date",
      key: "date",
      render: (text) => <>{text}</>
    },
    {
      title: "author",
      dataIndex: "username",
      key: "username"
    },
    {
      title: "media",
      dataIndex: "media",
      key: "media",
      render: (value, record) => (
        <>
          <img style={{ maxHeight: 60, maxWidth: 100 }} src={value} />
        </>
      )
    },
    {
      title: "caption",
      dataIndex: "caption",
      key: "caption"
    },
    {
      title: "like",
      dataIndex: "like",
      key: "like"
    },
    {
      title: "impr",
      dataIndex: "impr",
      key: "impr"
    },
    {
      title: "reach",
      dataIndex: "reach",
      key: "reach"
    }
  ];

  console.log("lodingInstagramMediaList", lodingInstagramMediaList);
  console.log("instagramMediaList", instagramMediaList);

  if (!lodingInstagramMediaList && instagramMediaList) {
    for (const response of instagramMediaList) {
      let impression = 0;
      let reach = 0;
      if (response.insight.impression) {
        impression = response.insight.impression;
      }
      if (response.insight.reach) {
        reach = response.insight.reach;
      }
      let media = response.media_url;
      if (response.thumbnail_url) {
        media = response.thumbnail_url;
      }
      data.push({
        key: response.id,
        date: formatDateToJST(response.timestamp),
        username: response.username,
        media: media,
        caption: response.caption,
        like: response.like_count,
        impr: impression,
        reach: reach
      });
    }
  }

  return (
    <>
      {lodingInstagramMediaList ? (
        <Skeleton active />
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          bordered
          scroll={{ x: 1100 }}
        />
      )}
    </>
  );
};
