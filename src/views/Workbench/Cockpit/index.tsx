import React from "react";
import styles from './index.module.css';
import { Row, Col } from 'antd';
import ProvinceMap from "../../../components/Cockpit/ProvinceMap";
import TotalNumChart from "../../../components/Cockpit/TotalNumChart";
import TotalFineChart from "../../../components/Cockpit/TotalFineChart";
import OrgNumChart from "../../../components/Cockpit/OrgNumChart";
import OrgDetailNumChart from "../../../components/Cockpit/OrgDetailNumChart";
import OrgDetailFineChart from "../../../components/Cockpit/OrgDetailFineChart";

const Cockpit: React.FC = () => {
  return (
    <>
      <Row>
        <Col className={styles.chartArea} span={24}>
          <ProvinceMap />
          <TotalNumChart />
          <TotalFineChart />
          <OrgNumChart />
          <OrgDetailNumChart />
          <OrgDetailFineChart />
        </Col>
      </Row>
    </>
  )
};

export default Cockpit;