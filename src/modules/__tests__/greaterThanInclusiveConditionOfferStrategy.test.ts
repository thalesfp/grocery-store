import {
  ProductType,
  OfferType,
  OfferCondition,
  ShoppingCartProductType,
} from "../../types";
import GreaterThanInclusiveConditionOfferStrategy from "../greaterThanInclusiveConditionOfferStrategy";

describe("GreaterThanInclusiveConditionOfferStrategy", () => {
  const apple: ProductType = {
    name: "apple",
    price: 3,
  };

  const validShoppingCartProduct: ShoppingCartProductType = {
    ...apple,
    quantity: 2,
  };

  const invalidShoppingCartProduct: ShoppingCartProductType = {
    ...apple,
    quantity: 1,
  };

  const offer: OfferType = {
    condition: OfferCondition.GreaterThanInclusive,
    quantity: 2,
    productName: apple.name,
    discount: 0.2,
  };

  describe("matchRequirements", () => {
    it("should return false for a product that doesn't match requirements", () => {
      const greaterThanInclusiveConditionOfferStrategy = new GreaterThanInclusiveConditionOfferStrategy(
        offer,
        invalidShoppingCartProduct
      );

      expect(
        greaterThanInclusiveConditionOfferStrategy.matchRequirements()
      ).toBe(false);
    });

    it("should return true for a product that matches requirements", () => {
      const greaterThanInclusiveConditionOfferStrategy = new GreaterThanInclusiveConditionOfferStrategy(
        offer,
        validShoppingCartProduct
      );

      expect(
        greaterThanInclusiveConditionOfferStrategy.matchRequirements()
      ).toBe(true);
    });
  });

  describe("calculate", () => {
    it("should return discounted price of 2 products", () => {
      const greaterThanInclusiveConditionOfferStrategy = new GreaterThanInclusiveConditionOfferStrategy(
        offer,
        validShoppingCartProduct
      );

      expect(greaterThanInclusiveConditionOfferStrategy.calculate()).toBe(4.8);
    });

    it("should return discounted price of 3 products", () => {
      const greaterThanInclusiveConditionOfferStrategy = new GreaterThanInclusiveConditionOfferStrategy(
        offer,
        { ...validShoppingCartProduct, quantity: 3 }
      );

      expect(greaterThanInclusiveConditionOfferStrategy.calculate()).toBe(7.2);
    });

    it("should return discounted price of 10 products", () => {
      const greaterThanInclusiveConditionOfferStrategy = new GreaterThanInclusiveConditionOfferStrategy(
        offer,
        { ...validShoppingCartProduct, quantity: 10 }
      );

      expect(greaterThanInclusiveConditionOfferStrategy.calculate()).toBe(24);
    });
  });
});
