import { useQuery } from "@tanstack/react-query";
import { getRequestsInfo } from ".";

const useGetRequestsInfoQuery = () =>
  useQuery({
    queryKey: ["get-requests"],
    queryFn: () => getRequestsInfo(),
  });

export { useGetRequestsInfoQuery };
