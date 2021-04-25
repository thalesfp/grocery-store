import { OfferType, OfferCondition, ShoppingCartProductType } from "../types";
import EqualConditionOfferStrategy from "./equalConditionOfferStrategy";
import GreaterThanInclusiveConditionOfferStrategy from "./greaterThanInclusiveConditionOfferStrategy";

class DiscountCalculator {
  private offers: OfferType[] = [];

  constructor(offers: OfferType[]) {
    this.offers = offers;
  }

  calculate(product: ShoppingCartProductType) {
    for (const offer of this.offers) {
      switch (offer.condition) {
        case OfferCondition.Equal:
          const equalConditionOfferStrategy = new EqualConditionOfferStrategy(
            offer,
            product
          );

          if (equalConditionOfferStrategy.matchRequirements()) {
            return equalConditionOfferStrategy.calculate();
          }

          break;

        case OfferCondition.GreaterThanInclusive:
          const greaterThanInclusiveConditionOfferStrategy = new GreaterThanInclusiveConditionOfferStrategy(
            offer,
            product
          );

          if (greaterThanInclusiveConditionOfferStrategy.matchRequirements()) {
            return greaterThanInclusiveConditionOfferStrategy.calculate();
          }

          break;

        default:
          throw new Error(`Invalid offer condition: ${offer.condition}`);
      }
    }
  }
}

export default DiscountCalculator;
