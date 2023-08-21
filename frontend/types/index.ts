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

export type InstagramMedia = {
  id: string;
  like_count: number;
  media_type: "CAROUSEL_ALBUM" | string; // 他に可能な文字列があれば追加
  media_product_type: "FEED" | string; // 他に可能な文字列があれば追加
  permalink: string;
  timestamp: string;
  username: string;
  media_url: string;
  caption: string;
  is_comment_enabled: boolean;
  insight: Insight;
  thumbnail_url?: string;
};

type Insight = {
  error?: {
    message: string;
    type: string;
    code: number;
    error_data: {
      blame_field_specs: string[][];
    };
    error_subcode: number;
    is_transient: boolean;
    error_user_title: string;
    error_user_msg: string;
    fbtrace_id: string;
  };
  impression?: number;
  reach?: number;
  // insightに他のプロパティがある場合、こちらに追加
};
