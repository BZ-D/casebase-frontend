import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { useSearchParams, useNavigate } from "react-router-dom";
import { message, Spin, Pagination, Result } from 'antd';
import SearchBar from '../../components/SearchBar';
import CaseCard from '../../components/CaseCard';
import { getFilesAPI } from '../../api/file';

const Home: React.FC = () => {
  const [searchParams] = useSearchParams(); // 取查询参数
	const [currentPage, setCurrentPage] = useState(1); // 换页用
	const [currentPageSize, setCurrentPageSize] = useState(3); // 改变页面大小用

	const navigate = useNavigate();

	// 再次搜索用
	const [filter, setFilter] = useState({
		date: {
			startDate: Number(searchParams.get('st')),
			endDate: Number(searchParams.get('et'))
		},
		content: searchParams.get('kwd')
	});
	const [pageNum] = useState(20);
	const [sorter, setSorter] = useState({
		date: searchParams.get('order')
	});

	const [files, setFiles] = useState([]); // 保存搜索到的文件列表
	const [searching, setSearching] = useState(true); // 显示加载动画

	// 搜索文件列表，初始化数据
	useEffect(() => {
		if (!filter.content) {
			// 地址栏content若为0，跳到intro页
			navigate('/');
			return;
		}

		const payload = {
			currentPage,
			currentPageSize,
			filter,
			pageNum,
			sorter
		};
		getFilesAPI(payload).then(res => {
			setFiles(res);
			setSearching(false);
		});
	}, [filter, sorter]);

	// 在主页点击搜索键时，通过setState触发useEffect重新请求数据
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
		setFiles([]); // 清除文件列表
		setCurrentPageSize(3); // 恢复默认3项每页
		setSearching(true); // 显示加载动画

		navigate(`/search?kwd=${content}&st=${startTime}&et=${endTime}&order=${order}`); // 更新地址栏url
		setFilter({
			date: {
				startDate: startTime,
				endDate: endTime
			},
			content
		});
		setSorter({
			date: order
		});
	};

	// 处理翻页
	const handlePageChange = (page: number, pageSize: number) => {
		setCurrentPageSize(pageSize);
		if (page <= 1) {
			setCurrentPage(1);
		} else {
			setCurrentPage(page);
		}
	};

	return (
		<div className={styles.Home}>
			<SearchBar
				className={styles.homeSearchBar}
				handleSearch={handleSearch}
				showTitle={false}
				defaultValue={filter.content}
			/>
			{
				files.length !== 0 && (
				<div className={styles.caseList}>
					<Pagination
						showSizeChanger
						pageSizeOptions={['3', '4', '5', '6', '7', '10']}
						defaultPageSize={3}
						total={files.length}
						showTotal={(total, range) => `${total} 个文件中的第 ${range[0]} 到 ${range[1]} 项`}
						onChange={handlePageChange}
						onShowSizeChange={handlePageChange}
					/>
					{
						files
							.slice((currentPage - 1) * currentPageSize, currentPage * currentPageSize)
							.map((item: any) =>
								<CaseCard
									title={item.name}
									intro={item.highLightedContent}
									key={item.docId}
									docId={item.docId}
								/>)
					}
				</div>)
			}

			{
        // 加载动画
        searching &&
        <Spin
					className={styles.hintCenter}
          tip="正在检索相关文件，可能需要几秒钟"
        />
      }

			{
        // 无内容提示
        !searching && files.length === 0 &&
				<Result
					className={styles.hintCenter}
					status="404"
					title="暂无检索结果，请稍后再试"
					subTitle="请尝试调整搜索日期范围或关键词。"
  			/>
      }
		</div>
	)
};

export default Home;