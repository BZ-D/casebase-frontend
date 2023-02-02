import { Spin, Button } from "antd";
import React, { useEffect, useState } from "react";
import styles from './index.module.css';

interface IProp {
  selectedText: string;
}

interface IMapResult {
  similarity: number;
  rule_text: string;
  rule_fileName: string;
  relevence: number;
}

const MapArea: React.FC<IProp> = (props) => {
  const [mapResult, setMapResult] = useState<IMapResult[]>([]); // 检索结果
  const [loading, setLoading] = useState(false); // 是否加载中
  const [retrieved, setRetrieved] = useState(false); // 是否检索到
  const [mapOriginText, setMapOriginText] = useState(''); // 划定外规内容
  const [curNum, setCurNum] = useState(0); // 当前显示匹配到的第几条内规

  // 检索
  useEffect(() => {
    if (props.selectedText !== '' && props.selectedText !== mapOriginText) {
      setMapOriginText(props.selectedText);
      setLoading(true);
      setRetrieved(false);
      setCurNum(0);
      fetch('https://mock.presstime.cn/mock/62664c56f486360026a54960/static/jiansuo').then((res) => {
      res.json().then((r) => {
        setLoading(false);
        if (r.data.length > 0) {
          setRetrieved(true);
          setMapResult(r.data);
        }
      })
    })
    }
  });

  return (
    <section className={styles.mapArea}>
      <h2 className="title">
        选中内容
      </h2>
      <div className={styles.mapOrigin}>
        <span>
          {
            mapOriginText ? mapOriginText : '尚未划定要匹配的外规内容'
          }
        </span>
      </div>

      <h2 className={styles.mapResultTitle}>
        <span>对应内规</span>
        {retrieved &&
          <>
            <span className={styles.mapResultHint}>第 <span style={{color:"#0DB68A"}}>{curNum + 1}</span> 条</span>
            <span className={styles.mapResultHint}>
              已匹配 <span style={{color:"#0DB68A"}}>{mapResult.length}</span> 条结果
            </span>
          </>
        }
      </h2>
      <div className={styles.mapResult}>
        {
          loading &&
          <Spin
            style={{alignSelf:"center",marginTop:"15vh"}}
            tip="正在检索中"
          />
        }
        {
          !loading && <span>{ retrieved ? mapResult[curNum]['rule_text'] : '未检索到对应内规' }</span>
        }
        {
          retrieved &&
          (
            <div className={styles.infoArea}>
              <div className={styles.baseInfo}>
                <span>出自政策：<span style={{color:"#0DB68A"}}>{mapResult[curNum]['rule_fileName']}</span></span>
                <span>匹配相似度：<span style={{color:"#0DB68A"}}>{`${(mapResult[curNum]['similarity']*100).toFixed(2)}%`}</span></span>
              </div>
              <div className={styles.switchBtnArea}>
                <Button disabled={curNum===0} onClick={()=>{setCurNum(curNum-1)}}>上一处</Button>
                <Button disabled={curNum===mapResult.length-1} onClick={()=>{setCurNum(curNum+1)}}>下一处</Button>
              </div>
            </div>
          )
        }
      </div>
    </section>
  )
};

export default MapArea;