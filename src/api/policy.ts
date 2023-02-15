import { axios } from "../utils/request";

const POLICY_API_PREFIX = '/api/similarity';

export const getSimilarityListAPI = async (payload: any) => {
  const res = await axios({
    url: `${POLICY_API_PREFIX}/getSimilarList`,
    method: "POST",
    data: {
      inputFileName: payload.inputFileName,
      inputText: payload.inputText,
      isDifferent: payload.isDifferent,
      similarityLimit: payload.similarityLimit,
      matchNum: payload.matchNum
    }
  });
  return res.data.content;
}