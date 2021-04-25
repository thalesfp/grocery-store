import { createContext, Dispatch, useReducer } from "react";
import shoppingCartReducer from "../reducers/shoppingCartReducer";
import { ShoppingCartActions, ShoppingCartState } from "../types";

type Props = {
  children?: React.ReactNode;
};

const initialState: ShoppingCartState = {
  products: [],
};

export const ShoppingCartContext = createContext<{
  state: ShoppingCartState;
  dispatch: Dispatch<ShoppingCartActions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const ShoppingCartProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(shoppingCartReducer, initialState);

  return (
    <ShoppingCartContext.Provider value={{ state, dispatch }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
