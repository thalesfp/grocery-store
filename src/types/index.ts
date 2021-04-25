export interface ProductType {
  name: string;
  price: number;
}

export interface ShoppingCartProductType extends ProductType {
  quantity: number;
}

export enum OfferCondition {
  Equal = "Equal",
  GreaterThanInclusive = "GreaterThanInclusive",
}

export interface OfferType {
  productName: string;
  quantity: number;
  condition: OfferCondition;
  discount: number;
}

export type ShoppingCartState = {
  products: ShoppingCartProductType[];
};

export enum ShoppingCartActionTypes {
  add = "ADD_PRODUCT",
  remove = "REMOVE_PRODUCT",
}

export type ShoppingCartActions =
  | {
      type: ShoppingCartActionTypes.add;
      payload: {
        product: ProductType;
        quantity: number;
      };
    }
  | {
      type: ShoppingCartActionTypes.remove;
      payload: {
        product: ProductType;
      };
    };
