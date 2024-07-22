import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editPrivacyInfo, getPrivacyInfo } from ".";
import { PrivacyInputModel } from "./type";
import { toast } from "react-toastify";

const useGetPrivacyInfoQuery = () =>
  useQuery({
    queryKey: ["get-privacy-info"],
    queryFn: () => getPrivacyInfo(),
  });

const useEditPrivacyInfoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-info"],
    mutationFn: (payload: PrivacyInputModel) => editPrivacyInfo(payload),
    onSuccess() {
      toast.success(`edited successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-privacy-info"],
      });
    },
    onError() {
      toast.error(`failed to edit`);
    },
  });
};

export { useGetPrivacyInfoQuery, useEditPrivacyInfoMutation };
