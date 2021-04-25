import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ShoppingCartContext } from "../../providers/shoppingCartProvider";
import { ShoppingCartActionTypes } from "../../types";
import Product from "../Product";

describe("<Product />", () => {
  const apple = { name: "apple", price: 5 };

  const shoppingCartContext = {
    dispatch: jest.fn(),
    state: {
      products: [],
    },
  };

  beforeEach(() => {
    render(
      <ShoppingCartContext.Provider value={shoppingCartContext}>
        <Product product={apple} />
      </ShoppingCartContext.Provider>
    );
  });

  it("renders formatted product price", () => {
    expect(screen.getByText("$5.00")).toBeInTheDocument();
  });

  it("dispatchs add product event", () => {
    userEvent.click(screen.getByText("Add Product"));

    expect(shoppingCartContext.dispatch).toHaveBeenCalledWith({
      type: ShoppingCartActionTypes.add,
      payload: { product: apple, quantity: 1 },
    });
  });

  describe("when increasing quantity of product", () => {
    it("dispatchs add product event with updated quantity", () => {
      fireEvent.change(screen.getByLabelText("Quantity"), {
        target: { value: 2 },
      });

      userEvent.click(screen.getByText("Add Product"));

      expect(shoppingCartContext.dispatch).toHaveBeenCalledWith({
        type: ShoppingCartActionTypes.add,
        payload: { product: apple, quantity: 2 },
      });
    });
  });
});
