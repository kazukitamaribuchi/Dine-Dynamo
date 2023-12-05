import {
  Button,
  Col,
  Row,
  Typography,
  Select,
  Skeleton,
  Table,
  notification
} from "antd";
import { AuthView } from "./AuthView";
import BaseDashboardView from "./BaseDashboardView";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { loginUserIdAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { useAccessToken } from "@/hooks/api/useAccessToken";
import { getUserTenantList } from "@/hooks/api/list/getUserTenantList";
import { TenantDrawer } from "../templates/TenantDrawer";
import { Instagram, Tenant } from "@/types";
import { TenantDotDropDownBtn } from "../parts/TenantDotDropDownBtn";
import { deleteTenant } from "@/hooks/api/delete/deleteTenant";

const { Title, Text } = Typography;

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
    deleteSuccess: tenantDeleteSuccess,
    setDeleteSuccess,
    tenantDeleteError,
    loadingTenantDelete,
    deleteData
  } = deleteTenant();

  const {
    userTenantList,
    userTenantListError,
    loadingUserTenantList,
    fetchData
  } = getUserTenantList();

  const [openTenantDialog, setOpenTenantDialog] = useState<boolean>(false);
  const [tenantDialogMode, setTenantDialogMode] = useState<string>("create");
  const [currentTenantData, setCurrentTenantData] = useState<Tenant | null>(
    null
  );

  const showTenantDrawer = () => {
    setOpenTenantDialog(true);
  };

  const closeTenantDrawer = () => {
    setOpenTenantDialog(false);
  };

  const showTenantDrawerUpdateMode = (tenantId: number) => {
    setTenantDialogMode("update");
    showTenantDrawer();
  };

  const displayLoading = loadingUserTenantList || loading;

  useEffect(() => {
    if (loginUserId && token) {
      fetchData({
        auth0Id: loginUserId,
        token: token
      });
    }
  }, [loginUserId, token]);

  useEffect(() => {
    if (userTenantList && !displayLoading) {
      const newUserTenantList = userTenantList.map((obj, index) => {
        return { ...obj, key: `${index}` };
      });

      setTableData(newUserTenantList);
    }
  }, [userTenantList, displayLoading]);

  const updateTenant = () => {
    // テナントがアップデートされたら、再度取得する
    // 子コンポーネントに渡すメソッド

    if (loginUserId && token) {
      fetchData({
        auth0Id: loginUserId,
        token: token
      });
    } else {
      // TODO
    }
  };

  const handleDeleteTenant = (tenantId: number) => {
    deleteData({ token: token, tenantId: tenantId });
  };

  useEffect(() => {
    if (tenantDeleteSuccess) {
      notification.success({
        message: "テナント削除",
        description: "テナントを削除しました。",
        duration: 2
      });
      fetchData({
        auth0Id: loginUserId,
        token: token
      });
      setDeleteSuccess(false);
    } else if (tenantDeleteError) {
      notification.error({
        message: "エラー",
        description: "エラーが発生しました。",
        duration: 2
      });
    }
  }, [tenantDeleteSuccess, tenantDeleteError]);

  const columns = [
    {
      title: "店舗名",
      dataIndex: "name",
      key: "0",
      ellipsis: true
    },
    {
      title: "インスタグラム",
      dataIndex: "instagram",
      key: "1",
      render: (instagram: Instagram) => {
        return instagram ? <>{instagram.username}</> : <>未連携</>;
      }
    },
    {
      title: "更新日時",
      dataIndex: "updated_at",
      key: "2"
    },
    {
      title: "作成日時",
      dataIndex: "created_at",
      key: "3"
    },
    {
      title: "備考",
      dataIndex: "remarks",
      key: "4",
      render: (remarks: string) => {
        return remarks ? <>{remarks}</> : <>無し</>;
      }
    },
    {
      title: "",
      dataIndex: "action",
      key: "5",
      render: (_, record) => (
        <TenantDotDropDownBtn
          tenantId={record.id}
          tenantName={record.name}
          handleDeleteTenant={handleDeleteTenant}
          showTenantDrawerUpdateMode={showTenantDrawerUpdateMode}
        />
      ),
      width: 60
    }
  ];

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
                  onClick={showTenantDrawer}
                  type="primary"
                  icon={<PlusOutlined />}
                  size="large"
                >
                  店舗追加
                </Button>
                <TenantDrawer
                  openTenantDialog={openTenantDialog}
                  closeTenantDrawer={closeTenantDrawer}
                  updateTenant={updateTenant}
                  mode={tenantDialogMode}
                  data={currentTenantData}
                />
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <>
              {displayLoading ? (
                <Skeleton active />
              ) : (
                <Table
                  loading={loadingTenantDelete}
                  columns={columns}
                  dataSource={tableData}
                />
              )}
            </>
          </Row>
        </div>
      </BaseDashboardView>
    </AuthView>
  );
}
