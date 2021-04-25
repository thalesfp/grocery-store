import {
  ShoppingCartActionTypes,
  ShoppingCartActions,
  ShoppingCartState,
} from "../types";

const shoppingCartReducer = (
  state: ShoppingCartState,
  action: ShoppingCartActions
): ShoppingCartState => {
  const existingProduct = state.products.find(
    (product) => product.name === action.payload.product.name
  );

  switch (action.type) {
    case ShoppingCartActionTypes.add:
      if (existingProduct) {
        return {
          ...state,
          products: [
            ...state.products.filter((product) => product !== existingProduct),
            {
              ...existingProduct,
              quantity: existingProduct.quantity + action.payload.quantity,
            },
          ],
        };
      } else {
        return {
          ...state,
          products: [
            ...state.products,
            {
              ...action.payload.product,
              quantity: action.payload.quantity,
            },
          ],
        };
      }

    case ShoppingCartActionTypes.remove:
      if (existingProduct && existingProduct.quantity > 0) {
        return {
          ...state,
          products: [
            ...state.products.filter((product) => product !== existingProduct),
            {
              ...existingProduct,
              quantity: existingProduct.quantity - 1,
            },
          ],
        };
      } else {
        return {
          ...state,
          products: [
            ...state.products.filter((product) => product !== existingProduct),
          ],
        };
      }
  }
};

export default shoppingCartReducer;
