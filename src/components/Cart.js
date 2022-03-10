import { useState } from "react";
import React from "react";
import { Modal, Button } from "react-bootstrap";
import Product from "../Views/Product";
import "./Cart.css";
import convertDollarToNpr from "../utilities/convertDollarToNpr";
import { useSelector } from "react-redux";
import Checkout from "./Checkout";
import { useNavigate } from "react-router-dom";

const Cart = (props) => {
  const cartItem = useSelector((state) => {
    return state.cart.cartItems;
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let navigate = useNavigate();

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Items added</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-group">
            {cartItem.map((item) => (
              <li className="list-group-item">
                <div className="cart-item">
                  <div className="cart-item-left">
                    <img
                      src={
                        "https://electronic-ecommerce.herokuapp.com/" +
                        item.image
                      }
                    />
                    <div>
                      <h6>{item.name}</h6>
                      <p>{convertDollarToNpr(item.price)}</p>
                    </div>
                  </div>

                  <div className="cart-item-right">
                    <p> item:{item.quantity}</p>
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
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <div className="total-amount">
            <p>Total Amount:</p>

            <Button
              variant="primary"
              onClick={() => {
                navigate("/checkout");
              }}
            >
              Checkout
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
