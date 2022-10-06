import { axios } from "../utils/request";

const COCKPIT_API_PREFIX = '/api/data';

// 获取全年各省处罚数目或某年某月各省处罚数目
export const getProvinceMapAPI = async (payload: any) => {
  const res = await axios({
    url: `${COCKPIT_API_PREFIX}/getMapData`,
    method: "POST",
    data: {
      year: payload.year,
      month: payload.month // 1-12正常统计，为0则统计全年总数
    }
  });
  return res.data.content;
}

// 获取全年各月份处罚数目
export const getTotalNumAPI = async (payload: any) => {
  const res = await axios({
    url: `${COCKPIT_API_PREFIX}/getTotalJson`,
    method: 'POST',
    data: {
      year: payload.year,
      month: payload.month // 此参数无用
    }
  });
  return res.data.content;
}

// 获取全年各月份罚金
export const getTotalFineAPI = async (payload: any) => {
  const res = await axios({
    url: `${COCKPIT_API_PREFIX}/getFineJson`,
    method: 'POST',
    data: {
      year: payload.year,
      month: payload.month // 此参数无用
    }
  });
  return res.data.content;
}

// 获取全年各类型机构处罚数目或某年某月各类型机构处罚数目
export const getOrganNumAPI = async (payload: any) => {
  const res = await axios({
    url: `${COCKPIT_API_PREFIX}/getOrgJson`,
    method: "POST",
    data: {
      year: payload.year,
      month: payload.month // 1-12正常统计，为0则统计全年总数
    }
  });
  return res.data.content;
}

// 获取全年各具体机构处罚数目或某年某月各具体机构处罚数目 top10
export const getDetailOrganNumAPI = async (payload: any) => {
  const res = await axios({
    url: `${COCKPIT_API_PREFIX}/getOrgDetailJson`,
    method: "POST",
    data: {
      year: payload.year,
      month: payload.month // 1-12正常统计，为0则统计全年总数
    }
  });
  return res.data.content;
}

// 获取全年各具体机构罚金或某年某月各具体机构罚金 top10
export const getDetailOrganFineAPI = async (payload: any) => {
  const res = await axios({
    url: `${COCKPIT_API_PREFIX}/getOrgDetailFineJson`,
    method: "POST",
    data: {
      year: payload.year,
      month: payload.month // 1-12正常统计，为0则统计全年总数
    }
  });
  return res.data.content;
}

// 获取全年监管总局分局处罚数目或某年某月监管总局分局处罚数目
export const getOfficeNumAPI = async (payload: any) => {
  const res = await axios({
    url: `${COCKPIT_API_PREFIX}/getPieJson`,
    method: "POST",
    data: {
      year: payload.year,
      month: payload.month // 1-12正常统计，为0则统计全年总数
    }
  });
  return res.data.content;
}

// 获取全年监管总局分局罚金或某年某月监管总局分局罚金
export const getOfficeFineAPI = async (payload: any) => {
  const res = await axios({
    url: `${COCKPIT_API_PREFIX}/getPieFineJson`,
    method: "POST",
    data: {
      year: payload.year,
      month: payload.month // 1-12正常统计，为0则统计全年总数
    }
  });
  return res.data.content;
}