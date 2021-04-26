import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductsContext } from "../../providers/productsProvider";
import { ShoppingCartContext } from "../../providers/shoppingCartProvider";
import { ShoppingCartActionTypes } from "../../types";
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

  describe("onAddProduct", () => {
    it("dispatches an event to add a new product to the shopping cart context", () => {
      userEvent.click(screen.getAllByText("Add Product")[0]);

      expect(shoppingCartContext.dispatch).toHaveBeenCalledWith({
        type: ShoppingCartActionTypes.add,
        payload: { product: apple, quantity: 1 },
      });
    });
  });
});
