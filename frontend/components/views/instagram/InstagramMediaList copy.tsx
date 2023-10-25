import { Skeleton, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { ReactNode } from "react";
import { formatDateToJST } from "../../../utils/functions";
import { useAccessToken } from "@/hooks/api/useAccessToken";
import { useInstagramMediaList } from "@/hooks/api/useInstagramMediaList";
import { loginUserIdAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { data } from "autoprefixer";

interface DataType {
  key: string;
  date: string;
  username: string;
  media: ReactNode;
  caption: string;
  like: number;
  engage: number;
  impr: number;
  reach: number;
  saved: number;
}

export const InstagramMediaList = () => {
  const [loginUserId] = useAtom(loginUserIdAtom);
  const { finalToken: token, error: accessTokenError } = useAccessToken();

  const {
    instagramMediaList,
    instagramMediaListError,
    loadingInstagramMediaList
  } = useInstagramMediaList({ auth0_id: loginUserId, token: token });

  let data: DataType[] = [];

  const columns: ColumnsType<DataType> = [
    {
      title: "date",
      dataIndex: "date",
      key: "date",
      render: (text) => <>{text}</>,
      sorter: (a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      },
      defaultSortOrder: "ascend"
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
      key: "like",
      sorter: (a, b) => a.like - b.like
    },
    {
      title: "engage",
      dataIndex: "engage",
      key: "engage",
      sorter: (a, b) => a.engage - b.engage
    },
    {
      title: "impr",
      dataIndex: "impr",
      key: "impr",
      sorter: (a, b) => a.impr - b.impr
    },
    {
      title: "reach",
      dataIndex: "reach",
      key: "reach",
      sorter: (a, b) => a.reach - b.reach
    },
    {
      title: "saved",
      dataIndex: "saved",
      key: "saved",
      sorter: (a, b) => a.saved - b.saved
    }
  ];

  console.log("loadingInstagramMediaList", loadingInstagramMediaList);
  console.log("instagramMediaList", instagramMediaList);

  if (!loadingInstagramMediaList && instagramMediaList) {
    for (const response of instagramMediaList) {
      let insight_dict: { [key: string]: number } = {};
      if ("error" in response.insight) {
        insight_dict.engagement = 0;
        insight_dict.impressions = 0;
        insight_dict.reach = 0;
        insight_dict.saved = 0;
      } else {
        const insights = response.insight.insights.data;

        for (const insight of insights) {
          if (insight.values && insight.values[0]) {
            insight_dict[insight.name] = insight.values[0].value;
          }
        }
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
        engage: insight_dict.engagement,
        impr: insight_dict.impressions,
        reach: insight_dict.reach,
        saved: insight_dict.saved
      });
    }
  }

  return (
    <>
      {loadingInstagramMediaList ? (
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
