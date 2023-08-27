import { Skeleton, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { ReactNode } from "react";
import { formatDateToJST } from "../../../utils/functions";
import { useAccessToken } from "@/hooks/api/useAccessToken";
import { useInstagramMediaList } from "@/hooks/api/useInstagramMediaList";
import { loginUserIdAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { InstagramStory, StoryInsightValueDetail } from "@/types";
import { data } from "autoprefixer";

interface DataType {
  key: string;
  date: string;
  username: string;
  media: ReactNode;
  caption: string;
  like: number;
  impr: number;
  reach: number;
  comment: number;
  forward: number;
  back: number;
  exits: number;
}

const instagramStoryList: InstagramStory[] = [
  {
    id: "17953168403526814",
    caption: "湘南ひらつか",
    media_type: "VIDEO",
    media_url:
      "https://scontent-nrt1-2.cdninstagram.com/o1/v/t16/f1/m78/5344A3C2155AE5AA2B9744B8266D73AB_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLjcyMC5zdG9yeSJ9&_nc_ht=scontent-nrt1-2.cdninstagram.com&_nc_cat=108&vs=987078152505098_2088817453&_nc_vs=HBksFQIYUWlnX3hwdl9wbGFjZW1lbnRfcGVybWFuZW50X3YyLzUzNDRBM0MyMTU1QUU1QUEyQjk3NDRCODI2NkQ3M0FCX3ZpZGVvX2Rhc2hpbml0Lm1wNBUAAsgBABUAGCRHSGhtRXhZSlgzdVhnWVVEQUd0MlZ4VDRTOFlyYnBrd0FBQUYVAgLIAQAoABgAGwGIB3VzZV9vaWwBMRUAACbE3sSE78T6PxUCKAJDMywXQEuQxJul41QYEmRhc2hfYmFzZWxpbmVfMV92MREAdegHAA%3D%3D&ccb=9-4&oh=00_AfDdzznoVt82KjUzjNUce0Awi7KeVnNhofPoaCxOSOE_8g&oe=64EB38DE&_nc_sid=1d576d&_nc_rid=ceeec93c2d",
    comments_count: 0,
    like_count: 0,
    permalink: "",
    thumbnail_url:
      "https://scontent-nrt1-2.cdninstagram.com/v/t51.36329-15/369708109_284464367637993_8785063600420416731_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=qUIHVdx-AYAAX_aY74R&_nc_ht=scontent-nrt1-2.cdninstagram.com&edm=AEQ6tj4EAAAA&oh=00_AfCDvNkwP9zzAa9dQGnCga2TiSQGxoXDcNsz4dxZD-vfWw&oe=64EF57D3",
    timestamp: "2023-08-25T12:28:54+0000",
    username: "kazuki_tamaribuchi",
    media_product_type: "STORY",
    insight: {
      insights: {
        data: [
          {
            name: "exits",
            period: "lifetime",
            values: [
              {
                value: 10
              }
            ],
            title: "ストーリーズからの移動",
            description: "利用者がストーリーズから移動した回数です",
            id: "17953168403526814/insights/exits/lifetime"
          },
          {
            name: "impressions",
            period: "lifetime",
            values: [
              {
                value: 56
              }
            ],
            title: "インプレッション",
            description: "メディアオブジェクトの合計ビュー数です",
            id: "17953168403526814/insights/impressions/lifetime"
          },
          {
            name: "reach",
            period: "lifetime",
            values: [
              {
                value: 54
              }
            ],
            title: "リーチ",
            description:
              "メディアオブジェクトを見たユニークアカウントの合計数です",
            id: "17953168403526814/insights/reach/lifetime"
          },
          {
            name: "replies",
            period: "lifetime",
            values: [
              {
                value: 0
              }
            ],
            title: "返信",
            description: "ストーリーズへの返信の合計数です",
            id: "17953168403526814/insights/replies/lifetime"
          },
          {
            name: "taps_forward",
            period: "lifetime",
            values: [
              {
                value: 42
              }
            ],
            title: "次へのタップ",
            description:
              "このストーリーの次の写真または動画を見るためのタップの合計数です",
            id: "17953168403526814/insights/taps_forward/lifetime"
          },
          {
            name: "taps_back",
            period: "lifetime",
            values: [
              {
                value: 0
              }
            ],
            title: "前へのタップ",
            description:
              "このストーリーの前の写真または動画を見るためのタップの合計数です",
            id: "17953168403526814/insights/taps_back/lifetime"
          }
        ]
      },
      id: "17953168403526814"
    }
  }
];

export const InstagramStoryList = () => {
  const [loginUserId] = useAtom(loginUserIdAtom);
  const { finalToken: token, error: accessTokenError } = useAccessToken();

  // const {
  //   instagramStoryList,
  //   instagramStoryListError,
  //   lodingInstagramStoryList
  // } = useInstagramStoryList({ auth0_id: loginUserId, token: token });

  let data: DataType[] = [];

  const lodingInstagramStoryList = false;

  const columns: ColumnsType<DataType> = [
    {
      title: "date",
      dataIndex: "date",
      key: "date",
      render: (text) => <>{text}</>,
      sorter: (a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB;
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
      title: "comment",
      dataIndex: "comment",
      key: "comment"
    },
    {
      title: "forward",
      dataIndex: "forward",
      key: "forward"
    },
    {
      title: "back",
      dataIndex: "back",
      key: "back"
    },
    {
      title: "exits",
      dataIndex: "exits",
      key: "exits"
    }
  ];

  console.log("lodingInstagramStoryList", lodingInstagramStoryList);
  console.log("instagramStoryList", instagramStoryList);

  if (!lodingInstagramStoryList && instagramStoryList) {
    for (const response of instagramStoryList) {
      // ビジネスアカウント変更前の考慮

      let insight_dict: { [key: string]: number } = {};
      if ("error" in response.insight) {
        insight_dict.impressions = 0;
        insight_dict.reach = 0;
        insight_dict.comments_count = 0;
        insight_dict.taps_forward = 0;
        insight_dict.taps_back = 0;
        insight_dict.exits = 0;
      } else {
        const insights = response.insight.insights.data;

        for (const insight of insights) {
          if (insight.values && insight.values[0]) {
            insight_dict[insight.name] = insight.values[0].value;
          }
        }
      }

      data.push({
        key: response.id,
        date: formatDateToJST(response.timestamp),
        username: response.username,
        media: response.thumbnail_url,
        caption: response.caption,
        like: response.like_count,
        impr: insight_dict.impressions,
        reach: insight_dict.reach,
        comment: response.comments_count,
        forward: insight_dict.taps_forward,
        back: insight_dict.taps_back,
        exits: insight_dict.exits
      });
    }
  }

  return (
    <>
      {lodingInstagramStoryList ? (
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
