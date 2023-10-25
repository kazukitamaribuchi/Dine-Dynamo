import { AxiosClient } from "@/utils/axiosClient";
import { useEffect, useState } from "react";
import { API_URL } from "./urls";
import { InstagramMedia } from "@/types";

type Props = {
  auth0_id: string | null;
  token: string | null;
};

export const useInstagramMediaInsightList = ({ auth0_id, token }: Props) => {
  const [instagramMediaInsightList, setData] = useState<Array<InstagramMedia>>(
    []
  );
  const [instagramMediaInsightListError, setError] = useState<unknown>(null);
  const [
    loadingInstagramMediaInsightList,
    setLoadingInstagramMediaInsightList
  ] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingInstagramMediaInsightList(true);
        const response = await AxiosClient({
          url: `${API_URL.INSTAGRAM_MEDIA_INSIGHT}/`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data);
        setLoadingInstagramMediaInsightList(false);
      } catch (err) {
        setError(err);
        setLoadingInstagramMediaInsightList(false);
      }
    };

    if (auth0_id && token) {
      fetchData();
    }
  }, [auth0_id, token]);

  return {
    instagramMediaInsightList,
    instagramMediaInsightListError,
    loadingInstagramMediaInsightList
  };
};
