import { OfferType, ProductType, OfferCondition } from "../types";
import offers from "./offers.json";
import products from "./products.json";

const FAKE_TIMEOUT = 200;

function stringToOfferCondition(offerConditionString: string): OfferCondition {
  switch (offerConditionString) {
    case "Equal":
      return OfferCondition.Equal;
    case "GreaterThanInclusive":
      return OfferCondition.GreaterThanInclusive;
    default:
      throw new Error(`Invalid offer condition: ${offerConditionString}`);
  }
}

export async function requestOffers(): Promise<OfferType[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        offers.map((offer) => ({
          ...offer,
          condition: stringToOfferCondition(offer.condition),
        }))
      );
    }, FAKE_TIMEOUT);
  });
}

export async function requestProducts(): Promise<ProductType[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, FAKE_TIMEOUT);
  });
}
