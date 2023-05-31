import { AxiosClient } from "@/utils/axiosClient";
import { useAccessToken } from "./useAccessToken";
import { useState, useEffect } from "react";

type ApiResponse<T> = {
  data: T | null;
  error: ApiError | unknown | null;
  isLoadingAxios: boolean;
};

type ApiError = {
  status: number;
  message: string;
  data?: { errorCode?: string; message?: string } | null;
};

type ApiRequestMethod = "GET" | "POST" | "PUT" | "DELETE";

type ApiRequestHeader = {};

type ApiRequest<T> = {
  url: string;
  method?: ApiRequestMethod;
  requestBody?: T | null;
  header?: ApiRequestHeader;
};

// Auth0のgetAccessTokenはhooksのためhooks用
export const useAxiosRequest = <T extends Record<string, unknown>>({
  url,
  method = "GET",
  requestBody = null,
  header,
}: ApiRequest<T>): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | unknown | null>(null);
  const [isLoadingAxios, setIsLoadingAxios] = useState<boolean>(true);
  const { token } = useAccessToken();

  useEffect(() => {
    if (token) {
      const fetchData = async (token: string) => {
        setIsLoadingAxios(true);
        const headers = {
          ...header,
          Authorization: `Bearer ${token}`,
        };
        try {
          const res = await AxiosClient({
            headers,
            method,
            url,
            data: requestBody,
          });
          // 追加: コンポーネントがアンマウントされていない場合のみステートを更新
          setData(res.data);
        } catch (err) {
          setError(err);
        } finally {
          setIsLoadingAxios(false);
        }
      };
      fetchData(token);
    }
  }, [url, method, requestBody, token]);

  return { data, error, isLoadingAxios };
};
