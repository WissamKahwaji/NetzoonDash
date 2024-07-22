import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getComplaintsInfo, replyToComplaint } from ".";
import { ComplaintInputModel } from "./type";
import { toast } from "react-toastify";

const useGetComplaintsInfoQuery = () =>
  useQuery({
    queryKey: ["get-complaints"],
    queryFn: () => getComplaintsInfo(),
  });

const useEditComplaintMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-complaints"],
    mutationFn: (payload: ComplaintInputModel) => replyToComplaint(payload),
    onSuccess() {
      toast.success(`replied successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["get-complaints"],
      });
    },
    onError() {
      toast.error(`failed to reply`);
    },
  });
};

export { useGetComplaintsInfoQuery, useEditComplaintMutation };
