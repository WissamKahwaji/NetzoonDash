import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteOrder,
  editOrderStatus,
  getAllOrderList,
  getOrderByIdInfo,
} from ".";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useGetAllOrdersListQuery = () =>
  useQuery({
    queryKey: ["get-all-orders"],
    queryFn: () => getAllOrderList(),
  });

const useGetOrderByIdQuery = (id: string) =>
  useQuery({
    queryKey: ["get-order-by-id"],
    queryFn: () => getOrderByIdInfo(id),
  });

const useEditOrderStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-order-status"],
    mutationFn: (payload: { orderStatus: string; _id: string }) =>
      editOrderStatus(payload),
    onSuccess() {
      toast.success(`edit status successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-order-by-id"],
      });
    },
    onError() {
      toast.error(`failed to edit status`);
    },
  });
};

const useDeleteOrderMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["delete-order"],
    mutationFn: (id: string) => {
      return deleteOrder(id);
    },
    onSuccess() {
      toast.success(`deleted successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-all-orders"],
      });
      navigate(-1);
    },
    onError() {
      toast.error(`failed to delete order`);
    },
  });
};

export {
  useGetAllOrdersListQuery,
  useGetOrderByIdQuery,
  useDeleteOrderMutation,
  useEditOrderStatusMutation,
};
