import {
  ProductType,
  ShoppingCartActions,
  ShoppingCartActionTypes,
} from "../../types";
import shoppingCartReducer from "../shoppingCartReducer";

describe("shoppingCartReducer", () => {
  const apple: ProductType = {
    name: "apple",
    price: 3,
  };

  const grape: ProductType = {
    name: "grape",
    price: 5,
  };

  describe("add", () => {
    it("should add a new product", () => {
      const state = { products: [{ ...grape, quantity: 1 }] };

      const action: ShoppingCartActions = {
        type: ShoppingCartActionTypes.add,
        payload: { product: apple, quantity: 1 },
      };

      const result = shoppingCartReducer(state, action);

      expect(result).toEqual({
        products: [
          { ...grape, quantity: 1 },
          { ...apple, quantity: 1 },
        ],
      });
    });

    it("should increment an existing product quantity", () => {
      const state = { products: [{ ...apple, quantity: 1 }] };

      const action: ShoppingCartActions = {
        type: ShoppingCartActionTypes.add,
        payload: { product: apple, quantity: 1 },
      };

      const result = shoppingCartReducer(state, action);

      expect(result).toEqual({ products: [{ ...apple, quantity: 2 }] });
    });
  });

  describe("remove", () => {
    it("should decrease an existing product quantity", () => {
      const state = { products: [{ ...apple, quantity: 1 }] };

      const action: ShoppingCartActions = {
        type: ShoppingCartActionTypes.remove,
        payload: { product: apple },
      };

      const result = shoppingCartReducer(state, action);

      expect(result).toEqual({ products: [{ ...apple, quantity: 0 }] });
    });

    it("should remove a product with quantity equals to 0", () => {
      const state = { products: [{ ...apple, quantity: 0 }] };

      const action: ShoppingCartActions = {
        type: ShoppingCartActionTypes.remove,
        payload: { product: apple },
      };

      const result = shoppingCartReducer(state, action);

      expect(result).toEqual({ products: [] });
    });
  });
});
