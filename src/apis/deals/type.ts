import { UserModel } from "../users/type";

export type DealsCategoryModel = {
  _id?: string;
  name: string;
};

export type DealsItemModel = {
  _id?: string;
  owner?: UserModel;
  name?: string;
  imgUrl?: string;
  companyName?: string;
  prevPrice?: number;
  currentPrice?: number;
  startDate?: Date;
  endDate?: Date;
  location?: string;
  category?: string;
  country: string;
  description: string;
};
