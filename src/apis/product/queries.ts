import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addProduct,
  getProductsByCategory,
  getProductById,
  deleteProduct,
  editProduct,
} from ".";
import { useNavigate } from "react-router-dom";
import { ProductModel } from "./type";
import { toast } from "react-toastify";

const useGetProductsByCategoryQuery = (categoryId: string) =>
  useQuery({
    queryKey: ["get-products-by-category"],
    queryFn: () => getProductsByCategory(categoryId),
  });
const useGetProductByIdQuery = (productId: string) =>
  useQuery({
    queryKey: ["get-products-by-id"],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });

const useAddProductMutation = (
  departmentName: string,
  categoryName: string
) => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["add-product"],
    mutationFn: (payload: ProductModel) =>
      addProduct(payload, departmentName, categoryName),
    onSuccess(_data, variable) {
      toast.success(`add ${variable.name} successfully.`);
      navigate(-1);
    },
    onError(_data, variable) {
      toast.error(`failed to add ${variable.name}`);
    },
  });
};

const useEditProdictMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-product"],
    mutationFn: (payload: ProductModel) => editProduct(payload),
    onSuccess(_data, variable) {
      toast.success(`edit ${variable.name} successfully.`);
      queryClient.invalidateQueries({ queryKey: ["get-products-by-category"] });

      navigate(-1);
    },
    onError(_data, variable) {
      toast.error(`failed to edit ${variable.name}`);
    },
  });
};

const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-product"],
    mutationFn: (productId: string) => {
      return deleteProduct(productId);
    },
    onSuccess() {
      toast.success(`delete product successfully.`);
      queryClient.invalidateQueries({ queryKey: ["get-products-by-category"] });
    },
    onError() {
      toast.error(`failed to delete product`);
    },
  });
};

export {
  useGetProductsByCategoryQuery,
  useAddProductMutation,
  useGetProductByIdQuery,
  useDeleteProductMutation,
  useEditProdictMutation,
};
