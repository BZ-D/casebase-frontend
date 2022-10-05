import React from "react";
import styles from "./index.module.css";
import { Card } from 'antd';

interface IProp {
  className?: string | undefined;
  title: string;
  intro: string;
  key: number;
  docId: number;
}

const CaseCard: React.FC<IProp> = (props) => {
  const handleClick = () => {
    window.open(`${window.location.protocol}//${window.location.host}/fileDetail/${props.docId}`, '_blank');
  };

  return (
    <div className={styles.CaseCard} onClick={handleClick}>
      <Card
        className={styles.cardItem}
        title={props.title}
        extra={<a>查看详情</a>}
        headStyle={{fontSize:"20px", fontWeight:"bold", color:"rgb(84, 84, 84)"}}
      >
        <div dangerouslySetInnerHTML={{__html:props.intro}}></div>
      </Card>
    </div>
  )
};

export default CaseCard;