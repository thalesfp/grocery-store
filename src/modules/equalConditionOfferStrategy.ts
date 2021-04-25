import { OfferType, ShoppingCartProductType } from "../types";
import ConditionOfferStrategy from "./conditionOfferStrategy";

class EqualConditionOfferStrategy implements ConditionOfferStrategy {
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
    const itemsWithoutDiscount = this.product.quantity % this.offer.quantity;
    const itemsWithDiscount = this.product.quantity - itemsWithoutDiscount;

    const totalPriceItemsWithoutDiscount =
      this.product.price * itemsWithoutDiscount;

    const totalPriceItemsWithDiscount =
      this.product.price * itemsWithDiscount -
      this.product.price * itemsWithDiscount * this.offer.discount;

    return totalPriceItemsWithDiscount + totalPriceItemsWithoutDiscount;
  }
}

export default EqualConditionOfferStrategy;
