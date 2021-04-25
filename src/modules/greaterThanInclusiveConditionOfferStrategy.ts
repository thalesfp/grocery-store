import { OfferType, ShoppingCartProductType } from "../types";
import ConditionOfferStrategy from "./conditionOfferStrategy";

class GreaterThanInclusiveConditionOfferStrategy
  implements ConditionOfferStrategy {
  private offer;
  private product;

  constructor(offer: OfferType, product: ShoppingCartProductType) {
    this.offer = offer;
    this.product = product;
  }

  matchRequirements() {
    return (
      this.offer.productName === this.product.name &&
      this.product.quantity >= this.offer.quantity
    );
  }

  calculate() {
    const totalPrice = this.product.price * this.product.quantity;

    return totalPrice - totalPrice * this.offer.discount;
  }
}

export default GreaterThanInclusiveConditionOfferStrategy;
