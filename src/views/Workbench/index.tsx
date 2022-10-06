import React from "react";
import { Menu, Row, Col, Button } from 'antd';
import { HomeOutlined, BarChartOutlined, ContainerOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import hammer from '../../assets/pics/hammer.png';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const items = [
	{
		key: "cockpit",
		label: "查询驾驶舱",
		icon: <BarChartOutlined />
	},
	{
		key: "file",
		label: "文书管理",
		icon: <ContainerOutlined />
	}
];

const Workbench: React.FC = () => {
	const navigate = useNavigate();

	const handleGotoIntro = () => {
		navigate('/');
	};

	const handleMenuItemClick = (e: any) => {
		navigate(`/workbench/${e.key}`);
	};

	return (
		<div className={styles.Workbench}>
			<Row className={styles.topBar}>
				<Col span={24} className={styles.topBarArea}>
					<img src={hammer} alt="icon" />
					<div>银保监会行政处罚案例库 — 工作台</div>
					<Button
						className={styles.toIntroBtn}
						type="default"
						shape="round"
						icon={<HomeOutlined />}
						size="middle"
						onClick={handleGotoIntro}
					>
						前往主页
					</Button>
				</Col>
			</Row>

			<Row className={styles.mainArea}>
				<Col span={4} className={styles.menu}>
					<Menu
						defaultSelectedKeys={['cockpit']}
						mode="inline"
						items={items}
						onClick={handleMenuItemClick}
					/>
				</Col>
				<Col span={20} className={styles.contentArea}>
					<Outlet />
				</Col>
			</Row>
		</div>
	)
};

export default Workbench;