import React, {useEffect, useState} from "react";
import { getDetailOrganNumAPI } from "../../../api/cockpit";
import { Select, Button, Spin, Row, Col } from "antd";
import { YEARS, MONTHS } from "../../../common/constants";
import * as echarts from 'echarts';
import './index.css';

const { Option } = Select;

const OrgDetailNumChart: React.FC = () => {
  const [loaded, setLoaded] = useState(false); // 数据是否加载完成，用于图表展示
  const [data, setData] = useState({} as any); // 各个省的数据

  const [year, setYear] = useState(2021); // 默认2021年
  const [month, setMonth] = useState(0); // 默认全年

  const [finishedPie, setFinishedPie] = useState({} as echarts.EChartsType); // 用于重绘时销毁原图表
  const [finishedBar, setFinishedBar] = useState({} as echarts.EChartsType); // 用于重绘时销毁原图表

  // 初始化数据
  useEffect(() => {
    getDetailOrganNumAPI({ year, month }).then(res => {
      setData(res);
      setLoaded(true);
    });
  }, []);

  // data 变化时调用，初始时 data 无数据则直接返回，防止绘图失败
  useEffect(() => {
    if (!loaded) return;
    
    if (Object.keys(finishedPie).length !== 0) finishedPie.dispose();  // 重绘时需销毁原图
    if (Object.keys(finishedBar).length !== 0) finishedBar.dispose();  // 重绘时需销毁原图
    const pie = document.getElementById('organ-detail-num-pie') as HTMLElement;
    const bar = document.getElementById('organ-detail-num-bar') as HTMLElement;
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
      yAxis: {
        data: Object.keys(data.content),
        axisLabel: {
          interval: 0,
          rotate: 45
        }
      },
      xAxis: {},
      series: [
        {
          type: 'bar',
          data: Object.keys(data.content).map((key) => Math.abs(data.content[key])),
          label: {
            show: true, //开启显示
            position: 'right', //在上方显示
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
    getDetailOrganNumAPI({ year, month }).then(res => {
      setData(res);
      setLoaded(true);
    });
  }

  return (
    <>
      <div className="organ-detail-num-chart-area">
        <div className="organ-detail-num-chart-title">
          {
            `${year}年${month === 0 ? '全年' : month + '月'}各类型机构受处罚数各月分布`
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
            <div>月份:</div>
            <Select defaultValue={month} onChange={(v) => { setMonth(v) }}>
              {
                MONTHS.map(((month) =>
                <Option value={month} key={month}>
                  {month === 0 ? '全年' : `${month}月`}
                </Option>))
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
          <Row className="orga-detail-num-chart">
            <Col span={10}>
              <div id="organ-detail-num-pie" />
            </Col>
            <Col span={14}>
              <div id="organ-detail-num-bar" />
            </Col>
          </Row>
        }
      </div>
    </>
  )
};

export default OrgDetailNumChart;