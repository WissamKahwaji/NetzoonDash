import { UserModel } from "../users/type";

export type AdsModel = {
  _id?: string;
  owner?: UserModel;
  purchasable?: boolean;
  advertisingTitle?: string;
  advertisingStartDate?: string;
  advertisingEndDate?: string;
  advertisingDescription?: string;
  advertisingImage?: string;
  type?: string;
  category?: string;
  color?: string;
  guarantee?: boolean;
  contactNumber?: string;
  advertisingYear?: string;
  advertisingLocation?: string;
  advertisingPrice?: number;
  advertisingType?: string;
  forPurchase?: boolean;
  country?: string;
  cost?: number;
};

export type AdsInputModel = {
  _id?: string;
  owner?: string;
  purchasable?: boolean;
  advertisingTitle?: string;
  advertisingStartDate?: string;
  advertisingEndDate?: string;
  advertisingDescription?: string;
  type?: string;
  category?: string;
  color?: string;
  guarantee?: boolean;
  contactNumber?: string;
  advertisingYear?: string;
  advertisingLocation?: string;
  advertisingPrice?: number;
  advertisingType?: string;
  forPurchase?: boolean;
  advertisingImageList?: File[];
  country?: string;
};

export enum advertisingType {
  COMPANY = "company",
  CAR = "car",
  PLANES = "planes",
  REAL_ESTATE = "real_estate",
  PRODUCT = "product",
  SERVICE = "service",
  SEA_COMPANIES = "sea_companies",
  DELIVERY_SERVICE = "delivery_service",
  USER = "user",
}

export type AdsReponseMode = {
  message?: string;
  results?: AdsModel[];
};
