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
  name: string | null;
  remarks: string | null;
  instagram: InstagramUserBasicInfoForCheckData | null;
};

export const createTenant = () => {
  const [tenantDetail, setTenantDetail] = useState<Tenant | null>(null);
  const [tenantDetailError, setError] = useState<BasicAxiosError | null>(null);
  const [loadingTenantDetail, setLoading] = useState<boolean>(false);

  const fetchData = async ({
    auth0Id,
    token,
    name,
    remarks,
    instagram
  }: Props) => {
    setLoading(true);
    try {
      const response = await AxiosClient({
        url: `${API_URL.TENANT}/`,
        method: "POST",
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
      // TODO エラー情報返すようになったのでそれを保持し、エラー毎にハンドリング
      console.log(err);

      setTenantDetail(null);
      setError(err);
      setLoading(false);
    }
  };

  return { tenantDetail, tenantDetailError, loadingTenantDetail, fetchData };
};
