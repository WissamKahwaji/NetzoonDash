import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { DealsCategoryModel, DealsItemModel } from "./type";

const getDealsCategories = async () => {
  const res = await publicInstance.get<{
    message: string;
    results: DealsCategoryModel[];
  }>(API_ROUTES.DEALS.GET_DEALS_CATEGORIES);
  return res.data.results;
};

const getDealsByCategory = async (category: string, country: string) => {
  const res = await publicInstance.get<{
    message: string;
    results: DealsItemModel[];
  }>(API_ROUTES.DEALS.GET_DEALS_BY_CATEGORY(category, country));
  return res.data;
};

const getDealCategoryById = async (id: string) => {
  const res = await publicInstance.get<DealsCategoryModel>(
    API_ROUTES.DEALS.GET_CATEGORY_BY_ID(id)
  );
  return res.data;
};

const addDealCategory = async (payload: DealsCategoryModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.post(API_ROUTES.DEALS.ADD_CATEGORY, data);
  return res.data;
};

const editDealCategory = async (payload: DealsCategoryModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.put(
    API_ROUTES.DEALS.EDIT_CATEGORY(payload._id!),
    data
  );
  return res.data;
};

const deleteDealCategory = async (id: string) => {
  const res = await publicInstance.delete(API_ROUTES.DEALS.DELETE_CATEGORY(id));
  return res.data;
};

const getDealById = async (id: string) => {
  const res = await publicInstance.get<DealsItemModel>(
    API_ROUTES.DEALS.GET_DEAL_BY_ID(id)
  );
  return res.data;
};

const addDeal = async (payload: DealsItemModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.post(API_ROUTES.DEALS.ADD_DEAL, data);
  return res.data;
};

const editDeal = async (payload: DealsItemModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.put(
    API_ROUTES.DEALS.EDIT_DEAL(payload._id!),
    data
  );
  return res.data;
};

const deleteDeal = async (id: string) => {
  const res = await publicInstance.delete(API_ROUTES.DEALS.DELETE_DEAL(id));
  return res.data;
};

export {
  getDealsCategories,
  deleteDealCategory,
  addDealCategory,
  editDealCategory,
  getDealCategoryById,
  getDealsByCategory,
  deleteDeal,
  addDeal,
  editDeal,
  getDealById,
};
