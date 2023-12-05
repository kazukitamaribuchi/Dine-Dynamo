import { AxiosClient } from "@/utils/axiosClient";
import { useEffect, useState } from "react";
import { API_URL } from "../urls";
import { InstagramStory } from "@/types";

type Props = {
  auth0Id: string | null;
  token: string | null;
};

export const getInstagramStoryList = ({ auth0Id, token }: Props) => {
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

    if (auth0Id && token) {
      fetchData();
    }
  }, [auth0Id, token]);

  return {
    instagramStoryList,
    instagramStoryListError,
    loadingInstagramStoryList
  };
};
