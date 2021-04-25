import { useContext } from "react";
import { ProductsContext } from "../providers/productsProvider";
import Product from "./Product";

function Products() {
  const { products } = useContext(ProductsContext);

  return (
    <div className="products">
      <h2>Products</h2>

      <div className="pure-g">
        {products.map((product) => (
          <Product key={product.name} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
