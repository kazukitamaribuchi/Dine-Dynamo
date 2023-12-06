import {
  Tenant,
  InstagramUserBasicInfoForCheckData,
  BasicAxiosError
} from "@/types";
import { AxiosClient } from "@/utils/axiosClient";
import { useState } from "react";
import { API_URL } from "../urls";

type Props = {
  auth0Id: string | undefined;
  token: string | null;
  tenantId: number;
  name: string | null;
  remarks: string | null;
  instagram: InstagramUserBasicInfoForCheckData | null;
};

export const updateTenant = () => {
  const [tenantDetail, setTenantDetail] = useState<Tenant | null>(null);
  const [tenantDetailError, setError] = useState<BasicAxiosError | null>(null);
  const [loadingTenantDetail, setLoading] = useState<boolean>(false);

  const fetchData = async ({
    auth0Id,
    token,
    tenantId,
    name,
    remarks,
    instagram
  }: Props) => {
    setLoading(true);
    try {
      const response = await AxiosClient({
        url: `${API_URL.TENANT}/${tenantId}/`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          auth0Id: auth0Id,
          name: name,
          remarks: remarks ? remarks : "",
          instagramData: instagram
        }
      });
      setTenantDetail(response.data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setTenantDetail(null);
      setError(err);
      setLoading(false);
    }
  };

  return { tenantDetail, tenantDetailError, loadingTenantDetail, fetchData };
};
