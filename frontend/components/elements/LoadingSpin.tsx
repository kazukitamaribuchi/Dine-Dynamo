import { Spin } from "antd";
import styles from "../../styles/common.module.scss";

export const LoadingSpin = () => {
  return (
    <div className={styles.loading_spin}>
      <Spin />
    </div>
  );
};
