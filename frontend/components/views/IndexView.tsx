import BaseView from "./BaseView";

import { Header } from "../templates/Header";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { loginUserAtom } from "@/store/atoms";

export default function IndexView() {
  const [loginUser] = useAtom(loginUserAtom);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (loginUser != null) {
      setIsAuthenticated(true);
    }
  }, [loginUser]);

  return (
    <BaseView title="index">
      <Header isLogin={isAuthenticated} />
      <div>index</div>
    </BaseView>
  );
}
