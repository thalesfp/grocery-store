import { render, screen } from "@testing-library/react";
import { ProductsContext } from "../../providers/productsProvider";
import { ShoppingCartContext } from "../../providers/shoppingCartProvider";
import Products from "../Products";

describe("<Products />", () => {
  const apple = { name: "apple", price: 5 };
  const grape = { name: "grape", price: 7 };

  const productsContext = {
    products: [apple, grape],
    setProducts: () => {},
  };

  const shoppingCartContext = {
    dispatch: jest.fn(),
    state: {
      products: [],
    },
  };

  beforeEach(() => {
    render(
      <ProductsContext.Provider value={productsContext}>
        <ShoppingCartContext.Provider value={shoppingCartContext}>
          <Products />
        </ShoppingCartContext.Provider>
      </ProductsContext.Provider>
    );
  });

  it("renders a list of products", () => {
    expect(screen.getByText("apple")).toBeInTheDocument();
    expect(screen.getByText("grape")).toBeInTheDocument();
  });
});
