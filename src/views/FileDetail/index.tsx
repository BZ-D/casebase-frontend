import React, { useEffect, useState } from "react";
import Paper from "../../components/FileDetail/Paper";
import Table from "../../components/FileDetail/Table";
import styles from './index.module.css';
import { useParams } from "react-router-dom";
import { getFileByIdAPI } from "../../api/file";
import { Spin } from 'antd';

const FileDetail: React.FC = () => {
  const [type, setType] = useState('');
  const [fileDetails, setFileDetails] = useState({});
  const params = useParams();
  const docId = Number(params.docId);

  useEffect(() => {
    getFileByIdAPI(docId).then((res: any) => {
      setFileDetails(res);
      setType(res.basis === null ? 'paper' : 'table');
    })
  }, []);

  return (
    <div className={styles.detailBg}>
      {
        // 加载动画
        Object.keys(fileDetails).length === 0 &&
        <Spin
          style={{position: "fixed", top: "25vh", left: "45%"}}
          tip="正在获取文件信息"
        />
      }
      <div className={styles.topBar}>
        <span className={styles.topBarTitle}>
          文件详情
        </span>
      </div>
      <div>
        {
          Object.keys(fileDetails).length !== 0 && 
          (type === 'paper' ? 
          <Paper fileDetails={fileDetails} /> :
          <Table fileDetails={fileDetails} />)
        }
      </div>
    </div>
  )
};

export default FileDetail;