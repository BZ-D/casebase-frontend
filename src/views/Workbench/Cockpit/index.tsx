import React from "react";
import styles from './index.module.css';
import { Row, Col } from 'antd';
import ProvinceMap from "../../../components/Cockpit/ProvinceMap";

const Cockpit: React.FC = () => {
  return (
    <>
      <Row>
        <Col span={24}>
          <ProvinceMap></ProvinceMap>
        </Col>
      </Row>
    </>
  )
};

export default Cockpit;