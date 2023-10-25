import { Skeleton, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { ReactNode } from "react";
import { formatDateToJST } from "../../../utils/functions";
import { useAccessToken } from "@/hooks/api/useAccessToken";
import { useInstagramMediaList } from "@/hooks/api/useInstagramMediaList";
import { loginUserIdAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { InstagramMediaGrid } from "@/components/templates/instagram/InstagramMediaGrid";
import { InstagramMediaTable } from "@/components/templates/instagram/InstagramMediaTable";

interface DataType {
  key: string;
  date: string;
  media: ReactNode;
  caption: string;
  like: number;
  comment: number;
}

interface Props {
  mediaStyle: number;
}

export const InstagramMediaList = ({ mediaStyle }: Props) => {
  const [loginUserId] = useAtom(loginUserIdAtom);
  const { finalToken: token, error: accessTokenError } = useAccessToken();

  const {
    instagramMediaList,
    instagramMediaListError,
    loadingInstagramMediaList
  } = useInstagramMediaList({ auth0_id: loginUserId, token: token });

  let data: DataType[] = [];

  console.log("loadingInstagramMediaList", loadingInstagramMediaList);
  console.log("instagramMediaList", instagramMediaList);

  if (!loadingInstagramMediaList && instagramMediaList) {
    for (const response of instagramMediaList) {
      let media = response.media_url;
      if (response.thumbnail_url) {
        media = response.thumbnail_url;
      }
      let like_count = response.like_count ? response.like_count : 0;
      data.push({
        key: response.id,
        date: formatDateToJST(response.timestamp),
        media: media,
        caption: response.caption,
        like: like_count,
        comment: response.comments_count
      });
    }
  }

  return (
    <>
      {loadingInstagramMediaList ? (
        <Skeleton active />
      ) : (
        <>
          {mediaStyle === 0 && <InstagramMediaGrid data={data} />}
          {mediaStyle === 1 && <InstagramMediaTable data={data} />}
        </>
      )}
    </>
  );
};
