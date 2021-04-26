import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Product from "../Product";

describe("<Product />", () => {
  const apple = { name: "apple", price: 5 };

  const onAddProduct = jest.fn();

  beforeEach(() => {
    render(<Product product={apple} onAddProduct={onAddProduct} />);
  });

  it("renders formatted product price", () => {
    expect(screen.getByText("$5.00")).toBeInTheDocument();
  });

  it("dispatchs add product event", () => {
    userEvent.click(screen.getByText("Add Product"));

    expect(onAddProduct).toHaveBeenCalledWith(apple, 1);
  });

  describe("when increasing quantity of product", () => {
    it("dispatchs add product event with updated quantity", () => {
      fireEvent.change(screen.getByLabelText("Quantity"), {
        target: { value: 2 },
      });

      userEvent.click(screen.getByText("Add Product"));

      expect(onAddProduct).toHaveBeenCalledWith(apple, 2);
    });
  });
});
