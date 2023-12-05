import { AxiosClient } from "@/utils/axiosClient";
import { useEffect, useState } from "react";
import { API_URL } from "../urls";
import { Tenant } from "@/types";

type Props = {
  auth0Id: string | null;
  token: string | null;
};

export const getUserTenantList = () => {
  const [userTenantList, setData] = useState<Array<Tenant>>([]);
  const [userTenantListError, setError] = useState<unknown>(null);
  const [loadingUserTenantList, setLoadingUserTenantList] = useState(false);

  const fetchData = async ({ auth0Id, token }: Props) => {
    try {
      setLoadingUserTenantList(true);
      const response = await AxiosClient({
        url: `${API_URL.USER}/${auth0Id}/tenants/`,
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

  return {
    userTenantList,
    userTenantListError,
    loadingUserTenantList,
    fetchData
  };
};
