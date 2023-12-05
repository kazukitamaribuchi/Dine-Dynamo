import { AxiosClient } from "@/utils/axiosClient";
import { useState } from "react";
import { API_URL } from "../urls";
import { Tenant } from "@/types";

type Props = {
  auth0Id: string | null;
  token: string | null;
  tenantId: number;
};

export const getUserTenantDetail = () => {
  const [userTenantDetail, setData] = useState<Array<Tenant>>([]);
  const [userTenantDetailError, setError] = useState<unknown>(null);
  const [loadingUserTenantDetail, setLoadingUserTenantDetail] = useState(false);

  const fetchData = async ({ auth0Id, token, tenantId }: Props) => {
    try {
      setLoadingUserTenantDetail(true);
      const response = await AxiosClient({
        url: `${API_URL.USER}/${auth0Id}/tenant/${tenantId}/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(response.data);
      setLoadingUserTenantDetail(false);
    } catch (err) {
      setError(err);
      setLoadingUserTenantDetail(false);
    }
  };

  return {
    userTenantDetail,
    userTenantDetailError,
    loadingUserTenantDetail,
    fetchData
  };
};
