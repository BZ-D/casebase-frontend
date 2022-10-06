import React from "react";
import styles from './index.module.css';
import { Row, Col } from 'antd';
import ProvinceMap from "../../../components/Cockpit/ProvinceMap";
import TotalNumChart from "../../../components/Cockpit/TotalNumChart";

const Cockpit: React.FC = () => {
  return (
    <>
      <Row>
        <Col className={styles.chartArea} span={24}>
          <ProvinceMap />
          <TotalNumChart />
        </Col>
      </Row>
    </>
  )
};

export default Cockpit;