import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { FeesModel } from "./type";

const getFeesInfo = async () => {
  const res = await publicInstance.get<FeesModel>(API_ROUTES.FEES.GET_ALL);
  return res.data;
};

const editFeesInfo = async (payload: FeesModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.put(API_ROUTES.FEES.EDIT, data);
  return res.data;
};
export { getFeesInfo, editFeesInfo };
