import { AxiosClient } from "@/utils/axiosClient";
import { useState } from "react";
import { API_URL } from "./urls";
import { InstagramUserBasicInfo } from "@/types";

type Props = {
  token: string | null;
  business_account_id: string;
  instagram_access_token: string;
};

type InstagramUserDetailError = {
  code: string;
  response: {
    data: {
      type: string;
    };
    status: number;
  };
};

export const checkInstagramUser = () => {
  const [userDetail, setUserDetail] = useState<InstagramUserBasicInfo | null>(
    null
  );
  const [userDetailError, setError] = useState<InstagramUserDetailError | null>(
    null
  );
  const [loadingUserDetail, setLoading] = useState<boolean>(false);

  const fetchData = async ({
    token,
    business_account_id,
    instagram_access_token
  }: Props) => {
    try {
      setLoading(true);
      const response = await AxiosClient({
        url: `${API_URL.INSTAGRAM_CHECK_USER}/`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          business_account_id: business_account_id,
          token: instagram_access_token
        }
      });
      setUserDetail(response.data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setUserDetail(null);
      setError(err);
      setLoading(false);
    }
  };

  return { userDetail, userDetailError, loadingUserDetail, fetchData };
};
