import {
  Drawer,
  Space,
  Button,
  Form,
  Row,
  Col,
  Input,
  Select,
  Card,
  Avatar,
  Typography,
  notification
} from "antd";

import {
  InstagramOutlined,
  PlusOutlined,
  InstagramFilled,
  CheckCircleOutlined
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { AddInstagramDataModal } from "../parts/AddInstagramDataModal";
import { InstagramUserBasicInfoForCheckData, Tenant } from "@/types";
import { loginUserIdAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { useAccessToken } from "@/hooks/api/useAccessToken";
import { createTenant } from "@/hooks/api/create/createTenant";
import { updateTenant as updateTenantAction } from "@/hooks/api/update/updateTenant";
import { checkInstagramUser } from "@/hooks/api/action/checkInstagramUser";
import instagram from "@/pages/instagram";

const { Title, Text } = Typography;

interface Props {
  openTenantDialog: boolean;
  closeTenantDrawer: () => void;
  updateTenant: () => void;
  mode: string;
  tenantData: Tenant | null;
}

const gridStyle: React.CSSProperties = {
  width: "33%",
  textAlign: "center",
  padding: "45px 0",
  cursor: "pointer"
};

export const TenantDrawer = ({
  openTenantDialog,
  closeTenantDrawer,
  updateTenant,
  mode,
  tenantData
}: Props) => {
  // テナント情報のフォーム
  const [form] = Form.useForm();
  // インスタ情報のフォーム
  const [instagramDataForm] = Form.useForm();

  // 登録ボタンの活性非活性状態
  const [isOkDisabled, setIsOkDisabled] = useState(true);

  const [loginUserId] = useAtom(loginUserIdAtom);
  const { finalToken: token, error: accessTokenError } = useAccessToken();

  // インスタデータ
  const [instagramData, setInstagramData] =
    useState<InstagramUserBasicInfoForCheckData | null>(null);
  // インスタのモーダル状態
  const [openAddInstagramData, setOpenAddInstagramData] = useState(false);

  // SNS連携確認できたかのフラグ
  const [isSnsConnected, setIsSnsConnected] = useState(false);

  // テナント名のバリデーションの状態
  const [tenantNameStatus, setTenantNameStatus] = useState("");

  // テナント名のエラーテキスト
  const [tenantNameError, setTenantNameError] = useState<string | null>(null);

  // キャンセル中のローディング
  const [cancelLoading, setCancelLoading] = useState(false);

  // ビジネスアカウントIDのバリデーションの状態
  const [businessAccountStatus, setBusinessAccountStatus] = useState("");

  // アクセストークンの状態
  const [accessTokenStatus, setAccessTokenStatus] = useState("");

  // ビジネスアカウントIDのエラーテキスト
  const [businessAccountIdError, setBusinessAccountIdError] = useState<
    string | null
  >(null);

  // アクセストークンのエラーテキスト
  const [tokenError, setTokenError] = useState<string | null>(null);

  // テナント追加のhooks
  const { tenantDetail, tenantDetailError, loadingTenantDetail, fetchData } =
    createTenant();

  // テナント追加のhooks
  const {
    tenantDetail: updatedTenantDetail,
    tenantDetailError: updatedTenantDetailError,
    loadingTenantDetail: updatedLoadingTenantDetail,
    fetchData: updateFetchData
  } = updateTenantAction();

  const [modalTitle, setModalTitle] = useState<string>("");

  const setTitle = (mode: string) => {
    if (mode == "create") {
      setModalTitle("Create a new tenant");
    } else if (mode == "update") {
      setModalTitle("Update a tenant");
    }
  };

  useEffect(() => {
    if (!openTenantDialog) {
      return;
    }

    if (mode == "create") {
      setTitle(mode);
      setInstagramData(null);
      form.setFieldsValue({
        name: "",
        remarks: ""
      });
      setIsOkDisabled(true);
    } else if (mode == "update") {
      setTitle(mode);
      setIsOkDisabled(false);

      if (tenantData) {
        form.setFieldsValue({
          name: tenantData.name,
          remarks: tenantData.remarks
        });

        const instagram = tenantData.instagram;
        if (instagram) {
          console.log("instagram", instagram);

          const instagramInfo = {
            business_account_id: instagram.business_account_id,
            name: instagram.name,
            username: instagram.username,
            access_token: instagram.access_token
          };
          setInstagramData(instagramInfo);
          setIsSnsConnected(true);
          setAccessTokenStatus("");
          setBusinessAccountStatus("");

          instagramDataForm.setFieldsValue({
            username: instagram.username,
            business_account_id: instagram.business_account_id,
            access_token: instagram.access_token
          });
        } else {
          setInstagramData(null);
        }
      }
    }
  }, [openTenantDialog]);

  // インスタグラムのユーザー確認のhooks
  const {
    userDetail,
    setUserDetail,
    userDetailError,
    loadingUserDetail,
    checkData
  } = checkInstagramUser();

  // インスタ追加のモーダル開く
  const showAddInstagramData = () => {
    setOpenAddInstagramData(true);
  };

  // インスタ追加のモーダル閉じる
  const closeAddInstagramData = () => {
    setOpenAddInstagramData(false);
  };

  // テナント名の変更でバリデーションステータスを更新
  const onTenantNameInputChange = async () => {
    setIsOkDisabled(true);
    setTenantNameStatus("validating");
    try {
      await form.validateFields(["name"]);
      setIsOkDisabled(false);
      setTenantNameStatus("success"); // バリデーション成功
    } catch (errorInfo) {
      setTenantNameStatus("error"); // バリデーション失敗
      setIsOkDisabled(true);
    }
  };

  const handleSubmit = () => {
    if (mode == "create") {
      handleRegister();
    } else if (mode == "update") {
      handleUpdate();
    }
  };

  // 登録ボタン押下時の処理
  const handleRegister = async () => {
    try {
      const formData = await form.validateFields();

      if (loginUserId) {
        fetchData({
          auth0Id: loginUserId,
          token: token,
          name: formData.name,
          remarks: formData.remarks,
          instagram: instagramData
        });
      } else {
        // TODO
        notification.error({
          message: "エラー",
          description: "エラーが発生しました。",
          duration: 2
        });
      }
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
    } catch (err) {}
  };

  // テナント作成後の動作
  useEffect(() => {
    if (tenantDetailError) {
      const msg = tenantDetailError.response.data.msg;

      notification.error({
        message: "テナント登録エラー",
        description: msg,
        duration: 2
      });
    } else if (tenantDetail) {
      notification.success({
        message: "テナント登録成功",
        description: "テナントの作成に成功しました。",
        duration: 2
      });
      init();
      updateTenant();
      closeTenantDrawer();
    }
  }, [tenantDetail, tenantDetailError]);

  // フォーム等の初期化
  const init = () => {
    form.resetFields();
    setInstagramData(null);
    setTenantNameStatus("");
    setIsOkDisabled(true);

    instagramDataForm.resetFields();
    setCancelLoading(false);
    setBusinessAccountStatus("");
    setAccessTokenStatus("");
    setBusinessAccountIdError(null);
    setTokenError(null);

    setIsSnsConnected(false);
  };

  return (
    <Drawer
      title={modalTitle}
      size="large"
      onClose={closeTenantDrawer}
      open={openTenantDialog}
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={18}>
            <Form.Item
              name="name"
              label="店舗名"
              rules={[
                {
                  required: true,
                  message: "店舗名は必須項目です。"
                }
              ]}
              hasFeedback
              help={tenantNameError}
              validateStatus={tenantNameStatus}
            >
              <Input
                allowClear
                onChange={onTenantNameInputChange}
                placeholder="店舗名を入力してください。"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="SNS連携">
              <Card style={{ border: "none", boxShadow: "none" }}>
                <Card.Grid onClick={showAddInstagramData} style={gridStyle}>
                  <div style={{ height: "75px" }}>
                    <Avatar
                      icon={<InstagramFilled />}
                      style={
                        instagramData ? { backgroundColor: "#125688" } : {}
                      }
                    />
                    {/* <Avatar
                      icon={
                        <FaSquareInstagram
                          style={{
                            fontSize: "20px",
                            position: "relative",
                            top: "3px",
                            color: "#125688"
                          }}
                        />
                      }
                    /> */}
                    <Title level={5} style={{ marginTop: 5, marginBottom: 0 }}>
                      Instagram
                    </Title>
                    <div
                      style={{
                        color: "green",
                        fontSize: "10px"
                      }}
                    >
                      {instagramData && (
                        <>
                          <CheckCircleOutlined style={{ color: "green" }} />
                          <Space />
                        </>
                      )}
                      {instagramData ? "連携済" : "未連携"}
                    </div>
                  </div>
                </Card.Grid>
              </Card>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="remarks"
              label="備考"
              rules={[
                {
                  required: false
                }
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Space>
            <Button onClick={closeTenantDrawer}>キャンセル</Button>
            <Button
              disabled={isOkDisabled}
              onClick={handleSubmit}
              type="primary"
            >
              {mode == "create" ? "登録" : "更新"}
            </Button>
          </Space>
        </Row>
      </Form>

      <AddInstagramDataModal
        openAddInstagramData={openAddInstagramData}
        setInstagramData={setInstagramData}
        closeAddInstagramData={closeAddInstagramData}
        isSnsConnected={isSnsConnected}
        setIsSnsConnected={setIsSnsConnected}
        cancelLoading={cancelLoading}
        setCancelLoading={setCancelLoading}
        businessAccountStatus={businessAccountStatus}
        setBusinessAccountStatus={setBusinessAccountStatus}
        accessTokenStatus={accessTokenStatus}
        setAccessTokenStatus={setAccessTokenStatus}
        businessAccountIdError={businessAccountIdError}
        setBusinessAccountIdError={setBusinessAccountIdError}
        tokenError={tokenError}
        setTokenError={setTokenError}
        instagramDataForm={instagramDataForm}
        userDetail={userDetail}
        setUserDetail={setUserDetail}
        userDetailError={userDetailError}
        loadingUserDetail={loadingUserDetail}
        checkData={checkData}
        mode={mode}
      />
    </Drawer>
  );
};
