import { Button } from "antd";
import { VscSignOut } from "react-icons/vsc";
import { GoSignOut } from "react-icons/go";

import Link from "next/link";

export const SignoutIconBtn = () => {
  return (
    <Button type="text">
      <Link href="/api/auth/logout">
        <VscSignOut />
      </Link>
    </Button>
  );
};
