import BaseView from "./BaseView";

import { Header } from "../templates/Header";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { useAccessToken } from "@/hooks/useAccessToken";
import { useAxiosRequest } from "@/hooks/useAxiosRequest";
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
