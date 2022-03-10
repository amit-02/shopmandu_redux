import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  const productItems = useSelector((state) => {
    return state.product.productItems;
  });

  return (
    <div className="container p-5">
      <div className="product-detail">
        <div className="product-image">
          <img src={`https://electronic-ecommerce.herokuapp.com/${id}`} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
