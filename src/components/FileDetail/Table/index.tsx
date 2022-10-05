import React from 'react';
import styles from './index.module.css';
import { Divider } from 'antd';
import Table0 from './Table0';
import Table1 from './Table1';
import Table2 from './Table2';

interface IProp {
  fileDetails: any;
}

const Table: React.FC<IProp> = (props) => {
  const fileDetails = props.fileDetails;

  const chooseTable = () => {
    switch (fileDetails.type) {
      case 0:
        return <Table0 fileDetails={fileDetails}  />;
      case 1:
        return <Table1 fileDetails={fileDetails}  />;
      case 2:
        return <Table2 fileDetails={fileDetails}  />;
    }
  }

  return (
    <div className={styles.Table}>
      <div className={styles.paperTitle}>
        {fileDetails.name}
      </div>
      <Divider />
      { chooseTable() }
    </div>
  )
};

export default Table;