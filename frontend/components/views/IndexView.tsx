import BaseView from "./BaseView";

import { Header } from "../templates/Header";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { loginUserAtom, loginUserIdAtom } from "@/store/atoms";

export default function IndexView() {
  const [loginUserId] = useAtom(loginUserIdAtom);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (loginUserId != null) {
      setIsAuthenticated(true);
    }
  }, [loginUserId]);

  return (
    <BaseView title="index">
      <Header isLogin={isAuthenticated} />
      <div>index</div>
    </BaseView>
  );
}
