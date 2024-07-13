import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { NotificationModel } from "./type";

const getNotificationsList = async () => {
  const res = await publicInstance.get<NotificationModel[]>(
    API_ROUTES.NOTI.GET_ALL
  );
  return res.data;
};

export { getNotificationsList };
