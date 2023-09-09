import { Typography } from "antd";

const { Text } = Typography;

interface Props {
  title: string;
}

export const InstagramGraphTitle = ({ title }: Props) => {
  return (
    <div
      style={{
        height: "20px",
        marginTop: "5px",
        marginBottom: "5px"
      }}
    >
      <Text type="secondary">{title}</Text>
    </div>
  );
};
