import { Button } from "antd";

import Link from "next/link";

export const SigninBtn = () => {
  return (
    <Link href="/api/auth/login">
      <Button type="primary">Signin</Button>
    </Link>
  );
};
