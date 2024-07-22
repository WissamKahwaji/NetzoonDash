import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addService,
  addServiceCategory,
  deleteService,
  deleteServiceCategory,
  editService,
  editServiceCategory,
  getServiceById,
  getServiceCategoryById,
  getServicesByCategory,
  getServicesCategories,
} from ".";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ServiceCategoryModel, ServiceInputModel } from "./type";

const useGetServicesCategoriesQuery = () =>
  useQuery({
    queryKey: ["get-services-categories"],
    queryFn: () => getServicesCategories(),
  });

const useGetServicesByCategoryQuery = (category: string, country: string) =>
  useQuery({
    queryKey: ["get-services-by-category"],
    queryFn: () => getServicesByCategory(category, country),
  });

const useGetServiceCategoryByIdQuery = (id: string) =>
  useQuery({
    queryKey: ["get-service-category-by-id"],
    queryFn: () => getServiceCategoryById(id),
    enabled: !!id,
  });

const useAddServiceCategoryMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-service-category"],
    mutationFn: (payload: ServiceCategoryModel) => addServiceCategory(payload),
    onSuccess(_data, variables) {
      toast.success(`add ${variables.title} successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-services-categories"],
      });
      navigate(-1);
    },
    onError(_error, variables) {
      toast.error(`failed to add ${variables.title}`);
    },
  });
};

const useEditServiceCategoryMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-service-category"],
    mutationFn: (payload: ServiceCategoryModel) => editServiceCategory(payload),
    onSuccess(_data, variables) {
      toast.success(`edit ${variables.title} successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-services-categories"],
      });
      navigate(-1);
    },
    onError(_error, variables) {
      toast.error(`failed to edit ${variables.title}`);
    },
  });
};

const useDeleteServiceCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-service-category"],
    mutationFn: (id: string) => {
      return deleteServiceCategory(id);
    },
    onSuccess() {
      toast.success(`deleted successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-services-categories"],
      });
    },
    onError() {
      toast.error(`failed to delete category`);
    },
  });
};

const useGetServiceByIdQuery = (id: string) =>
  useQuery({
    queryKey: ["get-service-by-id"],
    queryFn: () => getServiceById(id),
    enabled: !!id,
  });

const useAddServiceMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["add-service"],
    mutationFn: (payload: ServiceInputModel) => addService(payload),
    onSuccess(_data, variable) {
      toast.success(`add ${variable.title} successfully.`);
      navigate(`/services/category/${variable.category}`, { replace: true });
    },
    onError(_data, variable) {
      toast.error(`failed to add ${variable.title}`);
    },
  });
};

const useEditServiceMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["edit-service"],
    mutationFn: (payload: ServiceInputModel) => editService(payload),
    onSuccess(_data, variable) {
      toast.success(`edit ${variable.title} successfully.`);
      navigate(-1);
    },
    onError(_data, variable) {
      toast.error(`failed to edit ${variable.title}`);
    },
  });
};

const useDeleteServiceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-service"],
    mutationFn: (id: string) => {
      return deleteService(id);
    },
    onSuccess() {
      toast.success(`deleted successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-services-by-category"],
      });
    },
    onError() {
      toast.error(`failed to delete service`);
    },
  });
};

export {
  useGetServicesCategoriesQuery,
  useDeleteServiceCategoryMutation,
  useAddServiceCategoryMutation,
  useEditServiceCategoryMutation,
  useGetServiceCategoryByIdQuery,
  useGetServicesByCategoryQuery,
  useDeleteServiceMutation,
  useGetServiceByIdQuery,
  useAddServiceMutation,
  useEditServiceMutation,
};
