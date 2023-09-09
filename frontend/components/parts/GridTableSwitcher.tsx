import { Button, Col, Row, Tooltip, Typography } from "antd";
import { TableOutlined, AppstoreOutlined } from "@ant-design/icons";

interface Props {
  onButtonClick: (value: number) => void;
}

const { Text } = Typography;

export const GridTableSwitcher = ({ onButtonClick }: Props) => {
  return (
    <div>
      <div>
        <Text type="secondary" style={{ fontSize: "10px" }}>
          表示方法
        </Text>
        <Row align={"middle"}>
          <Col>
            <Tooltip title="グリッド">
              <Button
                onClick={() => onButtonClick(0)}
                type="text"
                icon={<AppstoreOutlined />}
              />
            </Tooltip>
          </Col>
          <Col>
            <Tooltip title="テーブル">
              <Button
                onClick={() => onButtonClick(1)}
                type="text"
                icon={<TableOutlined />}
              />
            </Tooltip>
          </Col>
        </Row>
      </div>
    </div>
  );
};
