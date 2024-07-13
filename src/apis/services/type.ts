import { UserModel } from "../users/type";

export type ServiceCategoryModel = {
  _id?: string;
  title: string;
};

export type ServicesResponseModel = {
  _id: string;
  title: string;
  services: ServiceModel[];
};

export type ServiceModel = {
  _id?: string;
  title: string;
  description: string;
  owner: UserModel;
  imageUrl?: string;
  serviceImageList?: string[];
  averageRating?: number;
  totalRatings?: number;
  whatsAppNumber?: string;
  price?: number;
  bio?: string;
  country?: string;
};

export type ServiceInputModel = {
  _id?: string;
  title?: string | undefined;
  description?: string | undefined;
  price?: number | undefined;
  bio?: string | undefined;
  owner?: string | undefined;
  whatsAppNumber?: string | undefined;
  country?: string | undefined;
  category?: string | undefined;
  serviceImageList?: File[];
};
