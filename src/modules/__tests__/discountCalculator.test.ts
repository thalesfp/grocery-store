import DiscountCalculator from "../discountCalculator";
import {
  ProductType,
  OfferType,
  OfferCondition,
  ShoppingCartProductType,
} from "../../types";

describe("DiscountCalculator", () => {
  describe("calculate", () => {
    const apple: ProductType = {
      name: "apple",
      price: 3,
    };

    const grape: ProductType = {
      name: "grape",
      price: 5,
    };

    const peach: ProductType = {
      name: "peach",
      price: 7,
    };

    const offer1: OfferType = {
      condition: OfferCondition.Equal,
      quantity: 2,
      productName: grape.name,
      discount: 0.5,
    };

    const offer2: OfferType = {
      condition: OfferCondition.GreaterThanInclusive,
      quantity: 2,
      productName: apple.name,
      discount: 0.2,
    };

    const calculateTotalPrice = (products: ShoppingCartProductType[]) => {
      const discountCalculator = new DiscountCalculator([offer1, offer2]);

      return products.reduce((total, product) => {
        const discount = discountCalculator.calculate(product);

        return discount
          ? total + discount
          : total + product.price * product.quantity;
      }, 0);
    };

    it("should calculate discount of 1 grape, 0 apple and 1 peach", () => {
      const total = calculateTotalPrice([
        { ...grape, quantity: 1 },
        { ...apple, quantity: 0 },
        { ...peach, quantity: 1 },
      ]);

      expect(total).toEqual(12);
    });

    it("should calculate discount of 1 grape, 1 apple and 1 peach", () => {
      const total = calculateTotalPrice([
        { ...grape, quantity: 1 },
        { ...apple, quantity: 1 },
        { ...peach, quantity: 1 },
      ]);

      expect(total).toEqual(15);
    });

    it("should calculate discount of 2 grapes, 2 apples and 1 peach", () => {
      const total = calculateTotalPrice([
        { ...grape, quantity: 2 },
        { ...apple, quantity: 2 },
        { ...peach, quantity: 1 },
      ]);

      expect(total).toEqual(16.8);
    });

    it("should calculate discount of 3 grapes, 5 apples and 2 peaches", () => {
      const total = calculateTotalPrice([
        { ...grape, quantity: 3 },
        { ...apple, quantity: 5 },
        { ...peach, quantity: 2 },
      ]);

      expect(total).toEqual(36);
    });

    it("should calculate discount of 7 grapes, 7 apples and 7 peaches", () => {
      const total = calculateTotalPrice([
        { ...grape, quantity: 7 },
        { ...apple, quantity: 7 },
        { ...peach, quantity: 7 },
      ]);

      expect(total).toEqual(85.8);
    });
  });
});
