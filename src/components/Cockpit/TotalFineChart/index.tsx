import React, {useEffect, useState} from "react";
import { getTotalFineAPI } from "../../../api/cockpit";
import { Select, Button, Spin, Row, Col } from "antd";
import { YEARS } from "../../../common/constants";
import * as echarts from 'echarts';
import './index.css';

const { Option } = Select;

const TotalFineChart: React.FC = () => {
  const [loaded, setLoaded] = useState(false); // 数据是否加载完成，用于图表展示
  const [data, setData] = useState({} as any); // 各个省的数据

  const [year, setYear] = useState(2021); // 默认2021年

  const [finishedPie, setFinishedPie] = useState({} as echarts.EChartsType); // 用于重绘时销毁原图表
  const [finishedBar, setFinishedBar] = useState({} as echarts.EChartsType); // 用于重绘时销毁原图表

  // 初始化数据
  useEffect(() => {
    getTotalFineAPI({ year, month: 0 }).then(res => {
      setData(res);
      setLoaded(true);
    });
  }, []);

  // data 变化时调用，初始时 data 无数据则直接返回，防止绘图失败
  useEffect(() => {
    if (!loaded) return;
    
    if (Object.keys(finishedPie).length !== 0) finishedPie.dispose();  // 重绘时需销毁原图
    if (Object.keys(finishedBar).length !== 0) finishedBar.dispose();  // 重绘时需销毁原图
    const pie = document.getElementById('total-fine-pie') as HTMLElement;
    const bar = document.getElementById('total-fine-bar') as HTMLElement;
    const pieChart = echarts.init(pie);
    const barChart = echarts.init(bar);
    const pieOptions = {
      tooltip: {
        show: true,
        formatter: '{c}%'
      },
      series: [
        {
          type: 'pie',
          data: Object.keys(data.content).map((key) => {
            const total = Math.abs(data.num);
            const percent = Math.round(Number((Math.abs(data.content[key]) / total).toFixed(2)) * 100);
            return { name: `${key}(${percent}%)`, value: percent };
          })
        }
      ]
    };
    const barOptions = {
      tooltip: {},
      xAxis: {
        data: Object.keys(data.content),
        axisLabel: {
          interval: 0,
          rotate: 45
        }
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: Object.keys(data.content).map((key) => Math.abs(data.content[key])),
          label: {
            show: true, //开启显示
            position: 'top', //在上方显示
            textStyle: { //数值样式
              fontSize: 12
            }
          }
        }
      ],
    };
    pieChart.setOption(pieOptions);
    barChart.setOption(barOptions);
    setFinishedPie(pieChart);
    setFinishedBar(barChart);
  }, [data]);

  const handleSearch = () => {
    setLoaded(false);
    getTotalFineAPI({ year, month: 0 }).then(res => {
      setData(res);
      setLoaded(true);
    });
  }

  return (
    <>
      <div className="total-fine-chart-area">
        <div className="total-fine-chart-title">
          {
            `${year}年全年银保监会罚金数额各月分布`
          }
        </div>
        { loaded &&
          <div className="range-picker">
            <div>年份:</div>
            <Select defaultValue={year} onChange={(v) => { setYear(v) }}>
              {
                YEARS.map(((year) => <Option value={year} key={year}>{year}年</Option>))
              }
            </Select>
            <Button
              type="primary"
              size="middle"
              onClick={handleSearch}
            >
              查询
            </Button>
          </div>
        }
        <Spin spinning={!loaded} tip="绘制图表中，请稍等……" style={{marginBottom: "30px", marginTop: "10px"}} />
        { loaded && 
          <Row className="total-fine-chart">
            <Col span={12}>
              <div id="total-fine-pie" />
            </Col>
            <Col span={12}>
              <div id="total-fine-bar" />
            </Col>
          </Row>
        }
      </div>
    </>
  )
};

export default TotalFineChart;