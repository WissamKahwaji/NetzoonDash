import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { OpinionModel } from "./type";

const getOpinionsInfo = async () => {
  const res = await publicInstance.get<{
    message: string;
    results: OpinionModel[];
  }>(API_ROUTES.OPINION.GET_ALL);
  return res.data.results;
};

export { getOpinionsInfo };
