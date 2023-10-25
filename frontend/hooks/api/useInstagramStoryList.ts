import { AxiosClient } from "@/utils/axiosClient";
import { useEffect, useState } from "react";
import { API_URL } from "./urls";
import { InstagramStory } from "@/types";

type Props = {
  auth0_id: string | null;
  token: string | null;
};

export const useInstagramStoryList = ({ auth0_id, token }: Props) => {
  const [instagramStoryList, setData] = useState<Array<InstagramStory>>([]);
  const [instagramStoryListError, setError] = useState<unknown>(null);
  const [loadingInstagramStoryList, setLoadingInstagramStoryList] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingInstagramStoryList(true);
        const response = await AxiosClient({
          url: `${API_URL.INSTAGRAM_MEDIA}/`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data);
        setLoadingInstagramStoryList(false);
      } catch (err) {
        setError(err);
        setLoadingInstagramStoryList(false);
      }
    };

    if (auth0_id && token) {
      fetchData();
    }
  }, [auth0_id, token]);

  return {
    instagramStoryList,
    instagramStoryListError,
    loadingInstagramStoryList
  };
};
