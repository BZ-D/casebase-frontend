import { spawn } from "child_process";
import React, { useEffect, useState } from "react";
import styles from './index.module.css';

interface IProp {
  selectedText: string;
}

const MapArea: React.FC<IProp> = (props) => {
  // ruleFileName: string;
  // ruleText: string;
  // similarity: number;
  // relevence?: number;

  return (
    <section className={styles.mapArea}>
      <h2 className="title">
        选中内容
      </h2>
      <div className={styles.mapOrigin}>
        <span>
          {
            props.selectedText ? props.selectedText :
            (<span style={{backgroundColor:"#ffffff",color:"#7b7b7b"}}>尚未划定要匹配的外规内容</span>)
          }
        </span>
      </div>

      <h2>
        对应内规
      </h2>
      <div className={styles.mapResult}>
      </div>
    </section>
  )
};

export default MapArea;