import { Button, Col, Row, Typography, Select, Skeleton } from "antd";
import { AuthView } from "./AuthView";
import BaseDashboardView from "./BaseDashboardView";
import { PlusOutlined } from "@ant-design/icons";
import { TenantCard } from "../parts/TenantCard";
import { useEffect, useState } from "react";
import { loginUserIdAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { useAccessToken } from "@/hooks/api/useAccessToken";
import { useUserTenantList } from "@/hooks/api/useUserTenantList";
import { TenantDrawer } from "../templates/TenantDrawer";

const { Title, Text } = Typography;

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
                <TenantDrawer
                  openAddTenantDialog={openAddTenantDialog}
                  closeAddTenantDrawer={closeAddTenantDrawer}
                />
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
