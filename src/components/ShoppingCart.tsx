import { useContext, useMemo } from "react";
import DiscountCalculator from "../modules/discountCalculator";
import { OffersContext } from "../providers/offersProvider";
import { ShoppingCartContext } from "../providers/shoppingCartProvider";
import {
  ProductType,
  ShoppingCartActionTypes,
  ShoppingCartProductType,
} from "../types";
import "./ShoppingCard.css";

interface ProductWithPriceType extends ShoppingCartProductType {
  totalPrice: number;
  priceWithDiscount: number | undefined;
}

function ShoppingCart() {
  const { state, dispatch } = useContext(ShoppingCartContext);
  const { offers } = useContext(OffersContext);
  const { products } = state;

  const removeProduct = (product: ProductType) =>
    dispatch({
      type: ShoppingCartActionTypes.remove,
      payload: { product },
    });

  const formattedPrice = (price = 0) =>
    new Intl.NumberFormat("en", {
      style: "currency",
      currency: "USD",
    }).format(price);

  const normalizedProducts: {
    products: ProductWithPriceType[];
    totalPrice: number;
    priceWithDiscount: number;
  } = useMemo(() => {
    const discountCalculator = new DiscountCalculator(offers);

    const productsWithPrice = products
      .sort((productA, productB) => (productA.name > productB.name ? 1 : -1))
      .map((product) => ({
        ...product,
        totalPrice: product.price * product.quantity,
        priceWithDiscount: discountCalculator.calculate(product),
      }));

    const priceWithDiscount = productsWithPrice.reduce((total, product) => {
      const discountPrice = discountCalculator.calculate(product);

      return discountPrice
        ? total + discountPrice
        : total + product.price * product.quantity;
    }, 0);

    const totalPrice = productsWithPrice.reduce(
      (total, product) => (total += product.price * product.quantity),
      0
    );

    return {
      products: productsWithPrice,
      priceWithDiscount,
      totalPrice,
    };
  }, [offers, products]);

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>

      {normalizedProducts.products.length > 0 ? (
        <div>
          <table className="pure-table pure-table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Price</th>
                <th>Discount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {normalizedProducts.products.map((product) => (
                <tr key={product.name}>
                  <td className="product-name">{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{formattedPrice(product.price)}</td>
                  <td>{formattedPrice(product.totalPrice)}</td>
                  <td>{formattedPrice(product.priceWithDiscount)}</td>
                  <td>
                    <button
                      className="pure-button button-error"
                      onClick={() => removeProduct(product)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p>Total: {formattedPrice(normalizedProducts.totalPrice)}</p>
          <p>
            Total with discount:{" "}
            {formattedPrice(normalizedProducts.priceWithDiscount)}
          </p>
        </div>
      ) : (
        <div>Empty Cart</div>
      )}
    </div>
  );
}

export default ShoppingCart;
