import BaseView from "./BaseView";

import { Header } from "../templates/Header";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function IndexView() {
  const { user, error, isLoading } = useUser();

  let isChecking = true;
  let isLogin = false;

  if (!isLoading) {
    isChecking = false;
    if (user != undefined) {
      isLogin = true;
    }
  }

  return (
    <BaseView title="index">
      <Header isChecking={isChecking} isLogin={isLogin} />
      <div>index</div>
    </BaseView>
  );
}
