import React from 'react';
import styles from './index.module.css';
import { Divider } from 'antd';

interface IProp {
  fileDetails: any;
}

const Paper: React.FC<IProp> = (props) => {
  const fileContent: string[] = props.fileDetails.content.split('\n');

  return (
    <div className={styles.Paper}>
      <div className={styles.paperTitle}>
        { props.fileDetails.name }
      </div>
      <Divider />
      <div className={styles.paperContent}>
        { fileContent.map((line, index) => <p key={index}>{line}</p>) }
      </div>
    </div>
  )
};

export default Paper;