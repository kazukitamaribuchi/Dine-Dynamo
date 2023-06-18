import { SettingOutlined, FundTwoTone } from "@ant-design/icons";
import { Button } from "antd";

interface Props {
  content: string;
  link: string;
}

import { useRouter } from "next/router";

export const ToPageBtn = ({ content, link }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(link);
  };

  return (
    <Button
      type="text"
      icon={<FundTwoTone twoToneColor="#00BFFF" />}
      style={{
        padding: "0 0 0 10px",
        height: "32px",
        width: "100%",
        textAlign: "left",
      }}
      onClick={handleClick}
    >
      {content}
    </Button>
  );
};
