import { Table, TableProps, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  city: string;
  population: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "市町村",
    dataIndex: "city",
    sorter: (a, b) => a.city.localeCompare(b.city, "ja-JP")
  },
  {
    title: "人数",
    dataIndex: "population",
    sorter: (a, b) => a.population - b.population
  }
];

const data: DataType[] = [
  {
    key: "1",
    city: "山形県鶴岡市",
    population: 1
  },
  {
    key: "2",
    city: "神奈川県川崎市",
    population: 6
  },
  {
    key: "3",
    city: "栃木県小山市",
    population: 1
  },
  {
    key: "4",
    city: "東京都港区",
    population: 1
  },
  {
    key: "5",
    city: "東京都足立区",
    population: 4
  },
  {
    key: "6",
    city: "東京都練馬区",
    population: 12
  },
  {
    key: "7",
    city: "東京都北区",
    population: 3
  }
];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

export const InstagramFollowerCityTable = () => {
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        scroll={{ y: 220 }}
      />
      ;
    </>
  );
};
