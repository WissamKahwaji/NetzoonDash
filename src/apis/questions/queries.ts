import { useQuery } from "@tanstack/react-query";
import { getQuestionsInfo } from ".";

const useGetQuestionsInfoQuery = () =>
  useQuery({
    queryKey: ["get-questions"],
    queryFn: () => getQuestionsInfo(),
  });

export { useGetQuestionsInfoQuery };
