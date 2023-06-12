import BaseView from "./BaseView";

import { CommonHeader } from "../templates/Header";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { loginUserAtom, loginUserIdAtom } from "@/store/atoms";
import { Header } from "antd/es/layout/layout";

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
      <CommonHeader isLogin={isAuthenticated} />
    </BaseView>
  );
}
