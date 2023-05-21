import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";

interface Props {
  height?: number;
  width?: number;
}

export const CompanyLogo = ({ height = 45, width = 45 }: Props) => {
  return (
    <Link href="/" style={{ height: height, width: width, display: "block" }}>
      <Image
        src="/images/logo.png"
        height={height}
        width={width}
        alt="IRS Logo"
      />
    </Link>
  );
};
