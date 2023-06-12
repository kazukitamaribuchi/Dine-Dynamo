import { CompanyLogo } from "../elements/CompanyLogo";

import { Typography } from "antd";
const { Title } = Typography;

export const CompanyLogoArea = () => {
  // TODO 会社名共通化 or 画像

  return (
    <div
      style={{
        display: "flex",
        height: "45px",
        alignItems: "center",
      }}
    >
      <CompanyLogo />
      <Title level={4} style={{ margin: "0 0 0 5px" }}>
        Dine Dynamo
      </Title>
    </div>
  );
};
