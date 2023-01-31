import React, { useEffect, useState } from "react";
import Paper from "../../components/FileDetail/Paper";
import Table from "../../components/FileDetail/Table";
import MapArea from "../../components/FileDetail/MapArea";
import styles from './index.module.css';
import { useParams } from "react-router-dom";
import { getFileByIdAPI } from "../../api/file";
import { Spin } from 'antd';

const FileDetail: React.FC = () => {
  const [type, setType] = useState('');
  const [fileDetails, setFileDetails] = useState({});
  const [selectedText, setSelectedText] = useState('');
  const params = useParams();
  const docId = Number(params.docId);

  const retrieve = () => {
    const newText = window?.getSelection()?.toString();
    if (!newText || newText === selectedText) return;
    setSelectedText(newText);
  };

  useEffect(() => {
    getFileByIdAPI(docId).then((res: any) => {
      setFileDetails(res);
      setType(res.basis === null ? 'paper' : 'table');
    })
  }, []);

  // 注册监听器，监听mouseup事件，获取选中的文本
  useEffect(() => {
    const contentElement = document.querySelector(`.${styles.contentArea}`);
    contentElement?.addEventListener('mouseup', retrieve, true);

    return contentElement?.removeEventListener('mouseup', retrieve);
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
          案例解读
        </span>
      </div>
      <div className={styles.contentArea}>
        {
          Object.keys(fileDetails).length !== 0 && 
          (type === 'paper' ? 
          <Paper fileDetails={fileDetails} /> :
          <Table fileDetails={fileDetails} />)
        }
      </div>
      {
        Object.keys(fileDetails).length !== 0 && <MapArea selectedText={selectedText} />
      }
    </div>
  )
};

export default FileDetail;