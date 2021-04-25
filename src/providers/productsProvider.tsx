import { createContext, useState } from "react";
import { ProductType } from "../types";

type Props = {
  children?: React.ReactNode;
};

type State = {
  products: ProductType[];
  setProducts: (products: ProductType[]) => void;
};

const initialState: State = {
  products: [],
  setProducts: () => {},
};

export const ProductsContext = createContext<State>(initialState);

export const ProductsProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<ProductType[]>([]);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
