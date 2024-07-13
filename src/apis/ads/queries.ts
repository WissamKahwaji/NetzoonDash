import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addAds, deleteAds, editAds, getAdsById, getAdsList } from ".";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AdsInputModel } from "./type";

const useGetAdsListQuery = () =>
  useQuery({
    queryKey: ["get-ads-list"],
    queryFn: () => getAdsList(),
  });

const useGetAdsByIdQuery = (id: string) =>
  useQuery({
    queryKey: ["get-ads-by-id"],
    queryFn: () => getAdsById(id),
  });
const useAddAdsMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["add-ads"],
    mutationFn: (payload: AdsInputModel) => addAds(payload),
    onSuccess(_data, variable) {
      toast.success(`add ${variable.advertisingTitle} successfully.`);
      navigate(-2);
    },
    onError(_data, variable) {
      toast.error(`failed to add ${variable.advertisingTitle}`);
    },
  });
};

const useEditAdsMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["edit-ads"],
    mutationFn: (payload: AdsInputModel) => editAds(payload),
    onSuccess(_data, variable) {
      toast.success(`edit ${variable.advertisingTitle} successfully.`);
      navigate(-1);
    },
    onError(_data, variable) {
      toast.error(`failed to edit ${variable.advertisingTitle}`);
    },
  });
};

const useDeleteAdsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-ads"],
    mutationFn: (id: string) => {
      return deleteAds(id);
    },
    onSuccess() {
      toast.success(`delete ads successfully.`);
      queryClient.invalidateQueries({ queryKey: ["get-ads-list"] });
    },
    onError() {
      toast.error(`failed to delete ads`);
    },
  });
};

export {
  useGetAdsListQuery,
  useDeleteAdsMutation,
  useGetAdsByIdQuery,
  useAddAdsMutation,
  useEditAdsMutation,
};
