import { Card, Row, Col, Avatar } from "antd";
import { url } from "inspector";
import { TitleTopDescription } from "../elements/TitleTopDescription";
import { TopDescription } from "../elements/TopDescription";

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from "@ant-design/icons";

export const TenantCard = () => {
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
              title={"焼肉トラジ 横浜モアーズ店"}
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
                title="24日前"
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
