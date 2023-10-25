import { AxiosClient } from "@/utils/axiosClient";
import { useEffect, useState } from "react";
import { API_URL } from "./urls";
import { Tenant } from "@/types";

type Props = {
  auth0_id: string | null;
  token: string | null;
};

export const useUserTenantList = ({ auth0_id, token }: Props) => {
  const [userTenantList, setData] = useState<Array<Tenant>>([]);
  const [userTenantListError, setError] = useState<unknown>(null);
  const [loadingUserTenantList, setLoadingUserTenantList] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingUserTenantList(true);
        const response = await AxiosClient({
          url: `${API_URL.USER}/${auth0_id}/tenants/`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data);
        setLoadingUserTenantList(false);
      } catch (err) {
        setError(err);
        setLoadingUserTenantList(false);
      }
    };

    if (auth0_id && token) {
      fetchData();
    }
  }, [auth0_id, token]);

  return {
    userTenantList,
    userTenantListError,
    loadingUserTenantList
  };
};
