import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { NewsModel } from "./type";

const getNewsList = async (country: string) => {
  const res = await publicInstance.get<{
    message: string;
    results: NewsModel[];
  }>(API_ROUTES.NEWS.GET_ALL(country));
  return res.data.results;
};

const getNewsById = async (id: string) => {
  const res = await publicInstance.get<NewsModel>(
    API_ROUTES.NEWS.GET_BY_ID(id)
  );
  return res.data;
};

const addNews = async (payload: NewsModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.post(API_ROUTES.NEWS.ADD, data);
  return res.data;
};

const editNews = async (payload: NewsModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.put(
    API_ROUTES.NEWS.EDIT(payload._id!),
    data
  );
  return res.data;
};

const deleteNews = async (id: string) => {
  const res = await publicInstance.delete(API_ROUTES.NEWS.DELETE(id));
  return res.data;
};

export { getNewsList, deleteNews, getNewsById, addNews, editNews };
