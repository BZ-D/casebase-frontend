import React from 'react';
import styles from './index.module.css';
import { Button, message } from 'antd'; 
import { ToolOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';

const Intro: React.FC = () => {
	const navigate = useNavigate();

	const handleSearch = (queryBody: any) => {
		const { content, startTime, endTime, order } = queryBody;
		if (content === '') {
			message.error({
				content: '请输入内容再检索',
				key: 'no-content-hint',
				duration: 1.5
			});
			return;
		}
		if (startTime > endTime) {
			message.error({
				content: '起始日期不得晚于结束日期',
				key: 'date-error-hint',
				duration: 1.5
			});
			return;
		}
		navigate(`/search?kwd=${content}&st=${startTime}&et=${endTime}&order=${order}`);
	};

  const gotoWorkbench = () => {
    navigate('/workbench/cockpit');
  };

	return (
		<div className={styles.Home}>
			<div className={styles.btnArea}>
				<Button type="default" shape="round" icon={<UserOutlined />} size="large">
					小组信息
				</Button>
				<Button type="default" shape="round" icon={<ToolOutlined />} size="large" onClick={gotoWorkbench}>
					前往工作台
				</Button>
			</div>
			<SearchBar className={styles.introSearchBar} handleSearch={handleSearch} showTitle={true} />
		</div>
	)
};

export default Intro;