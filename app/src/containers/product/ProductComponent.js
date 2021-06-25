import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProductComponent.css"

const ProductComponent = (props) => {
  const products = useSelector((state) => state.allProducts.products);
  const renderList = products.map((product) => {
    const { id, name, cost  } = product;
    const {key2} = props;

    return (
      <div className="product" key={id}>
        <Link to={`/products/${id}`}>
          <div className="ui link cards">
            <div className="card">
              <div className="image">
                <img src={`https://picsum.photos/id/${id}/200/`} alt="banner" />
              </div>
              <div className="product__content">
                <div className="product__content--title">{name}</div>
                <div className="product__content--label">valor: R${cost}</div>
                <div className="product__content--label">Veja mais... {key2}</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  });
  return <>{renderList}</>;
};

export default ProductComponent;
