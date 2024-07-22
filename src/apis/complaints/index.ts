import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { ComplaintInputModel, ComplaintModel } from "./type";

const getComplaintsInfo = async () => {
  const res = await publicInstance.get<{
    message: string;
    results: ComplaintModel[];
  }>(API_ROUTES.COMPLAINTS.GET_ALL);
  return res.data.results;
};

const replyToComplaint = async (payload: ComplaintInputModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.put(
    API_ROUTES.COMPLAINTS.REPLY(payload._id!),
    data
  );
  return res.data;
};

export { getComplaintsInfo, replyToComplaint };
