import { Spin, Button, Modal, Switch, Slider, Select } from "antd";
import React, { useEffect, useState } from "react";
import styles from './index.module.css';
import { getSimilarityListAPI } from "../../../api/policy";

interface IProp {
  selectedText: string;
  inputFileName: string;
}

interface IMapResult {
  similarity: number;
  ruleText: string;
  ruleFileName: string;
  relevence: number;
}

const MapArea: React.FC<IProp> = (props) => {
  const [mapResult, setMapResult] = useState<IMapResult[]>([]); // 检索结果
  const [loading, setLoading] = useState(false); // 是否加载中
  const [retrieved, setRetrieved] = useState(false); // 是否检索到
  const [mapOriginText, setMapOriginText] = useState(''); // 划定外规内容
  const [curNum, setCurNum] = useState(0); // 当前显示匹配到的第几条内规
  const [showConfModal, setShowConfModal] = useState(false);

  // 配置项
  const [isDifferent, setIsdifferent] = useState(false);
  const [similarityLimit, setSimilarityLimit] = useState(0.1);
  const [matchNum, setMatchNum] = useState(15);

  // 检索
  useEffect(() => {
    if (props.selectedText !== '' && props.selectedText !== mapOriginText) {
      setMapOriginText(props.selectedText);
      setLoading(true);
      setRetrieved(false);
      setCurNum(0);

      try {
        getSimilarityListAPI({
          inputFileName: props.inputFileName,
          inputText: props.selectedText,
          isDifferent: isDifferent.toString(),
          similarityLimit,
          matchNum
        }).then((res) => {
          setLoading(false);
          if (res.length > 0) {
            setRetrieved(true);
            setMapResult(res);
          }
        })
      } catch {
        setLoading(false);
      }
    }
  });

  const closeConfMoal = () => {
    setShowConfModal(false);
  };

  return (
    <section className={styles.mapArea}>
      <Modal
        open={showConfModal}
        onCancel={closeConfMoal}
        footer={[
          <Button type="primary" onClick={closeConfMoal}>
            确认
          </Button>
        ]}
        title={
          <span style={{color:"#616161"}}>
            规则映射配置项
          </span>
        }
      >
        <div className={styles.mapConfArea}>
          <div className={styles.mapConfItem}>
            <span>　　广度模式：</span>
            <Switch
              defaultChecked={isDifferent}
              checkedChildren="开启"
              unCheckedChildren="关闭"
              onChange={(e) => {
                setIsdifferent(e);
              }}
            />
          </div>
          <div className={styles.mapConfItem}>
            <span>　相似度阈值：</span>
            <Slider
              defaultValue={similarityLimit}
              onAfterChange={(v) => {setSimilarityLimit(v)}}
              style={{width:"65%"}}
              step={0.05}
              min={0.05}
              max={0.95}
              marks={
                {
                  0.1: '0.1',
                  0.3: '0.3',
                  0.5: '0.5',
                  0.7: '0.7',
                  0.9: '0.9'
                }
              }
            />
          </div>
          <div className={styles.mapConfItem}>
            <span>最大匹配条目：</span>
            <Select
              defaultValue={matchNum}
              style={{ width: 80 }}
              onChange={(v) => {
                setMatchNum(v);
              }}
              options={[
                { value: 5, label: '5', key: 0 },
                { value: 10, label: '10', key: 1 },
                { value: 15, label: '15', key: 2 },
                { value: 20, label: '20', key: 3 },
                { value: 25, label: '25', key: 4 },
                { value: 30, label: '30', key: 5 }
              ]}
            />
          </div>
        </div>
      </Modal>
      <h2 className={styles.mapOriginTitle}>
        <span>选中内容</span>
        <span onClick={() => {setShowConfModal(true)}}>规则配置</span>
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
          !loading && <span>{ retrieved ? mapResult[curNum]['ruleText'] : '未检索到对应内规' }</span>
        }
        {
          retrieved &&
          (
            <div className={styles.infoArea}>
              <div className={styles.baseInfo}>
                <span>出自政策：<span style={{color:"#0DB68A"}}>{mapResult[curNum]['ruleFileName']}</span></span>
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