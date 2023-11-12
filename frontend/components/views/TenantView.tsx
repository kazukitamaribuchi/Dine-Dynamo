import { Button, Col, Row, Typography, Select, Skeleton, Table } from "antd";
import { AuthView } from "./AuthView";
import BaseDashboardView from "./BaseDashboardView";
import {
  PlusOutlined,
  SmallDashOutlined,
  MoreOutlined
} from "@ant-design/icons";
import { TenantCard } from "../parts/TenantCard";
import { useEffect, useState } from "react";
import { loginUserIdAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { useAccessToken } from "@/hooks/api/useAccessToken";
import { useUserTenantList } from "@/hooks/api/useUserTenantList";
import { TenantDrawer } from "../templates/TenantDrawer";
import { ColumnsType } from "antd/es/table";
import { Instagram, Tenant } from "@/types";
import { data } from "autoprefixer";
import { TenantDotDropDownBtn } from "../parts/TenantDotDropDownBtn";
import { FaRecordVinyl } from "react-icons/fa";

const { Title, Text } = Typography;

const columns = [
  {
    title: "店舗名",
    dataIndex: "name",
    key: "name",
    ellipsis: true
  },
  {
    title: "インスタグラム",
    dataIndex: "instagram",
    key: "instagram",
    render: (instagram: Instagram) => {
      {
        instagram != null && instagram.username;
      }
    }
  },
  {
    title: "更新日時",
    dataIndex: "updated_at",
    key: "updated_at"
  },
  {
    title: "作成日時",
    dataIndex: "created_at",
    key: "created_at"
  },
  {
    title: "備考",
    dataIndex: "remarks",
    key: "備考"
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    render: (text, record) => <TenantDotDropDownBtn tenantId={record.id} />,
    width: 60
  }
];

export default function TenantView(props: any) {
  const [tableData, setTableData] = useState<Tenant[]>([]);

  const [loading, setLoading] = useState(true);

  // 最低ローディング秒数を800msと設定
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer); // クリーンアップ関数
  }, []);

  const [loginUserId] = useAtom(loginUserIdAtom);
  const { finalToken: token, error: accessTokenError } = useAccessToken();

  const {
    userTenantList,
    userTenantListError,
    loadingUserTenantList,
    fetchData
  } = useUserTenantList();

  const [openAddTenantDialog, setOpenAddTenantDialog] = useState(false);

  const showAddTenantDrawer = () => {
    setOpenAddTenantDialog(true);
  };

  const closeAddTenantDrawer = () => {
    setOpenAddTenantDialog(false);
  };

  const displayLoading = loadingUserTenantList || loading;

  useEffect(() => {
    if (loginUserId && token) {
      fetchData({
        auth0_id: loginUserId,
        token: token
      });
    }
  }, [loginUserId, token]);

  useEffect(() => {
    if (userTenantList && !displayLoading) {
      setTableData(userTenantList);
      console.log("userTenantList", userTenantList);
    }
  }, [userTenantList, displayLoading]);

  const updateTenant = () => {
    // テナントがアップデートされたら、再度取得する
    // 子コンポーネントに渡すメソッド

    if (loginUserId && token) {
      fetchData({
        auth0_id: loginUserId,
        token: token
      });
    } else {
      // TODO
    }
  };

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
                  updateTenant={updateTenant}
                />
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <>
              {displayLoading ? (
                <Skeleton active />
              ) : (
                // userTenantList.map((tenant, index) => (
                //   <Col key={index} span={8} style={{ marginBottom: "10px" }}>
                //     <TenantCard tenant={tenant} />
                //   </Col>
                // ))

                <Table columns={columns} dataSource={userTenantList} />
              )}
            </>
          </Row>
        </div>
      </BaseDashboardView>
    </AuthView>
  );
}
