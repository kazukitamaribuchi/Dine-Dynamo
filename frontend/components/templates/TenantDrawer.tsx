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
import { InstagramUserBasicInfoForCheckData } from "@/types";
import { loginUserIdAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { useAccessToken } from "@/hooks/api/useAccessToken";
import { addTenant } from "@/hooks/api/addTenant";
import { isTypeOnlyImportDeclaration } from "typescript";
import { init } from "next/dist/compiled/@vercel/og/satori";

const { Title, Text } = Typography;

interface Props {
  openAddTenantDialog: boolean;
  closeAddTenantDrawer: () => void;
  updateTenant: () => void;
}

const gridStyle: React.CSSProperties = {
  width: "33%",
  textAlign: "center",
  padding: "45px 0",
  cursor: "pointer"
};

export const TenantDrawer = ({
  openAddTenantDialog,
  closeAddTenantDrawer,
  updateTenant
}: Props) => {
  const [form] = Form.useForm();

  const [isOkDisabled, setIsOkDisabled] = useState(true);

  const [loginUserId] = useAtom(loginUserIdAtom);
  const { finalToken: token, error: accessTokenError } = useAccessToken();

  const [instagramData, setInstagramData] =
    useState<InstagramUserBasicInfoForCheckData | null>(null);
  const [openAddInstagramData, setOpenAddInstagramData] = useState(false);

  // SNS連携確認できたかのフラグ
  const [isSnsConnected, setIsSnsConnected] = useState(false);

  // テナント名のバリデーションの状態
  const [tenantNameStatus, setTenantNameStatus] = useState("");

  // テナント名のエラーテキスト
  const [tenantNameError, setTenantNameError] = useState<string | null>(null);

  const { tenantDetail, tenantDetailError, loadingTenantDetail, fetchData } =
    addTenant();

  const showAddInstagramData = () => {
    setOpenAddInstagramData(true);
  };

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

  const handleRegister = async () => {
    try {
      const formData = await form.validateFields();

      console.log(formData);

      if (loginUserId) {
        fetchData({
          auth0_id: loginUserId,
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

  useEffect(() => {
    if (tenantDetailError) {
      notification.error({
        message: "エラー",
        description: "エラーが発生しました。",
        duration: 2
      });
    } else if (tenantDetail) {
      console.log(tenantDetail);

      notification.success({
        message: "テナント登録成功",
        description: "テナントの作成に成功しました。",
        duration: 2
      });
      init();
      updateTenant();
      closeAddTenantDrawer();
    }
  }, [tenantDetail, tenantDetailError]);

  const init = () => {
    form.resetFields();
    setInstagramData(null);
  };

  return (
    <Drawer
      title="Create a new tenant"
      size="large"
      onClose={closeAddTenantDrawer}
      open={openAddTenantDialog}
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
            <Button onClick={closeAddTenantDrawer}>キャンセル</Button>
            <Button
              disabled={isOkDisabled}
              onClick={handleRegister}
              type="primary"
            >
              登録
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
      />
    </Drawer>
  );
};
