import { useMutation, useQuery } from "@tanstack/react-query";
import { editSlidersInfo, getSliderInfo } from ".";
import { useNavigate } from "react-router-dom";
import { SliderInputModel } from "./type";
import { toast } from "react-toastify";

const useGetSliderInfoQuery = () =>
  useQuery({
    queryKey: ["get-sliders"],
    queryFn: () => getSliderInfo(),
  });

const useEditSlidersInfoMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["edit-sliders-info"],
    mutationFn: (payload: SliderInputModel) => editSlidersInfo(payload),
    onSuccess() {
      toast.success(`edit  successfully.`);
      navigate(-1);
    },
    onError() {
      toast.error(`failed to edit`);
    },
  });
};

export { useGetSliderInfoQuery, useEditSlidersInfoMutation };
