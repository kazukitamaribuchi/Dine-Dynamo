import {
  Button,
  Form,
  FormInstance,
  Input,
  Modal,
  Spin,
  notification
} from "antd";
import { useEffect, useState } from "react";
import { checkInstagramUser } from "@/hooks/api/action/checkInstagramUser";
import { useAccessToken } from "@/hooks/api/useAccessToken";
import { loginUserIdAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import {
  InstagramUserBasicInfo,
  InstagramUserBasicInfoForCheckData,
  InstagramUserDetailError
} from "@/types";

import { CheckCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;

interface checkDataType {
  token: string | null;
  business_account_id: string;
  instagram_access_token: string;
}

interface Props {
  openAddInstagramData: boolean;
  setInstagramData: (data: InstagramUserBasicInfoForCheckData | null) => void;
  closeAddInstagramData: () => void;
  isSnsConnected: boolean;
  setIsSnsConnected: (flg: boolean) => void;
  cancelLoading: boolean;
  setCancelLoading: (flg: boolean) => void;
  businessAccountStatus: string;
  setBusinessAccountStatus: (text: string) => void;
  accessTokenStatus: string;
  setAccessTokenStatus: (text: string) => void;
  businessAccountIdError: string | null;
  setBusinessAccountIdError: (text: string | null) => void;
  tokenError: string | null;
  setTokenError: (text: string | null) => void;
  instagramDataForm: FormInstance;

  userDetail: InstagramUserBasicInfo | null;
  setUserDetail: (userDetail: InstagramUserBasicInfo | null) => void;
  userDetailError: InstagramUserDetailError | null;
  loadingUserDetail: boolean;
  checkData: ({
    token,
    business_account_id,
    instagram_access_token
  }: checkDataType) => void;

  mode: string;
}

export const AddInstagramDataModal = ({
  openAddInstagramData,
  setInstagramData,
  closeAddInstagramData,
  isSnsConnected,
  setIsSnsConnected,
  cancelLoading,
  setCancelLoading,
  businessAccountStatus,
  setBusinessAccountStatus,
  accessTokenStatus,
  setAccessTokenStatus,
  businessAccountIdError,
  setBusinessAccountIdError,
  tokenError,
  setTokenError,
  instagramDataForm,

  userDetail,
  setUserDetail,
  userDetailError,
  loadingUserDetail,
  checkData,
  mode
}: Props) => {
  const [loginUserId] = useAtom(loginUserIdAtom);
  const { finalToken: token, error: accessTokenError } = useAccessToken();

  // ビジネスアカウントIDの変更でバリデーションステータスを更新
  const onBusinessAcountIdInputChange = async () => {
    setBusinessAccountStatus("validating");
    try {
      await instagramDataForm.validateFields(["business_account_id"]);
      setBusinessAccountStatus(""); // バリデーション成功
    } catch (errorInfo) {
      setBusinessAccountStatus("error"); // バリデーション失敗
    }
  };

  // アクセストークンの変更でバリデーションステータスを更新
  const onAccessTokenInputChange = async () => {
    setAccessTokenStatus("validating");
    try {
      await instagramDataForm.validateFields(["access_token"]);
      setAccessTokenStatus(""); // バリデーション成功
    } catch (errorInfo) {
      setAccessTokenStatus("error"); // バリデーション失敗
    }
  };

  // 登録ボタンを押下した時の処理
  const handleOk = async () => {
    try {
      const formData = await instagramDataForm.validateFields();

      if (userDetail) {
        setInstagramData({
          business_account_id: formData.business_account_id,
          name: userDetail.name,
          username: userDetail.username,
          access_token: formData.access_token
        });
        closeAddInstagramData();
      } else {
        if (mode == "update") {
          closeAddInstagramData();
        } else if (mode == "create") {
          notification.error({
            message: "エラー",
            description: "エラーが発生しました。",
            duration: 2
          });
          setIsSnsConnected(false);
        }
      }
    } catch (err) {
      notification.error({
        message: "エラー",
        description: "エラーが発生しました。",
        duration: 2
      });
      setIsSnsConnected(false);
    }
  };

  // 連携確認ボタンを押下した際の処理
  const handleConfirmClick = async () => {
    try {
      // フォームのすべてのフィールドに対してバリデーションを実行
      const formData = await instagramDataForm.validateFields();

      // formDataが正しい場合のみ、APIを呼び出す
      checkData({
        token: token,
        business_account_id: formData.business_account_id,
        instagram_access_token: formData.access_token
      });
    } catch (err) {}
  };

  // キャンセルボタンを押下した際の処理
  const handleCancelClick = () => {
    setCancelLoading(true);
    const timer = setTimeout(() => {
      setIsSnsConnected(false);
      setBusinessAccountStatus("");
      setAccessTokenStatus("");
      setCancelLoading(false);
      setInstagramData(null);

      notification.success({
        message: "キャンセル",
        description: "インスタグラム連携をキャンセルしました。",
        duration: 2
      });
    }, 500);
  };

  let isOkDisabled = !isSnsConnected || loadingUserDetail;

  // ユーザー情報取得結果による状態の更新
  useEffect(() => {
    if (openAddInstagramData && userDetail) {
      notification.success({
        message: "Instagram連携確認",
        description: "Instagramの情報を正常に取得しました。",
        duration: 2
      });
      // message.success("Instagramの情報を正常に取得しました。");
      setIsSnsConnected(true);
      setBusinessAccountIdError(null);

      setBusinessAccountStatus("success");
      setAccessTokenStatus("success");

      setTokenError(null);
    } else {
      setIsSnsConnected(false);
    }
  }, [userDetail]);

  // ユーザー情報取得エラーによる状態の更新
  useEffect(() => {
    if (userDetailError) {
      notification.error({
        message: "エラー",
        description: "Instagramの情報取得中にエラーが発生しました。",
        duration: 2
      });
      // message.error("Instagramの情報取得中にエラーが発生しました。");
      setIsSnsConnected(false);

      switch (userDetailError.response.data.type) {
        case "OAuthException":
          setTokenError("正しいアクセストークンを入力してください。");
          setBusinessAccountStatus("");
          setAccessTokenStatus("error");

          setBusinessAccountIdError(null);
          break;
        case "GraphMethodException":
          setBusinessAccountIdError(
            "正しいビジネスアカウントを入力してください。"
          );
          setBusinessAccountStatus("error");
          setAccessTokenStatus("");

          setTokenError(null);
          break;
        default:
          setBusinessAccountIdError(
            "正しいビジネスアカウントを入力してください。"
          );
          setBusinessAccountStatus("error");
          setTokenError("正しいアクセストークンを入力してください。");
          setAccessTokenStatus("error");
          break;
      }
    } else {
      setBusinessAccountIdError(null);
      setTokenError(null);
    }
  }, [userDetailError]);

  return (
    <Modal
      title="Instagram Info"
      open={openAddInstagramData}
      onOk={closeAddInstagramData}
      onCancel={closeAddInstagramData}
      footer={
        <>
          {!isSnsConnected && (
            <Button
              disabled={loadingUserDetail}
              key="confirm"
              onClick={handleConfirmClick}
            >
              連携確認
            </Button>
          )}
          {isSnsConnected && (
            <Button
              disabled={loadingUserDetail}
              key="cancel"
              onClick={handleCancelClick}
            >
              連携解除
            </Button>
          )}

          <Button
            disabled={isOkDisabled}
            key="ok"
            type="primary"
            onClick={handleOk}
          >
            登録
          </Button>
        </>
      }
    >
      <Spin spinning={loadingUserDetail || cancelLoading} tip="Loading...">
        <Form form={instagramDataForm} layout="vertical">
          <Form.Item name="username" label="username">
            <Input
              disabled
              style={{ width: "70%" }}
              placeholder={
                userDetail && userDetail.username && isSnsConnected
                  ? userDetail.username
                  : ""
              }
            />
          </Form.Item>
          <Form.Item
            name="business_account_id"
            label="ビジネスアカウントID"
            rules={[
              {
                required: true,
                message: "ビジネスアカウントIDは必須項目です。"
              },
              {
                pattern: /^\d+$/,
                message: "ビジネスアカウントIDは数値で入力してください。"
              }
            ]}
            hasFeedback
            help={businessAccountIdError}
            validateStatus={businessAccountStatus}
          >
            <Input
              allowClear
              placeholder="ビジネスアカウントを入力してください。"
              onChange={onBusinessAcountIdInputChange}
              disabled={isSnsConnected}
            />
          </Form.Item>
          <Form.Item
            name="access_token"
            label="アクセストークン"
            rules={[
              {
                required: true,
                message: "アクセストークンは必須項目です。"
              }
            ]}
            hasFeedback
            help={tokenError}
            validateStatus={accessTokenStatus}
          >
            <TextArea
              allowClear
              rows={4}
              placeholder="アクセストークンを入力してください。"
              onChange={onAccessTokenInputChange}
              disabled={isSnsConnected}
            />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
