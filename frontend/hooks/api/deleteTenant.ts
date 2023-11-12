import { AxiosClient } from "@/utils/axiosClient";
import { useState } from "react";
import { API_URL } from "./urls";

type Props = {
  token: string | null;
  tenantId: number | null;
};

export const deleteTenant = () => {
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [tenantDeleteError, setError] = useState(false);
  const [loadingTenantDelete, setLoading] = useState<boolean>(false);

  const deleteData = async ({ token, tenantId }: Props) => {
    console.log("deleteData", token, tenantId);

    try {
      setLoading(true);
      const response = await AxiosClient({
        url: `${API_URL.TENANT}/${tenantId}/`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDeleteSuccess(true);
      setLoading(false);
      setError(false);

      console.log(response);
    } catch (err) {
      setError(true);
      setLoading(false);

      console.log(err);
    }
  };

  return {
    deleteSuccess,
    setDeleteSuccess,
    tenantDeleteError,
    loadingTenantDelete,
    deleteData
  };
};
