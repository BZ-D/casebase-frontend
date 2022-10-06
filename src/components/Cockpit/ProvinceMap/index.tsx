import React, {useEffect, useState} from "react";
import { getProvinceMapAPI } from "../../../api/cockpit";
import { Select, Button, Spin } from "antd";
import { YEARS, MONTHS } from "../../../common/constants";
import * as echarts from 'echarts';
import '../../../utils/china.js';
import './index.css';

const { Option } = Select;

const ProvinceMap: React.FC = () => {
  const [loaded, setLoaded] = useState(false); // 数据是否加载完成，用于图表展示
  const [data, setData] = useState([]); // 各个省的数据

  const [year, setYear] = useState(2021); // 默认2021年
  const [month, setMonth] = useState(0); // 默认全年总额

  const [finishedChart, setFinishedChart] = useState({} as echarts.EChartsType); // 用于重绘时销毁原图表

  // 初始化数据
  useEffect(() => {
    getProvinceMapAPI({ year, month }).then(res => {
      setData(res);
      setLoaded(true);
    });
  }, []);

  // data 变化时调用，初始时 data 无数据则直接返回，防止绘图失败
  useEffect(() => {
    if (!loaded) return;
    
    if (Object.keys(finishedChart).length !== 0) finishedChart.dispose();  // 重绘时需销毁原图
    const mapDiv = document.getElementById('province-map') as HTMLElement;
    const chart = echarts.init(mapDiv);
    const options = {
      // hover 某省提示文字
      tooltip: {
        triggerOn: "mousemove",
        padding: 8,
        borderWidth: 1,
        borderColor:'#409eff',
        backgroundColor: 'rgba(255,255,255,0.7)',
        textStyle:{
          color: '#000000',
          fontSize: 13
        },
        formatter: function(e: any) {
          const data = e.data;
          return `
          <div>
            <p><b style="font-size:15px;">${data.name}</b>(${year}年${month === 0 ? '全年' : month + '月'})</p>
            <p>处罚案例数目：</span><span>${data.value}</span></p>
            <p>罚金总额：</span><span>${data.fine}</span></p>
          </div>`;
        }
      },
      visualMap: {
        // 地图图例
        show: true,
        showLabel: true,
        pieces: month === 0 ? [
          // 选项为全年时的范围
          {
            gte: 200,
            label: ">= 200",
            color: "#1f307b"
          },
          {
            gte: 150,
            lt: 200,
            label: "150 - 199",
            color: "#3c57ce"
          },
          {
            gte: 100,
            lt: 150,
            label: "100 - 149",
            color: "#6f83db"
          },
          {
            gte: 50,
            lt: 100,
            label: "50 - 99",
            color: "#9face7"
          },
          {
            lt:50,
            label:'<50',
            color: "#bcc5ee"
          }
        ] : [
          // 选项为某月时的范围
          {
            gte: 30,
            label: ">= 30",
            color: "#1f307b"
          },
          {
            gte: 20,
            lt: 30,
            label: "20 - 29",
            color: "#3c57ce"
          },
          {
            gte: 10,
            lt: 20,
            label: "10 - 19",
            color: "#6f83db"
          },
          {
            gte: 5,
            lt: 10,
            label: "5 - 9",
            color: "#9face7"
          },
          {
            lt:5,
            label:'<5',
            color: "#bcc5ee"
          }
        ]
      },
      geo: {
        // 中国地图设置
        map: "china",
        scaleLimit: {
          min: 1,
          max: 2
        },
        zoom: 1,
        top: 120,
        label: {
          normal: {
            show: true,
            fontSize: "14",
            color: "rgb(20, 20, 20)",
            align: "center"
          },
        },
        itemStyle: {
          normal: {
            borderColor: "rgba(0, 0, 0, 0.2)"
          },
          emphasis: {
            areaColor: "#f2d5ad",
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            borderWidth: 0
          }
        }
      },
      series: [
        {
          name: "各省处罚案例",
          type: "map",
          geoIndex: 0,
          data
        }
      ]
    };
    chart.setOption(options);
    setFinishedChart(chart);
  }, [data]);

  const handleSearch = () => {
    setLoaded(false);
    getProvinceMapAPI({ year, month }).then(res => {
      setData(res);
      setLoaded(true);
    });
  }

  return (
    <>
      <div className="province-map-area">
        <div className="province-map-title">
          {
            month === 0 ? `${year}年全年各省处罚案例` : `${year}年${month}月各省处罚案例`
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
                MONTHS.map(((month) => <Option value={month} key={month}>{month === 0 ? '全年' : `${month}月`}</Option>))
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
        { loaded && <div id="province-map" />}
      </div>
    </>
  )
};

export default ProvinceMap;