import { InstagramFollowerGraph } from "@/components/parts/instagram/InstagramFollowerGraph";
import { Statistic, Row, Col, Typography, Card } from "antd";

import {
  TeamOutlined,
  PlusOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined
} from "@ant-design/icons";
import { InstagramGraphTitle } from "@/components/elements/InstagramGraphTitle";

const { Text, Title } = Typography;

export const InstagramFollowerGraphArea = () => {
  return (
    <Card style={{}}>
      <InstagramGraphTitle title={"フォロワー数遷移"} />

      <div
        style={{
          height: "80px",
          marginTop: "25px",
          paddingLeft: "20px"
        }}
      >
        <Row align="middle">
          <Col span={12}>
            <Statistic
              title="Total Follower"
              value={20400}
              valueStyle={{ color: "#0097db" }}
              prefix={<TeamOutlined />}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="The day before"
              value={102}
              // valueStyle={{ color: "#cf1322" }}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
            />
          </Col>
        </Row>
      </div>

      <div style={{ height: "210px", position: "relative", left: "-13px" }}>
        <InstagramFollowerGraph />
      </div>
    </Card>
  );
};
