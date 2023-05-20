import { Button } from "antd";
import BaseView from "./BaseView";
import Link from "next/link";

import { SigninBtn } from "../elements/SigninBtn";
import { useUser } from "@auth0/nextjs-auth0/client";
import { SignoutBtn } from "../elements/SignoutBtn";
import { SignoutIconBtn } from "../elements/SignoutIconBtn";
import { UserIcon } from "../elements/UserIcon";
import { SigninoutArea } from "../parts/SigninoutArea";

export default function IndexView() {
  const { user, error, isLoading } = useUser();

  console.log(user);
  console.log(error);
  console.log(isLoading);

  return (
    <BaseView title="index">
      <SigninBtn />
      <SignoutBtn />
      <SignoutIconBtn />

      <div></div>
      <SigninoutArea />
    </BaseView>
  );
}
