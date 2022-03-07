import {
  // PRODUCT_LIST,
  PRODUCT_LIST_FETCHING,
  PRODUCT_LIST_SUCCESS,
} from "../constants";
import axios from "axios";

export const fetchProduct = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_FETCHING,
  });
  let response = await commonApi();

  if (response?.data?.data?.product) {
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: response.data.data.product,
    });
  }
};

export const commonApi = async () => {
  return await axios.get(
    "https://electronic-ecommerce.herokuapp.com/api/v1/product"
  );
};
