import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addDealCategory,
  deleteDealCategory,
  editDealCategory,
  getDealCategoryById,
  getDealsByCategory,
  getDealsCategories,
} from ".";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DealsCategoryModel } from "./type";

const useGetDealsCategoriesQuery = () =>
  useQuery({
    queryKey: ["get-deals-categories"],
    queryFn: () => getDealsCategories(),
  });

const useGetDealsByCategoryQuery = (category: string, country: string) =>
  useQuery({
    queryKey: ["get-deals-by-category"],
    queryFn: () => getDealsByCategory(category, country),
  });

const useGetDealCategoryByIdQuery = (id: string) =>
  useQuery({
    queryKey: ["get-deal-category-by-id"],
    queryFn: () => getDealCategoryById(id),
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

export {
  useGetDealsCategoriesQuery,
  useDeleteDealCategoryMutation,
  useGetDealCategoryByIdQuery,
  useAddDealCategoryMutation,
  useEditDealCategoryMutation,
  useGetDealsByCategoryQuery,
};
