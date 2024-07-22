import API_ROUTES from "../../constants/apiRoutes";
import { createFormData } from "../../utils";
import publicInstance from "../publicInstance";
import { SliderInputModel, SliderModel } from "./type";

const getSliderInfo = async () => {
  const res = await publicInstance.get<SliderModel>(API_ROUTES.SLIDER.GET);
  return res.data;
};

const editSlidersInfo = async (payload: SliderInputModel) => {
  const data = createFormData(payload);
  const res = await publicInstance.put(
    API_ROUTES.SLIDER.EDIT_SLIDER(payload._id!),
    data
  );
  return res.data;
};

export { getSliderInfo, editSlidersInfo };
