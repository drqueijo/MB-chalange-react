import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  removeSelectedProduct,
} from "../../redux/actions/productsActions";
import "./ProductDetails.css"
import PaypalComponent from "../paypal/PaypalComponent.js"

const ProductDetails = () => {
  const { productId } = useParams();
  let product = useSelector((state) => state.product);
  const { id, name, description, cost} = product;
  const dispatch = useDispatch();
  const fetchProductDetail = async (id) => {
    const response = await axios
      .get(`http://localhost:3333/products/${id}`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(selectedProduct(response.data));
  };

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);

  let logged = false;
  
  if (localStorage.getItem('user-info')) {
      logged = true;
  }

  return (
    <div className="product-details">
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="product-details__container">
          <div className="product-details__container__left">
            <div className="product-details__container__left--title">
              <h1>{name}</h1>
            </div>
            <div className="product-details__container__left--desc">
              <p>{description}</p>
            </div>
            <div className="product-details__container__left--btn">
              
              {logged === true ? (
                <PaypalComponent/>
              ):(
                <Link to="/login">
                  <button className="ui button">
                    <i className="sign in alternate icon"></i>
                    Login to buy
                  </button>
                </Link>
              )}
            </div>
          </div>
          <div className="product-details__container__right">
              <img src={`https://picsum.photos/id/${id}/700/600`} alt={name}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
