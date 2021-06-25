import React, { useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import "./ProductListing.css"
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/actions/productsActions";
import ProductComponent from "../product/ProductComponent";

const ProductPage = () => {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    const response = await axios
      .get("http://localhost:3333/products",{
        params: {
          _limit: 4
        }
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(setProducts(response.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log("Products :", products);
  return (

    <div className="home">
      <h1 className="home--title">
          Veja eventos próximos
      </h1>
      <p className="home--text">
         “Compartilhe com a comunidade e participe de eventos que iram estrear”
      </p>
      <div className="home__products">
        <ProductComponent />
      </div>
    </div>
  );
};

export default ProductPage;
