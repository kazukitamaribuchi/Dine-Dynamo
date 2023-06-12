import { Button } from "antd";
import Link from "next/link";
import { Col, Row } from "antd";

import { SignInBtn } from "../elements/SignInBtn";
import { SignOutBtn } from "../elements/SignOutBtn";
import { SignOutIconBtn } from "../elements/SignOutIconBtn";
import { UserIcon } from "../elements/UserIcon";
import { SigninoutArea } from "../parts/SigninoutArea";

import styles from "../../styles/header.module.scss";
import { CompanyLogo } from "../elements/CompanyLogo";
import { CompanyLogoArea } from "../parts/CompanyLogoArea";

interface Props {
  isLogin?: boolean;
}

export const CommonHeader = ({ isLogin = true }: Props) => {
  return (
    <Row className={styles.header}>
      <Col span={19} className={styles.logo_wrap}>
        <CompanyLogoArea />
      </Col>
      <Col span={5} className={styles.navi_wrap}>
        <SigninoutArea isLogin={isLogin} />
      </Col>
    </Row>
  );
};
