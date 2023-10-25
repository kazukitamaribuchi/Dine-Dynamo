import { AxiosClient } from "@/utils/axiosClient";
import { useEffect, useState } from "react";
import { API_URL } from "./urls";
import { InstagramMedia } from "@/types";

type Props = {
  auth0_id: string | null;
  token: string | null;
};

export const useInstagramMediaList = ({ auth0_id, token }: Props) => {
  const [instagramMediaList, setData] = useState<Array<InstagramMedia>>([]);
  const [instagramMediaListError, setError] = useState<unknown>(null);
  const [loadingInstagramMediaList, setLoadingInstagramMediaList] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingInstagramMediaList(true);
        const response = await AxiosClient({
          url: `${API_URL.INSTAGRAM_MEDIA}/`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data);
        setLoadingInstagramMediaList(false);
      } catch (err) {
        setError(err);
        setLoadingInstagramMediaList(true);
      }
    };

    if (auth0_id && token) {
      fetchData();
    }
  }, [auth0_id, token]);

  return {
    instagramMediaList,
    instagramMediaListError,
    loadingInstagramMediaList
  };
};
