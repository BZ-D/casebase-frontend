import React from 'react';
import styles from './index.module.css';
import { Button, message, Modal } from 'antd'; 
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

  const showGroupInfo = () => {
    Modal.info({
      title: '互联网实践项目第 4 组',
      content: (
        <div>
          <br />
          <p>丁炳智  191250024</p>
          <p>冯夏浵  191250032</p>
          <p>林威鹏  191250087</p>
          <p>许　燚  191250168</p>
          <p>郑伟鑫  191250206</p>
        </div>
      ),
      okText: '关闭',
      maskClosable: true
    })
  }

  const gotoWorkbench = () => {
    navigate('/workbench/cockpit');
  };

	return (
		<div className={styles.Home}>
			<div className={styles.btnArea}>
				<Button type="default" shape="round" icon={<UserOutlined />} size="large" onClick={showGroupInfo}>
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