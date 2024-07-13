import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { ProductModel } from "./type";

const getProductsByCategory = async (categoryId: string) => {
  const res = await publicInstance.get<ProductModel[]>(
    API_ROUTES.PRODUCT.GET_BY_CATEGORY(categoryId)
  );
  return res.data;
};

const getProductById = async (productId: string) => {
  const res = await publicInstance.get<ProductModel>(
    API_ROUTES.PRODUCT.GET_BY_ID(productId)
  );
  return res.data;
};

const addProduct = async (
  payload: ProductModel,
  departmentName: string,
  categoryName: string
) => {
  const data = createFormData({ ...payload!, departmentName, categoryName });

  const res = await publicInstance.post<ProductModel>(
    API_ROUTES.PRODUCT.ADD,
    data
  );
  return res;
};

const editProduct = async (payload: ProductModel) => {
  const data = createFormData(payload!);
  const res = await publicInstance.put(
    API_ROUTES.PRODUCT.EDIT(payload._id ?? ""),
    data
  );
  return res.data;
};

const deleteProduct = async (productId: string) => {
  const res = await publicInstance.delete(API_ROUTES.PRODUCT.DELETE(productId));
  return res.data;
};

export {
  getProductsByCategory,
  addProduct,
  getProductById,
  deleteProduct,
  editProduct,
};
