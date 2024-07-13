import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addUser,
  deleteUserAccount,
  editUser,
  getAllUsersInfo,
  getUserByIdInfo,
  getUsersByTypeInfo,
} from ".";
import { UserModel } from "./type";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useGetUserByIdQuery = (userId: string) =>
  useQuery({
    queryKey: ["get-user-by-id"],
    queryFn: () => getUserByIdInfo(userId),
  });

const useGetAllUsersQuery = () =>
  useQuery({
    queryKey: ["get-all-users"],
    queryFn: () => getAllUsersInfo(),
  });

const useGetUsersByTypeQuery = (userType: string) =>
  useQuery({
    queryKey: ["get-users-by-type"],
    queryFn: () => getUsersByTypeInfo(userType),
  });

const useAddUserMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["add-user"],
    mutationFn: (payload: UserModel) => addUser(payload),
    onSuccess(_data, variable) {
      toast.success(`add ${variable.username} successfully.`);
      navigate(-1);
    },
    onError(_data, variable) {
      toast.error(`failed to add ${variable.username}`);
    },
  });
};
const useEditUserMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-user"],
    mutationFn: (payload: UserModel) => editUser(payload),
    onSuccess(_data, variable) {
      toast.success(`edit ${variable.username} successfully.`);
      queryClient.invalidateQueries({ queryKey: ["get-users-by-type"] });
      navigate(-1);
    },
    onError(_data, variable) {
      toast.error(`failed to edit ${variable.username}`);
    },
  });
};

const useDeleteUserAccountMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-user-account"],
    mutationFn: (userId: string) => {
      return deleteUserAccount(userId);
    },
    onSuccess() {
      toast.success(`delete user successfully.`);
      queryClient.invalidateQueries({ queryKey: ["get-users-by-type"] });
    },
    onError() {
      toast.error(`failed to delete user`);
    },
  });
};

export {
  useGetAllUsersQuery,
  useGetUsersByTypeQuery,
  useAddUserMutation,
  useDeleteUserAccountMutation,
  useEditUserMutation,
  useGetUserByIdQuery,
};
