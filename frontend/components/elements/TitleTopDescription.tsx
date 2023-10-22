import { Typography } from "antd";

interface Props {
  title: string;
  titleSize?: string;
  description: string;
  bold?: boolean;
}

const { Title, Paragraph, Text, Link } = Typography;

export const TitleTopDescription = ({
  title,
  titleSize = "15px",
  description,
  bold = false
}: Props) => {
  const fontWeight = bold ? "bold" : "normal";

  return (
    <>
      <div style={{ fontSize: "10px", color: "#999" }}>{description}</div>
      <div style={{ fontSize: titleSize, fontWeight: fontWeight }}>{title}</div>
    </>
  );
};
