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
  const [lodingInstagramStoryList, setLodingInstagramStoryList] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLodingInstagramStoryList(true);
        const response = await AxiosClient({
          url: `${API_URL.INSTAGRAM_MEDIA}/`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data);
        setLodingInstagramStoryList(false);
      } catch (err) {
        setError(err);
        setLodingInstagramStoryList(true);
      }
    };

    if (auth0_id && token) {
      fetchData();
    }
  }, [auth0_id, token]);

  return {
    instagramStoryList,
    instagramStoryListError,
    lodingInstagramStoryList
  };
};
