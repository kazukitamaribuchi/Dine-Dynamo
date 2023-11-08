import { Button, Form, Input, Modal, Spin, notification } from "antd";
import { useEffect, useState } from "react";
import { checkInstagramUser } from "@/hooks/api/checkInstagramUser";
import { useAccessToken } from "@/hooks/api/useAccessToken";
import { loginUserIdAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { InstagramUserBasicInfoForCheckData } from "@/types";

import { CheckCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;

interface Props {
  openAddInstagramData: boolean;
  setInstagramData: (data: InstagramUserBasicInfoForCheckData | null) => void;
  closeAddInstagramData: () => void;
  isSnsConnected: boolean;
  setIsSnsConnected: (flg: boolean) => void;
}

export const AddInstagramDataModal = ({
  openAddInstagramData,
  setInstagramData,
  closeAddInstagramData,
  isSnsConnected,
  setIsSnsConnected
}: Props) => {
  const [data, setData] = useState(null);
  const [form] = Form.useForm(); // formインスタンスの作成

  const [loginUserId] = useAtom(loginUserIdAtom);
  const { finalToken: token, error: accessTokenError } = useAccessToken();

  // キャンセル中のローディング
  const [cancelLoading, setCancelLoading] = useState(false);

  // ビジネスアカウントIDのバリデーションの状態
  const [businessAccountStatus, setBusinessAccountStatus] = useState("");

  // ビジネスアカウントIDの変更でバリデーションステータスを更新
  const onBusinessAcountIdInputChange = async () => {
    setBusinessAccountStatus("validating");
    try {
      await form.validateFields(["business_account_id"]);
      setBusinessAccountStatus(""); // バリデーション成功
    } catch (errorInfo) {
      setBusinessAccountStatus("error"); // バリデーション失敗
    }
  };

  // アクセストークンの状態
  const [accessTokenStatus, setAccessTokenStatus] = useState("");

  // アクセストークンの変更でバリデーションステータスを更新
  const onAccessTokenInputChange = async () => {
    setAccessTokenStatus("validating");
    try {
      await form.validateFields(["access_token"]);
      setAccessTokenStatus(""); // バリデーション成功
    } catch (errorInfo) {
      setAccessTokenStatus("error"); // バリデーション失敗
    }
  };

  // ビジネスアカウントIDのエラーテキスト
  const [businessAccountIdError, setBusinessAccountIdError] = useState<
    string | null
  >(null);

  // アクセストークンのエラーテキスト
  const [tokenError, setTokenError] = useState<string | null>(null);

  // インスタグラムのユーザー確認のhooks
  const { userDetail, userDetailError, loadingUserDetail, fetchData } =
    checkInstagramUser();

  // 登録ボタンを押下した時の処理
  const handleOk = async () => {
    try {
      const formData = await form.validateFields();

      if (userDetail) {
        setInstagramData({
          business_account_id: form.getFieldValue("business_account_id"),
          name: userDetail.name,
          username: userDetail.username,
          access_token: form.getFieldValue("access_token")
        });
        closeAddInstagramData();
      } else {
        notification.error({
          message: "エラー",
          description: "エラーが発生しました。",
          duration: 2
        });
        setIsSnsConnected(false);
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
      const formData = await form.validateFields();

      // formDataが正しい場合のみ、APIを呼び出す
      fetchData({
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

  const isOkDisabled = !isSnsConnected || loadingUserDetail;

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
              キャンセル
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
        <Form form={form} layout="vertical">
          <Form.Item label="username">
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
