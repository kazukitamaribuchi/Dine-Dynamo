type User = {
  auth0_id: string;
  auth0_name: string;
  username: string;
};

export type LoginUserIdAtom = string | null;
export type LoginUserAccessTokenAtom = string | null;
export type IsLoadingUserInfoAtom = boolean;
export type LoginUserAtom = User | null;
