import { Skeleton, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
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
}

interface Props {
  data: DataType[];
}

export const InstagramMediaGrid = ({ data }: Props) => {
  return (
    <>
      <div>grid</div>
    </>
  );
};
