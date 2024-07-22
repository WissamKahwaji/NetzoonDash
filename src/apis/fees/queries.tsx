import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editFeesInfo, getFeesInfo } from ".";
import { FeesModel } from "./type";
import { toast } from "react-toastify";

const useGetFeesInfoQuery = () =>
  useQuery({
    queryKey: ["get-fees"],
    queryFn: () => getFeesInfo(),
  });

const useEditFeesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-fees"],
    mutationFn: (payload: FeesModel) => editFeesInfo(payload),
    onSuccess() {
      toast.success(`edited fees successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-fees"],
      });
    },
    onError() {
      toast.error(`failed to edit`);
    },
  });
};

export { useGetFeesInfoQuery, useEditFeesMutation };
