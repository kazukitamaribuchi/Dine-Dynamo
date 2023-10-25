import { Card, Row, Col, Avatar } from "antd";
import { url } from "inspector";
import { TitleTopDescription } from "../elements/TitleTopDescription";
import { TopDescription } from "../elements/TopDescription";
import { Tenant } from "@/types";

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from "@ant-design/icons";

interface Props {
  tenant: Tenant;
}

export const TenantCard = ({ tenant }: Props) => {
  const url =
    "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";

  return (
    <Card
      hoverable={true}
      bordered={false}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />
      ]}
    >
      <Row>
        <Col span={3}>
          <Avatar src={url} />
        </Col>
        <Col span={19}>
          <div style={{ minHeight: "60px" }}>
            <TitleTopDescription
              title={tenant.name}
              description={"店舗名"}
              bold={true}
            />
          </div>
          <Row>
            <Col span={14}>
              <TopDescription description="連携SNS" />
              <div>無し</div>
            </Col>
            <Col span={10}>
              <TitleTopDescription
                title={tenant.last_updated_at}
                description="最終更新日"
                titleSize="12px"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};
