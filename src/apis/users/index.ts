import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { UserModel } from "./type";

const getUserByIdInfo = async (userId: string) => {
  const res = await publicInstance.get<UserModel>(
    API_ROUTES.USER.GET_BY_ID(userId)
  );
  return res.data;
};

const getAllUsersInfo = async (country: string) => {
  const res = await publicInstance.get<UserModel[]>(
    API_ROUTES.USER.GET_ALL(country)
  );
  return res.data;
};

const getUsersByTypeInfo = async (userType: string, country: string) => {
  const res = await publicInstance.get<UserModel[]>(
    API_ROUTES.USER.GET_BY_TYPE(userType, country)
  );
  return res.data;
};

const addUser = async (payload: UserModel) => {
  const data = createFormData(payload!);

  const res = await publicInstance.post<UserModel>(API_ROUTES.USER.ADD, data);
  return res;
};

const editUser = async (payload: UserModel) => {
  const data = createFormData(payload!);
  const res = await publicInstance.put<UserModel>(
    API_ROUTES.USER.EDIT(payload._id ?? ""),
    data
  );
  return res.data;
};
const deleteUserAccount = async (userId: string) => {
  const res = await publicInstance.delete(API_ROUTES.USER.DELETE(userId));
  return res.data;
};

export {
  getAllUsersInfo,
  getUsersByTypeInfo,
  addUser,
  deleteUserAccount,
  editUser,
  getUserByIdInfo,
};
