import { Button } from "antd";

import Link from "next/link";

export const SignoutBtn = () => {
  return (
    <Button type="text">
      <Link href="/api/auth/logout">Signout</Link>
    </Button>
  );
};
