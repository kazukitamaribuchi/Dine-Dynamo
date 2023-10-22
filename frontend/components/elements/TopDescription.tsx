import { Typography } from "antd";

interface Props {
  description: string;
}

const { Title, Paragraph, Text, Link } = Typography;

export const TopDescription = ({ description }: Props) => {
  return (
    <>
      <div style={{ fontSize: "10px", color: "#999" }}>{description}</div>
    </>
  );
};
