import { Button } from "antd";
import BaseView from "./BaseView";
import Link from "next/link";

import { useUser } from "@auth0/nextjs-auth0/client";

export default function IndexView() {
  const { user, error, isLoading } = useUser();

  console.log(user);
  console.log(error);
  console.log(isLoading);

  return (
    <BaseView title="index">
      <Button type="primary">
        <Link href="/api/auth/login">Login</Link>
      </Button>
      <Button>
        <Link href="/api/auth/logout">Logout</Link>
      </Button>
      <Button>
        <Link href="/api/auth/me">User Info</Link>
      </Button>
    </BaseView>
  );
}
