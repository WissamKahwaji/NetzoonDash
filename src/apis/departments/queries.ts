import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteDepartmentCategory,
  editDepartmentCategory,
  getAllCategoriesByDepartmentInfo,
  getAllDepartmentsInfo,
  getCategoryByIdInfo,
  getFactoriesCategoriesInfo,
  getFactoryUsersInfo,
} from ".";
import { useNavigate } from "react-router-dom";
import { EditDepartmentCategoryParams } from "./type";
import { toast } from "react-toastify";

const useGetAllDepartmentsQuery = () =>
  useQuery({
    queryKey: ["get-all-departments"],
    queryFn: () => getAllDepartmentsInfo(),
  });

const useGetAllCategoriesByDepartmentQuery = (departmentId: string) =>
  useQuery({
    queryKey: ["get-all-categories-by-department"],
    queryFn: () => getAllCategoriesByDepartmentInfo(departmentId),
  });

const useGetCategoryByIdQuery = (categoryId: string) =>
  useQuery({
    queryKey: ["get-category-by-id"],
    queryFn: () => getCategoryByIdInfo(categoryId),
  });
const useEditDepartmentCategoryMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-department-category"],
    mutationFn: (payload: EditDepartmentCategoryParams) =>
      editDepartmentCategory(payload),
    onSuccess(data) {
      toast.success(`edit ${data.name} successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-all-categories-by-department"],
      });
      navigate(-1);
    },
    onError(data) {
      toast.error(`failed to edit ${data.name}`);
    },
  });
};

const useDeleteDepartmentCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-department-category"],
    mutationFn: (categoryId: string) => {
      return deleteDepartmentCategory(categoryId);
    },
    onSuccess(_data) {
      toast.success(`delete ${_data.name} successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-all-categories-by-department"],
      });
    },
    onError(_data) {
      toast.error(`failed to delete ${_data.name}`);
    },
  });
};

const useGetFactoriesCategoriesQuery = () =>
  useQuery({
    queryKey: ["get-factories-categories"],
    queryFn: () => getFactoriesCategoriesInfo(),
  });
const useGetFactoryUsersQuery = (id: string) =>
  useQuery({
    queryKey: ["get-factory-users"],
    queryFn: () => getFactoryUsersInfo(id),
  });

export {
  useGetAllDepartmentsQuery,
  useGetAllCategoriesByDepartmentQuery,
  useGetCategoryByIdQuery,
  useEditDepartmentCategoryMutation,
  useDeleteDepartmentCategoryMutation,
  useGetFactoriesCategoriesQuery,
  useGetFactoryUsersQuery,
};
