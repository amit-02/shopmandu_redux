import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Product.css";
import convertDollarToNpr from "../utilities/convertDollarToNpr";

const Product = (props) => {
  const url = `https://electronic-ecommerce.herokuapp.com/api/v1/product`;

  const [products, setProducts] = useState({
    loading: false,
    data: [],
    error: false,
  });
  useEffect(() => {
    setProducts({
      loading: true,
      data: [],
      error: false,
    });
    axios
      .get(url)
      .then((response) => {
        setProducts({
          loading: false,
          data: response.data.data.product,
          error: false,
        });
      })
      .catch(() => {
        setProducts({
          loading: false,
          data: [],
          error: true,
        });
      });
  }, [url]);
  let content = null;

  if (products.error) {
    content = <p>there was error</p>;
  }

  //   if (products.loading) {
  //     content = <Loader></Loader>;
  //   }
  if (products.data) {
    // console.log(products.data);
    content = (
      <div>
        <h1>{products.data.name}</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="product-header">
        <h3>Products</h3>
        <button className=" product-filter-button">Filter</button>
      </div>
      {console.log(products.data)}
      <div className="row">
        {products.data.map((item) => (
          <div className="col-3">
            <div className="card d-inline-block">
              <div>
                <img
                  className="product-image"
                  src={
                    "https://electronic-ecommerce.herokuapp.com/" + item.image
                  }
                  alt={item.name}
                />
              </div>
              <div className="product-name">
                <h6>{item.name}</h6>
              </div>
              <div className="product-price">
                {convertDollarToNpr(item.price)}
              </div>

              <div className="add-minus-quantity">
                <i
                  className="fas fa-minus minus"
                  aria-hidden="true"
                  onClick={() => props.handleDelete(item)}
                ></i>
                <input type="text" value={props.getCartValue(item)} />
                <i
                  className="fas fa-plus plus"
                  aria-hidden="true"
                  onClick={() => props.handleAddToCart(item)}
                ></i>
              </div>

              <div className="product-stock">
                <span>stock left: {item.stock}</span>
              </div>
              <div className="product-date">
                <span>Released on: 22-02-2022</span>
              </div>

              <div>
                <button
                  className="product-add-button"
                  onClick={() => props.handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
