import { API_URL } from "@/api/urls";
import { AxiosClient } from "../utils/axiosClient";

type GetAccessTokenReqBodyData = { auth0_id: string };

export const getAccessToken = async (req: GetAccessTokenReqBodyData) => {
  try {
    const response = await AxiosClient({
      url: `${API_URL.JWT}/`,
      method: "POST",
      data: {
        auth0_id: req.auth0_id,
      },
    });

    // console.log(response);

    const { access_token, refresh_token } = response.data;

    return { token: access_token, refresh: refresh_token };
  } catch (err) {
    return { token: null };
  }
};
