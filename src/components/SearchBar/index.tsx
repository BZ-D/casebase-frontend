import React, { useState } from 'react';
import styles from './index.module.css';
import title from '../../assets/pics/title.png';
import { Input, Collapse, DatePicker, Select } from 'antd'; 
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

interface IProp {
  className?: string;
  handleSearch: any; // function(obj)
  showTitle: boolean; // default true
  defaultValue?: string|null;
}

const { Search } = Input;
const { Panel } = Collapse;
const { Option } = Select;

const SearchBar: React.FC<IProp> = (props) => {
  const [startTime, setStartTime] = useState(0); // 时间戳形式的时间
	const [endTime, setEndTime] = useState(0);
	const [order, setOrder] = useState('DESC');

  const disableDate = (current: any) => {
		return current && current >= moment().endOf('day');
	};

  return (
    <div className={`${styles.searchArea} ${props.className ? props.className : ''}`}>
      {props.showTitle && <img className={styles.searchTitle} src={title} alt="search-title" />}
      <Search
        className={styles.searchInput}
        placeholder="请在此输入案例内容关键词"
        enterButton="检索"
        size="large"
        defaultValue={props.defaultValue ? props.defaultValue : ''}
        maxLength={30}
        onSearch={(value, event) => {
          props.handleSearch({
            content: value,
            startTime,
            endTime,
            order
          });
        }}
      />
      <Collapse className={styles.searchConfig} ghost>
        <Panel header="更多搜索设置" key="1">
          <div className={styles.configArea}>
            <div className={styles.configItem}>
              <div>
                起始日期：
              </div>
              <DatePicker
                locale={locale}
                allowClear={false}
                disabledDate={disableDate}
                onChange={(date)=>{
                  setStartTime(moment(date).valueOf());
                }}
              />
            </div>
            <div className={styles.configItem}>
              <div>
                终止日期：
              </div>
              <DatePicker
                locale={locale}
                allowClear={false}
                disabledDate={disableDate}
                onChange={(date)=>{
                  setEndTime(moment(date).valueOf());
                }}
              />
            </div>
            <div className={styles.configItem}>
              <div>
                按日期排序：
              </div>
              <Select
                defaultValue="DESC"
                onChange={(value) => {
                  setOrder(value);
              }}>
                <Option value="DESC">降序</Option>
                <Option value="ASC">升序</Option>
              </Select>
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  )
};

export default SearchBar;