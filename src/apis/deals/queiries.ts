import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addDeal,
  addDealCategory,
  deleteDeal,
  deleteDealCategory,
  editDeal,
  editDealCategory,
  getDealById,
  getDealCategoryById,
  getDealsByCategory,
  getDealsCategories,
} from ".";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DealsCategoryModel, DealsItemModel } from "./type";

const useGetDealsCategoriesQuery = () =>
  useQuery({
    queryKey: ["get-deals-categories"],
    queryFn: () => getDealsCategories(),
  });

const useGetDealsByCategoryQuery = (
  category: string,
  country: string,
  enabled?: boolean | undefined
) =>
  useQuery({
    queryKey: ["get-deals-by-category"],
    queryFn: () => getDealsByCategory(category, country),
    enabled: enabled,
  });

const useGetDealCategoryByIdQuery = (id: string) =>
  useQuery({
    queryKey: ["get-deal-category-by-id"],
    queryFn: () => getDealCategoryById(id),
    enabled: !!id,
  });

const useAddDealCategoryMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-deal-category"],
    mutationFn: (payload: DealsCategoryModel) => addDealCategory(payload),
    onSuccess(_data, variables) {
      toast.success(`add ${variables.name} successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-deals-categories"],
      });
      navigate(-1);
    },
    onError(_error, variables) {
      toast.error(`failed to add ${variables.name}`);
    },
  });
};

const useEditDealCategoryMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-deal-category"],
    mutationFn: (payload: DealsCategoryModel) => editDealCategory(payload),
    onSuccess(_data, variables) {
      toast.success(`edit ${variables.name} successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-deals-categories"],
      });
      navigate(-1);
    },
    onError(_error, variables) {
      toast.error(`failed to edit ${variables.name}`);
    },
  });
};

const useDeleteDealCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-deal-category"],
    mutationFn: (id: string) => {
      return deleteDealCategory(id);
    },
    onSuccess() {
      toast.success(`deleted successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-deals-categories"],
      });
    },
    onError() {
      toast.error(`failed to delete category`);
    },
  });
};

const useGetDealByIdQuery = (id: string) =>
  useQuery({
    queryKey: ["get-deal-by-id"],
    queryFn: () => getDealById(id),
    enabled: !!id,
  });

const useAddDealMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["add-deal"],
    mutationFn: (payload: DealsItemModel) => addDeal(payload),
    onSuccess(_data, variable) {
      toast.success(`add ${variable.name} successfully.`);
      navigate(-2);
    },
    onError(_data, variable) {
      toast.error(`failed to add ${variable.name}`);
    },
  });
};

const useEditDealMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["edit-deal"],
    mutationFn: (payload: DealsItemModel) => editDeal(payload),
    onSuccess(_data, variable) {
      toast.success(`edit ${variable.name} successfully.`);
      navigate(-1);
    },
    onError(_data, variable) {
      toast.error(`failed to edit ${variable.name}`);
    },
  });
};

const useDeleteDealMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-deal"],
    mutationFn: (id: string) => {
      return deleteDeal(id);
    },
    onSuccess() {
      toast.success(`deleted successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-deals-by-category"],
      });
    },
    onError() {
      toast.error(`failed to delete deal`);
    },
  });
};

export {
  useGetDealsCategoriesQuery,
  useDeleteDealCategoryMutation,
  useGetDealCategoryByIdQuery,
  useAddDealCategoryMutation,
  useEditDealCategoryMutation,
  useGetDealsByCategoryQuery,
  useDeleteDealMutation,
  useAddDealMutation,
  useEditDealMutation,
  useGetDealByIdQuery,
};
