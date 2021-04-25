import { useContext, useEffect } from "react";
import { ProductsContext } from "../providers/productsProvider";
import { OffersContext } from "../providers/offersProvider";
import * as api from "../api/api";
import Products from "../components/Products";
import ShoppingCart from "../components/ShoppingCart";

function App() {
  const { setProducts } = useContext(ProductsContext);
  const { setOffers } = useContext(OffersContext);

  useEffect(() => {
    const fetchData = async () => {
      const products = await api.requestProducts();

      setProducts(products);
    };

    fetchData();
  }, [setProducts]);

  useEffect(() => {
    const fetchData = async () => {
      const offers = await api.requestOffers();

      setOffers(offers);
    };

    fetchData();
  }, [setOffers]);

  return (
    <div>
      <h1>Grocery Store</h1>

      <div className="pure-g">
        <div className="pure-u-1 pure-u-lg-1-2">
          <Products />
        </div>

        <div className="pure-u-1 pure-u-lg-1-2">
          <ShoppingCart />
        </div>
      </div>
    </div>
  );
}

export default App;
