import { useQuery } from "@tanstack/react-query";
import { getAramexCities, trackPickUp } from ".";

const useGetAramexCitiesQuery = (country: string) =>
  useQuery({
    queryKey: ["get-aramex-cities"],
    queryFn: () => getAramexCities(country),
  });

const useTrackPickUpQuery = (pickupId: string) =>
  useQuery({
    queryKey: ["track-pickup"],
    queryFn: () => trackPickUp(pickupId),
  });

export { useGetAramexCitiesQuery, useTrackPickUpQuery };
