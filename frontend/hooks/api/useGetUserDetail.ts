import { loginUserAtom } from "@/store/atoms";
import { AxiosClient } from "@/utils/axiosClient";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { API_URL } from "./urls";

type Props = {
  auth0_id: string | null;
  token: string | null;
};

export const useGetUserDetail = ({ auth0_id, token }: Props) => {
  const [loginUser, setLoginUser] = useAtom(loginUserAtom);
  const [userDetail, setUserDetail] = useState(null);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosClient({
          url: `${API_URL.USER}/${auth0_id}/`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetail(response.data);
        setLoginUser(response.data);
      } catch (err) {
        setError(err);
      }
    };

    if (auth0_id && token && userDetail == null) {
      fetchData();
    }
  }, [auth0_id, token]);

  return { userDetail, error };
};
