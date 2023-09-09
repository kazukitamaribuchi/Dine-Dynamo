import { Button, Col, Row, Switch, Tooltip, Typography } from "antd";
import { TableOutlined, AppstoreOutlined } from "@ant-design/icons";
import { useState } from "react";

interface Props {
  onButtonClick: (value: boolean) => void;
}

const { Text } = Typography;

export const IncludeInsightSwitcher = ({ onButtonClick }: Props) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleClick = () => {
    const newState = !isToggled;
    setIsToggled(newState);
    onButtonClick(newState); // ここで親のコールバックを呼び出す
  };

  return (
    <div>
      <div>
        <div>
          <Text type="secondary" style={{ fontSize: "10px" }}>
            インサイト
          </Text>
        </div>
        <Switch
          checkedChildren="含める"
          unCheckedChildren="含めない"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};
