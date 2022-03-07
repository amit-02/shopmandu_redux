import { CART_ITEM } from "../constants";

export const setCartItem = (items) => {
  return {
    type: CART_ITEM,
    payload: items,
  };
};
