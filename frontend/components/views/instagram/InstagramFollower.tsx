import { InstagramFollowerCityArea } from "@/components/templates/instagram/InstagramFollowerCityArea";
import { InstagramFollowerGenderDetailGraphArea } from "@/components/templates/instagram/InstagramFollowerGenderDetailGraphArea";
import { InstagramFollowerGenderGraphArea } from "@/components/templates/instagram/InstagramFollowerGenderGraphArea";
import { InstagramFollowerGraphArea } from "@/components/templates/instagram/InstagramFollowerGraphArea";
import { Col, Row } from "antd";
import styles from "../../../styles/instagram.module.scss";

export const InstagramFollower = () => {
  return (
    <Row gutter={8}>
      <Col className={styles.col_padding} span={15}>
        <InstagramFollowerGraphArea />
      </Col>
      <Col className={styles.col_padding} span={9}>
        <InstagramFollowerGenderGraphArea />
      </Col>
      <Col className={styles.col_padding} span={12}>
        <InstagramFollowerCityArea />
      </Col>
      <Col className={styles.col_padding} span={12}>
        <InstagramFollowerGenderDetailGraphArea />
      </Col>
    </Row>
  );
};
