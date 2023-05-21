import { Button } from "antd";
import Link from "next/link";
import { Col, Row } from "antd";

import { SigninBtn } from "../elements/SigninBtn";
import { SignoutBtn } from "../elements/SignoutBtn";
import { SignoutIconBtn } from "../elements/SignoutIconBtn";
import { UserIcon } from "../elements/UserIcon";
import { SigninoutArea } from "../parts/SigninoutArea";
import { Auth } from "../templates/Auth";

import styles from "../../styles/header.module.scss";
import { CompanyLogo } from "../elements/CompanyLogo";

interface Props {
  isChecking: boolean;
  isLogin: boolean;
}

export const Header = (props: Props) => {
  return (
    <Row className={styles.header}>
      <Col span={19} className={styles.logo_wrap}>
        <CompanyLogo />
      </Col>
      <Col span={5} className={styles.navi_wrap}>
        <SigninoutArea isChecking={props.isChecking} isLogin={props.isLogin} />
      </Col>
    </Row>
  );
};
