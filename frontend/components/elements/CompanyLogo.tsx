import { Avatar, Button } from "antd";
import Image from "next/image";
import Link from "next/link";

interface Props {
  height?: number;
  width?: number;
}

export const CompanyLogo = ({ height = 45, width = 45 }: Props) => {
  const url = "/images/logo2.png";
  return (
    <Avatar
      src={
        <img src={url} alt="logo" style={{ height: height, width: width }} />
      }
      style={{ height: height, width: width, display: "block" }}
    />
  );
};
