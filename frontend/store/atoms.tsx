import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import {
  IsLoadingData,
  IsCheckingAuthData,
  LoginUserIdAtom,
  LoginUserAccessTokenAtom,
  LoginUserAtom,
  LoginUserAuth0AccessTokenAtom,
  LoginUserRefreshTokenAtom,
  LoginUserAccessTokenExpAtom,
} from "@/types";

export const isLoadingDataAtom = atom<IsLoadingData>(false);
export const isCheckingAuthAtom = atom<IsCheckingAuthData>(false);

export const loginUserIdAtom = atomWithStorage<LoginUserIdAtom>(
  "loginUserId",
  null
);

export const loginUserAccessTokenAtom =
  atomWithStorage<LoginUserAccessTokenAtom>("loginUserAccessToken", null);
export const loginUserRefreshTokenAtom =
  atomWithStorage<LoginUserRefreshTokenAtom>("loginUserRefreshToken", null);

export const loginUserAccessTokenExpAtom =
  atomWithStorage<LoginUserAccessTokenExpAtom>("loginUserAccessTokenExp", null);

export const loginUserAtom = atomWithStorage<LoginUserAtom>("loginUser", null);

export const loginUserAuth0AccessTokenAtom =
  atom<LoginUserAuth0AccessTokenAtom>(null);
