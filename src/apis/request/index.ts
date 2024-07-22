import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { RequestModel } from "./type";

const getRequestsInfo = async () => {
  const res = await publicInstance.get<{
    message: string;
    results: RequestModel[];
  }>(API_ROUTES.REQUEST.GET_ALL);
  return res.data.results;
};

export { getRequestsInfo };
