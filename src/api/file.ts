import { axios } from "../utils/request";

const FILE_API_PREFIX = '/api/document';

export const getFilesAPI = (payload: any) => {
  return axios({
    url: `${FILE_API_PREFIX}/getFiles`,
    method: "POST",
    data: {
      currentPage: payload.currentPage,
      currentPageSize: payload.currentPageSize,
      filter: payload.filter,
      pageNum: payload.pageNum,
      sorter: payload.sorter
    }
  }).then(res => {
    return res.data.content;
  });
}

export const getFileByIdAPI = (id: number) => {
  return axios({
    url: `${FILE_API_PREFIX}/getFileById/${id}`,
    method: 'GET'
  }).then(res => {
    return res.data.content;
  });
}