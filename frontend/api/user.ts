import { useAxiosRequest } from "@/hooks/useAxiosRequest";
import { API_URL } from "./urls";

import { AxiosClient } from "@/utils/axiosClient";
import { loginUserAccessTokenAtom } from "@/store/atoms";
import { useAtom } from "jotai";

type UserDetailReqBodyData = { auth0_id: string; token: string };

export const getUserDetail = async (req: UserDetailReqBodyData) => {
  try {
    const response = await AxiosClient({
      url: `${API_URL.USER}/${req.auth0_id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${req.token}`,
      },
    });
    return { user: response.data };
  } catch (err) {
    return { user: null };
  }
};
