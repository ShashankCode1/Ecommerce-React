import { Product as ProductInterface } from "./Product";

export interface Cart {
  product: ProductInterface;
  quantity: number;
}
