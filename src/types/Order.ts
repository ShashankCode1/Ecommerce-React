import { Cart as CartInterface } from "./Cart";
import { Address } from "./User";

export interface Order {
  orderId: string;
  cartItems: CartInterface[];
  totalCartQuantity: number;
  totalCartPrice: number;
  shippingInfo: ShippingInfo;
}

export interface ShippingInfo {
  userId: string;
  userName: string;
  email: string;
  phoneNo: string;
  shippingAddress: Address;
}
