import { Tenant, InstagramUserBasicInfoForCheckData } from "@/types";
import { AxiosClient } from "@/utils/axiosClient";
import { useState } from "react";
import { API_URL } from "./urls";

type Props = {
  auth0_id: string | undefined;
  token: string | null;

  name: string | null;
  remarks: string | null;
  instagram: InstagramUserBasicInfoForCheckData | null;
};

// type addTenantError = {
//   code: string;
//   response: {
//     data: {
//       detail:
//     }
//   }
// }

export const addTenant = () => {
  const [tenantDetail, setTenantDetail] = useState<Tenant | null>(null);
  const [tenantDetailError, setError] = useState<boolean>(false);
  const [loadingTenantDetail, setLoading] = useState<boolean>(false);

  const fetchData = async ({
    auth0_id,
    token,
    name,
    remarks,
    instagram
  }: Props) => {
    try {
      setLoading(true);
      const response = await AxiosClient({
        url: `${API_URL.TENANT}/`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          auth0_id: auth0_id,
          name: name,
          remarks: remarks ? remarks : "",
          instagramData: instagram
        }
      });
      setTenantDetail(response.data);
      setLoading(false);
      setError(false);

      console.log("detail", response.data);
    } catch (err) {
      setTenantDetail(null);
      setError(true);
      setLoading(false);

      console.log("err", err);
    }
  };

  return { tenantDetail, tenantDetailError, loadingTenantDetail, fetchData };
};
