import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNews, deleteNews, editNews, getNewsById, getNewsList } from ".";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { NewsModel } from "./type";

const useGetNewsListQuery = (country: string) =>
  useQuery({
    queryKey: ["get-news-list"],
    queryFn: () => getNewsList(country),
  });

const useGetNewsByIdQuery = (id: string) =>
  useQuery({
    queryKey: ["get-news-by-id"],
    queryFn: () => getNewsById(id),
    enabled: !!id,
  });

const useAddNewsMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-news"],
    mutationFn: (payload: NewsModel) => addNews(payload),
    onSuccess() {
      toast.success(`add news successfully.`);
      queryClient.invalidateQueries({ queryKey: ["get-news-list"] });
      navigate("/news");
    },
    onError() {
      toast.error(`failed to add News`);
    },
  });
};

const useEditNewsMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["edit-news"],
    mutationFn: (payload: NewsModel) => editNews(payload),
    onSuccess() {
      toast.success(`edit News successfully.`);
      navigate(-1);
    },
    onError() {
      toast.error(`failed to edit News`);
    },
  });
};

const useDeleteNewsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-news"],
    mutationFn: (id: string) => {
      return deleteNews(id);
    },
    onSuccess() {
      toast.success(`delete news successfully.`);
      queryClient.invalidateQueries({ queryKey: ["get-news-list"] });
    },
    onError() {
      toast.error(`failed to delete news`);
    },
  });
};

export {
  useGetNewsListQuery,
  useDeleteNewsMutation,
  useGetNewsByIdQuery,
  useAddNewsMutation,
  useEditNewsMutation,
};
