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
  const [lodingInstagramMediaList, setLodingInstagramMediaList] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLodingInstagramMediaList(true);
        const response = await AxiosClient({
          url: `${API_URL.INSTAGRAM_MEDIA}/`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data);
        setLodingInstagramMediaList(false);
      } catch (err) {
        setError(err);
        setLodingInstagramMediaList(true);
      }
    };

    if (auth0_id && token) {
      fetchData();
    }
  }, [auth0_id, token]);

  return {
    instagramMediaList,
    instagramMediaListError,
    lodingInstagramMediaList
  };
};
