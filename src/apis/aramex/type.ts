export type FetchCitiesResponseModel = {
  Cities: string[];
};

export type TrackPickupResponseModel = {
  HasErrors: boolean;
  Entity: string;
  Reference: string;
  CollectionDate: string;
  PickupDate: string;
  LastStatus: string;
  LastStatusDescription?: string;
};
