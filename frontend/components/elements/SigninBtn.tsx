import { Button } from "antd";

import Link from "next/link";

export const SigninBtn = () => {
  return (
    <Button type="primary">
      <Link href="/api/auth/login">Signin</Link>
    </Button>
  );
};
