import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ReactNode } from "react";

interface DataType {
  key: string;
  date: string;
  media: ReactNode;
  caption: string;
  like: number;
  comment: number;
}

interface Props {
  data: DataType[];
}

export const InstagramMediaTable = ({ data }: Props) => {
  const columns: ColumnsType<DataType> = [
    {
      title: "date",
      dataIndex: "date",
      key: "date",
      render: (text) => <div style={{ whiteSpace: "nowrap" }}>{text}</div>,
      sorter: (a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      },
      defaultSortOrder: "ascend"
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
      title: "comment",
      dataIndex: "comment",
      key: "comment",
      sorter: (a, b) => a.comment - b.comment
    }
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 1100 }}
      />
    </>
  );
};
