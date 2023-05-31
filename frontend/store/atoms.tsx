import { atom } from "jotai";

import {
  IsLoadingUserInfoAtom,
  LoginUserIdAtom,
  LoginUserAccessTokenAtom,
  LoginUserAtom,
} from "@/types";

export const loginUserIdAtom = atom<LoginUserIdAtom>(null);
export const loginUserAccessTokenAtom = atom<LoginUserAccessTokenAtom>("");
export const isLoadingUserInfoAtom = atom<IsLoadingUserInfoAtom>(false);

export const loginUserAtom = atom<LoginUserAtom>(null);
