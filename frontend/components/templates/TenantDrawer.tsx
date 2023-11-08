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
  Typography
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

const { Option } = Select;

const { Title, Text } = Typography;

interface Props {
  openAddTenantDialog: boolean;
  closeAddTenantDrawer: () => void;
}

import { FaSquareInstagram } from "react-icons/fa6";

export const TenantDrawer = ({
  openAddTenantDialog,
  closeAddTenantDrawer
}: Props) => {
  const [instagramData, setInstagramData] =
    useState<InstagramUserBasicInfoForCheckData | null>(null);
  const [openAddInstagramData, setOpenAddInstagramData] = useState(false);

  // SNS連携確認できたかのフラグ
  const [isSnsConnected, setIsSnsConnected] = useState(false);

  console.log("isSnsConnected", isSnsConnected);

  const showAddInstagramData = () => {
    setOpenAddInstagramData(true);
  };

  const closeAddInstagramData = () => {
    setOpenAddInstagramData(false);
  };

  useEffect(() => {
    if (instagramData) {
      console.log("instagramData: ", instagramData);
    } else {
      console.log("instagramData: ", instagramData);
    }
  }, [instagramData]);

  const colStyle = {
    height: "120px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center", // これによりテキストが垂直に中央揃えになる
    border: "1px solid #d9d9d9", // 境界線は例示のため
    borderRadius: "6px",

    flexDirection: "column" // 子要素を縦方向に並べる
  };

  const gridStyle: React.CSSProperties = {
    width: "33%",
    textAlign: "center",
    padding: "45px 0",
    cursor: "pointer"
  };

  const handleInstagramClick = () => {
    if (instagramData) {
      console.log("連携済");

      // TODO コンポーネント拡張して確認（username, nameも）
      // formはdisabledにして連携済フラグを親で管理
      // 初期化ボタン配置してクリア可能にする（確認モーダルも

      showAddInstagramData();
    } else {
      showAddInstagramData();
    }
  };

  return (
    <Drawer
      title="Create a new tenant"
      size="large"
      onClose={closeAddTenantDrawer}
      open={openAddTenantDialog}
    >
      <Form layout="vertical">
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
            >
              <Input placeholder="店舗名を入力してください。" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="SNS連携">
              <Card style={{ border: "none", boxShadow: "none" }}>
                <Card.Grid onClick={handleInstagramClick} style={gridStyle}>
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
              name="description"
              label="備考"
              rules={[
                {
                  required: false
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
        <Row>
          <Space>
            <Button onClick={closeAddTenantDrawer}>Cancel</Button>
            <Button onClick={closeAddTenantDrawer} type="primary">
              Submit
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
