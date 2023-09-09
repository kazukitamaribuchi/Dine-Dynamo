import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ReactNode } from "react";

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

export const InstagramMediaTable = ({ data }: Props) => {
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
