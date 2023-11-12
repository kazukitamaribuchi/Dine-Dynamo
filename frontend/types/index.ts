import internal from "stream";

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

// ====================Instagram===================

export type InstagramMedia = {
  id: string;
  like_count: number;
  media_type: string;
  media_product_type: string;
  permalink: string;
  timestamp: string;
  username: string;
  media_url: string;
  caption: string;
  comments_count: number;
  is_comment_enabled: boolean;
  thumbnail_url?: string;
  insight?: Insight | InsightError;
};

export type InstagramUserBasicInfoForCheckData = {
  business_account_id: string;
  name: string;
  username: string;
  access_token: string;
};

export type InstagramUserBasicInfo = {
  username: string;
  biography: string;
  followers_count: number;
  follows_count: number;
  media_count: number;
  name: string;
  profile_picture_url: string;
  website: string;
  id: string;
};

export type Instagram = {
  id: string;
  business_account_id: string;
  name: string;
  username: string;
  access_token: string;
  created_at: string;
  updated_at: string;
};

export type Tenant = {
  id: string;
  user: string;
  name: string;
  instagram?: Instagram;
  connected_instagram: boolean;
  facebook?: Facebook;
  twitter?: Twitter;
  created_at: string;
  updated_at: string;
  last_updated_at: string;
};

export type Facebook = {
  id: string;
};

export type Twitter = {
  id: string;
};

export type InstagramStory = {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  comments_count: number;
  like_count: number;
  permalink: string;
  thumbnail_url?: string;
  timestamp: string;
  username: string;
  media_product_type: string;
  insight: Insight | InsightError;
};

export type Insight = {
  insights: InsightData;
  id: string;
};

export type InsightData = {
  data: InsightValue[];
};

export type InsightValue = {
  name: string;
  period: string;
  values: InsightValueDetail[];
  title: string;
  description: string;
  id: string;
};

export type InsightValueDetail = {
  value: number;
};

export type InsightError = {
  error: InsightErrorDetail;
};

export type InsightErrorDetail = {
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

export type InstagramUserDetailError = {
  code: string;
  response: {
    data: {
      type: string;
    };
    status: number;
  };
};
