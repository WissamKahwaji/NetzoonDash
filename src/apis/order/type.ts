import { ProductModel } from "../product/type";
import { UserModel } from "../users/type";

export type OrderModel = {
  _id: string;
  userId: UserModel;
  clientId: UserModel;
  products: ProductOrderModel[];
  grandTotal: number;
  orderStatus?: string;
  shippingAddress?: string;
  mobile?: string;
  subTotal?: number;
  serviceFee?: number;
  createdAt?: string;
  pickupId?: string;
  percentageFromSeller?: number;
};

export type ProductOrderModel = {
  _id: string;
  product: ProductModel;
  amount: number;
  qty: number;
};

export enum OrderStatusEnum {
  IN_PROGRESS = "inProgress",
  SUCCESS = "success",
  FAILURE = "failure",
}
