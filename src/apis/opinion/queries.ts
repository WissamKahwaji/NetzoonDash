import { useQuery } from "@tanstack/react-query";
import { getOpinionsInfo } from ".";

const useGetOpinionsInfoQuery = () =>
  useQuery({
    queryKey: ["get-opinions"],
    queryFn: () => getOpinionsInfo(),
  });

export { useGetOpinionsInfoQuery };
