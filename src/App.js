import "./App.css";
import Header from "./components/Header";
import Product from "./Views/Product";
import { useEffect, useState } from "react";
// import store from "./redux/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "./redux/actions/products";
import { setCartItem } from "./redux/actions/cartItem";

function App() {
  // const [cartItem, setCartItem] = useState([]);
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => {
    return state.cart.cartItems;
  });

  const handleAddToCart = (product) => {
    if (cartItem.some((item) => item.id === product.id)) {
      //increase quantity
      const newItem = cartItem.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      dispatch(setCartItem(newItem));
    } else {
      //new push
      dispatch(setCartItem([...cartItem, { ...product, quantity: 1 }]));
    }
  };

  const handleDelete = (product) => {
    const findObject = cartItem.find((item) => item.id === product.id);

    if (findObject) {
      if (findObject.quantity > 1) {
        const newItem = cartItem.map((item) => {
          if (item.id === findObject.id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
        dispatch(setCartItem(newItem));
      } else {
        const newCartArray = cartItem.filter((item) => item.id !== product.id);
        dispatch(setCartItem(newCartArray));
      }
    }
  };

  //number of quantity
  const getCartValue = (product) => {
    const cartQuantity = cartItem.find((item) => item.id === product.id);
    return cartQuantity?.quantity || 0;
  };

  // const getTotalAmount = (price) => {};

  useEffect(() => {
    dispatch(fetchProduct());
  }, []);

  return (
    <>
      {/* <Provider store={store}> */}
      <div className="App">
        <Header
          // cartItem={cartItem}
          getCartValue={getCartValue}
          handleAddToCart={handleAddToCart}
          handleDelete={handleDelete}
        />
        <Product
          handleAddToCart={handleAddToCart}
          handleDelete={handleDelete}
          cartItem={cartItem}
          getCartValue={getCartValue}
        />
      </div>
      {/* </Provider> */}
    </>
  );
}

export default App;
