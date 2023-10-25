import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Row,
  Typography,
  DatePicker,
  Drawer,
  Form,
  Input,
  Select,
  Space,
  Skeleton
} from "antd";
import { AuthView } from "./AuthView";
import BaseDashboardView from "./BaseDashboardView";
import type { DescriptionsProps } from "antd";
import { TitleTopDescription } from "../elements/TitleTopDescription";
import { url } from "inspector";
import { TopDescription } from "../elements/TopDescription";
import { PlusOutlined } from "@ant-design/icons";
import { TenantCard } from "../parts/TenantCard";
import { useEffect, useState } from "react";
import { loginUserIdAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { useAccessToken } from "@/hooks/api/useAccessToken";
import { useUserTenantList } from "@/hooks/api/useUserTenantList";

const { Title, Paragraph, Text, Link } = Typography;
const { Option } = Select;

const items = [
  {
    key: "1",
    label: "UserName",
    children: "Zhou Maomao"
  },
  {
    key: "2",
    label: "Telephone",
    children: "1810000000"
  },
  {
    key: "3",
    label: "Live",
    children: "Hangzhou, Zhejiang"
  },
  {
    key: "4",
    label: "Address",
    span: 2,
    children: "No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China"
  },
  {
    key: "5",
    label: "Remark",
    children: "empty"
  }
];

export default function TenantView(props: any) {
  // 新しい状態変数
  const [loading, setLoading] = useState(true);

  // 最低ローディング秒数を2秒と設定
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer); // クリーンアップ関数
  }, []);

  const [loginUserId] = useAtom(loginUserIdAtom);
  const { finalToken: token, error: accessTokenError } = useAccessToken();

  const { userTenantList, userTenantListError, loadingUserTenantList } =
    useUserTenantList({ auth0_id: loginUserId, token: token });

  const [openAddTenantDialog, setOpenAddTenantDialog] = useState(false);

  const showAddTenantDrawer = () => {
    setOpenAddTenantDialog(true);
  };

  const closeAddTenantDrawer = () => {
    setOpenAddTenantDialog(false);
  };

  console.log("userTenantList", userTenantList);

  const url =
    "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";

  const displayLoading = loadingUserTenantList || loading;

  return (
    <AuthView>
      <BaseDashboardView>
        <div style={{ margin: "0 50px" }}>
          <Row justify="space-between">
            <Col span={8}>
              <div style={{ marginBottom: "40px" }}>
                <Title level={1} style={{ marginBottom: "16px" }}>
                  tenant
                </Title>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  各店舗情報の管理や設定を行えます。
                </Text>
              </div>
            </Col>
            <Col span={4}>
              <div style={{ marginTop: "60px" }}>
                <Button
                  onClick={showAddTenantDrawer}
                  type="primary"
                  icon={<PlusOutlined />}
                  size="large"
                >
                  店舗追加
                </Button>
                <Drawer
                  title="Create a new account"
                  width={720}
                  onClose={closeAddTenantDrawer}
                  open={openAddTenantDialog}
                  extra={
                    <Space>
                      <Button onClick={closeAddTenantDrawer}>Cancel</Button>
                      <Button onClick={closeAddTenantDrawer} type="primary">
                        Submit
                      </Button>
                    </Space>
                  }
                >
                  <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          name="name"
                          label="Name"
                          rules={[
                            {
                              required: true,
                              message: "Please enter user name"
                            }
                          ]}
                        >
                          <Input placeholder="Please enter user name" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="url"
                          label="Url"
                          rules={[
                            { required: true, message: "Please enter url" }
                          ]}
                        >
                          <Input
                            style={{ width: "100%" }}
                            addonBefore="http://"
                            addonAfter=".com"
                            placeholder="Please enter url"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          name="owner"
                          label="Owner"
                          rules={[
                            {
                              required: true,
                              message: "Please select an owner"
                            }
                          ]}
                        >
                          <Select placeholder="Please select an owner">
                            <Option value="xiao">Xiaoxiao Fu</Option>
                            <Option value="mao">Maomao Zhou</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="type"
                          label="Type"
                          rules={[
                            {
                              required: true,
                              message: "Please choose the type"
                            }
                          ]}
                        >
                          <Select placeholder="Please choose the type">
                            <Option value="private">Private</Option>
                            <Option value="public">Public</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          name="approver"
                          label="Approver"
                          rules={[
                            {
                              required: true,
                              message: "Please choose the approver"
                            }
                          ]}
                        >
                          <Select placeholder="Please choose the approver">
                            <Option value="jack">Jack Ma</Option>
                            <Option value="tom">Tom Liu</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="dateTime"
                          label="DateTime"
                          rules={[
                            {
                              required: true,
                              message: "Please choose the dateTime"
                            }
                          ]}
                        >
                          <DatePicker.RangePicker
                            style={{ width: "100%" }}
                            getPopupContainer={(trigger) =>
                              trigger.parentElement!
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          name="description"
                          label="Description"
                          rules={[
                            {
                              required: true,
                              message: "please enter url description"
                            }
                          ]}
                        >
                          <Input.TextArea
                            rows={4}
                            placeholder="please enter url description"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Drawer>
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <>
              {displayLoading ? (
                <Skeleton active />
              ) : (
                userTenantList.map((tenant, index) => (
                  <Col key={index} span={8}>
                    <TenantCard tenant={tenant} />
                  </Col>
                ))
              )}
            </>
          </Row>
        </div>
      </BaseDashboardView>
    </AuthView>
  );
}
