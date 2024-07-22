import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { OrderModel } from "./type";

const getAllOrderList = async () => {
  const res = await publicInstance.get<OrderModel[]>(API_ROUTES.ORDER.GET_ALL);
  return res.data;
};

const getOrderByIdInfo = async (id: string) => {
  const res = await publicInstance.get<OrderModel>(
    API_ROUTES.ORDER.GET_BY_ID(id)
  );
  return res.data;
};

const editOrderStatus = async (payload: {
  orderStatus: string;
  _id: string;
}) => {
  const data = createFormData(payload);
  const res = await publicInstance.put(
    API_ROUTES.ORDER.EDIT_STATUS(payload._id!),
    data
  );
  return res.data;
};

const deleteOrder = async (id: string) => {
  const res = await publicInstance.delete(API_ROUTES.ORDER.DELETE(id));
  return res.data;
};

export { getAllOrderList, getOrderByIdInfo, deleteOrder, editOrderStatus };
