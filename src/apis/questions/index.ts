import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { QuestionModel } from "./type";

const getQuestionsInfo = async () => {
  const res = await publicInstance.get<{
    message: string;
    results: QuestionModel[];
  }>(API_ROUTES.QUESTION.GET_ALL);
  return res.data.results;
};

export { getQuestionsInfo };
