const convertDollarToNpr = (price) => {
  const getNumber = Number(price?.replace("$", "") || 0);

  return "Rs. " + getNumber * 118;
};

export default convertDollarToNpr;
