import React, { useState } from "react";
import styles from './index.module.css';
import { Row, Col, Button } from 'antd';
import { VerticalAlignBottomOutlined, LoadingOutlined } from '@ant-design/icons';
import ProvinceMap from "../../../components/Cockpit/ProvinceMap";
import TotalNumChart from "../../../components/Cockpit/TotalNumChart";
import TotalFineChart from "../../../components/Cockpit/TotalFineChart";
import OrgNumChart from "../../../components/Cockpit/OrgNumChart";
import OrgDetailNumChart from "../../../components/Cockpit/OrgDetailNumChart";
import OrgDetailFineChart from "../../../components/Cockpit/OrgDetailFineChart";
import { downloadReport } from "../../../utils/report";

const Cockpit: React.FC = () => {
  const [exportBtnDisabled, setExportBtnDisabled] = useState(false); // 导出按钮是否禁用

  return (
    <>
      <Row>
        <Col className={styles.chartArea} span={24}>
          <Button
            type="primary"
            className={styles.reportBtn}
            icon={exportBtnDisabled ? <LoadingOutlined /> : <VerticalAlignBottomOutlined />}
            size="large"
            shape="round"
            disabled={exportBtnDisabled}
            onClick={() => {
              setExportBtnDisabled(true);
              downloadReport().then(() => {
                setExportBtnDisabled(false);
              })
            }}
          >
            导出报告
          </Button>
          <div className={styles.reportHint}>
            请等待所有图表加载完毕后再导出报告，否则会导致报告缺失。
          </div>

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