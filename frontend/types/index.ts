type User = {
  auth0_id: string;
  auth0_name: string;
  username: string;
  email: string;
};

// データ読み込み中
export type IsLoadingData = boolean;

// ログイン状況確認中
export type IsCheckingAuthData = boolean;

// auth0_id
export type LoginUserIdAtom = string | null;

// ログインユーザーのアクセストークン
export type LoginUserAccessTokenAtom = string | null;
// ログインユーザーのリフレッシュトークン
export type LoginUserRefreshTokenAtom = string | null;

// ログインユーザーのアクセストークンの期限
export type LoginUserAccessTokenExpAtom = string | null;

// ログインユーザーの情報
export type LoginUserAtom = User | null;

// auth0のアクセストークン
export type LoginUserAuth0AccessTokenAtom = string | null;
