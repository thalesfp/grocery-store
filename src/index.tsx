import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App";
import { ProductsProvider } from "./providers/productsProvider";
import { OffersProvider } from "./providers/offersProvider";
import { ShoppingCartProvider } from "./providers/shoppingCartProvider";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <ShoppingCartProvider>
      <ProductsProvider>
        <OffersProvider>
          <App />
        </OffersProvider>
      </ProductsProvider>
    </ShoppingCartProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
