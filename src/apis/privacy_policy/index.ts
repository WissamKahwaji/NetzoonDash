import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { PrivacyInputModel, PrivacyModel } from "./type";

const getPrivacyInfo = async () => {
  const res = await publicInstance.get<{
    message: string;
    results: PrivacyModel[];
  }>(API_ROUTES.PRIVACY.GET);
  return res.data.results;
};

const editPrivacyInfo = async (payload: PrivacyInputModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.put(API_ROUTES.PRIVACY.EDIT, data);
  return res.data;
};

export { getPrivacyInfo, editPrivacyInfo };
