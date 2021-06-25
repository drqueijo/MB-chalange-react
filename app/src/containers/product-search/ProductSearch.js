import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductSearch.css"
import { Link } from "react-router-dom";

const ProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3333/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="search">
      <h1 className="search--text">
        Eventos que combinam com você
      </h1>
      <div className="search--input">
        <div className="ui icon input">
          <input
              type="text"
              placeholder="Procure eventos"
              onChange={(e) => setSearch(e.target.value)}
          />
          <i className="circular search link icon"></i>
        </div>
      </div>
      <div className="search__container">
        {filteredProducts.map((product, id) => (
          <ProductDetail key={id} {...product} />
        ))}
      </div>
    </div>
  );
}

const ProductDetail = (props) => {
  const { id, name } = props;

  return (
    <>
      <div className="product" key={id}>
        <Link to={`/products/${id}`}>
          <div className="ui link cards">
            <div className="card">
              <div className="image">
                <img src={`https://picsum.photos/id/${id}/200/`} alt="banner" />
              </div>
              <div className="product__content">
                <div className="product__content--title">{name}</div>
                <div className="product__content--label">Veja mais...</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductSearch;
