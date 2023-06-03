import { useAtom } from "jotai";
import {
  loginUserAccessTokenAtom,
  loginUserRefreshTokenAtom,
} from "@/store/atoms";

export function useGetTokensFromStore() {
  const [token] = useAtom(loginUserAccessTokenAtom);
  const [refreshToken] = useAtom(loginUserRefreshTokenAtom);

  return { token, refreshToken };
}
