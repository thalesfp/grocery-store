import { useContext } from "react";
import { ProductsContext } from "../providers/productsProvider";
import { ShoppingCartContext } from "../providers/shoppingCartProvider";
import { ProductType, ShoppingCartActionTypes } from "../types";
import Product from "./Product";

function Products() {
  const { products } = useContext(ProductsContext);
  const { dispatch } = useContext(ShoppingCartContext);

  function onAddProduct(product: ProductType, quantity: number) {
    dispatch({
      type: ShoppingCartActionTypes.add,
      payload: {
        product,
        quantity,
      },
    });
  }

  return (
    <div className="products">
      <h2>Products</h2>

      <div className="pure-g">
        {products.map((product) => (
          <Product
            key={product.name}
            product={product}
            onAddProduct={onAddProduct}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
