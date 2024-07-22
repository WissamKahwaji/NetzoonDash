import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { FetchCitiesResponseModel, TrackPickupResponseModel } from "./type";

const getAramexCities = async (country: string) => {
  const res = await publicInstance.post<FetchCitiesResponseModel>(
    API_ROUTES.ARAMEX.FETCH_CITIES(country)
  );
  return res.data;
};

const trackPickUp = async (pickupId: string) => {
  const res = await publicInstance.post<TrackPickupResponseModel>(
    API_ROUTES.ARAMEX.TRACK_PICKUP(pickupId)
  );
  return res.data;
};

export { getAramexCities, trackPickUp };
