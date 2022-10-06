import { axios } from "../utils/request";

const FILE_API_PREFIX = '/api/document';

export const getFilesAPI = async (payload: any) => {
  const res = await axios({
    url: `${FILE_API_PREFIX}/getFiles`,
    method: "POST",
    data: {
      currentPage: payload.currentPage,
      currentPageSize: payload.currentPageSize,
      filter: payload.filter,
      pageNum: payload.pageNum,
      sorter: payload.sorter
    }
  });
  return res.data.content;
}

export const getFileByIdAPI = async (id: number) => {
  const res = await axios({
    url: `${FILE_API_PREFIX}/getFileById/${id}`,
    method: 'GET'
  });
  return res.data.content;
}