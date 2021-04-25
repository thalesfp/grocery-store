import { useContext, useRef } from "react";
import { ShoppingCartContext } from "../providers/shoppingCartProvider";
import { ProductType, ShoppingCartActionTypes } from "../types";
import "./Product.css";

function Product({ product }: { product: ProductType }) {
  const { dispatch } = useContext(ShoppingCartContext);
  const quantityInput = useRef<HTMLInputElement>(null);

  const formattedPrice = (price = 0) =>
    new Intl.NumberFormat("en", {
      style: "currency",
      currency: "USD",
    }).format(price);

  function addProduct(product: ProductType) {
    const quantity = quantityInput.current?.value
      ? parseInt(quantityInput.current.value)
      : 1;

    dispatch({
      type: ShoppingCartActionTypes.add,
      payload: {
        product,
        quantity,
      },
    });
  }

  return (
    <form className="product pure-u-1-3 pure-form">
      <div className="product-info">
        <div className="product-name">{product.name}</div>
        <div className="product-price">{formattedPrice(product.price)}</div>
      </div>

      <label htmlFor="product-quantity">Quantity</label>
      <input
        id="product-quantity"
        className="product-quantity"
        type="number"
        min={1}
        defaultValue={1}
        ref={quantityInput}
      ></input>

      <button
        className="pure-button pure-button-primary"
        type="button"
        onClick={() => addProduct(product)}
      >
        Add Product
      </button>
    </form>
  );
}

export default Product;
