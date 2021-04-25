import {
  OfferType,
  OfferCondition,
  ProductType,
  ShoppingCartProductType,
} from "../../types";
import EqualConditionOfferStrategy from "../equalConditionOfferStrategy";

describe("EqualConditionOfferStrategy", () => {
  const grape: ProductType = {
    name: "grape",
    price: 5,
  };

  const validShoppingCartProduct: ShoppingCartProductType = {
    ...grape,
    quantity: 2,
  };

  const invalidShoppingCartProduct: ShoppingCartProductType = {
    ...grape,
    quantity: 1,
  };

  const offer: OfferType = {
    condition: OfferCondition.Equal,
    quantity: 2,
    productName: grape.name,
    discount: 0.5,
  };

  describe("matchRequirements", () => {
    it("should return false for a product that doesn't match requirements", () => {
      const equalConditionOfferStrategy = new EqualConditionOfferStrategy(
        offer,
        invalidShoppingCartProduct
      );

      expect(equalConditionOfferStrategy.matchRequirements()).toBe(false);
    });

    it("should return true for a product that matches requirements", () => {
      const equalConditionOfferStrategy = new EqualConditionOfferStrategy(
        offer,
        validShoppingCartProduct
      );

      expect(equalConditionOfferStrategy.matchRequirements()).toBe(true);
    });
  });

  describe("calculate", () => {
    describe("when condition quantity is 2", () => {
      it("should return discounted price of 2 products", () => {
        const equalConditionOfferStrategy = new EqualConditionOfferStrategy(
          offer,
          validShoppingCartProduct
        );

        expect(equalConditionOfferStrategy.calculate()).toEqual(5);
      });

      it("should return discounted price of 3 products", () => {
        const equalConditionOfferStrategy = new EqualConditionOfferStrategy(
          offer,
          { ...validShoppingCartProduct, quantity: 3 }
        );

        expect(equalConditionOfferStrategy.calculate()).toEqual(10);
      });

      it("should return discounted price of 4 products", () => {
        const equalConditionOfferStrategy = new EqualConditionOfferStrategy(
          offer,
          { ...validShoppingCartProduct, quantity: 4 }
        );

        expect(equalConditionOfferStrategy.calculate()).toEqual(10);
      });
    });

    describe("when condition quantity is 3", () => {
      it("should return discounted price of 3 products", () => {
        const equalConditionOfferStrategy = new EqualConditionOfferStrategy(
          { ...offer, quantity: 3 },
          { ...validShoppingCartProduct, quantity: 3 }
        );

        expect(equalConditionOfferStrategy.calculate()).toEqual(7.5);
      });

      it("should return discounted price of 4 products", () => {
        const equalConditionOfferStrategy = new EqualConditionOfferStrategy(
          { ...offer, quantity: 3 },
          { ...validShoppingCartProduct, quantity: 4 }
        );

        expect(equalConditionOfferStrategy.calculate()).toEqual(12.5);
      });

      it("should return discounted price of 6 products", () => {
        const equalConditionOfferStrategy = new EqualConditionOfferStrategy(
          { ...offer, quantity: 3 },
          { ...validShoppingCartProduct, quantity: 6 }
        );

        expect(equalConditionOfferStrategy.calculate()).toEqual(15);
      });
    });
  });
});
