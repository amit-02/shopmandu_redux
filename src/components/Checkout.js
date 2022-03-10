import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./Checkout.css";

const initialValues = {
  name: "",
  location: "",
  phone: "",
  email: "",
};

const onSubmit = (values) => {
  console.log(values);
};

const validationSchema = Yup.object({
  name: Yup.string().required("!!!!!!Name Required!!!!!!"),
  location: Yup.string().required("!!!!!!Location  required !!!!!!"),
  credit: Yup.string("Enter valid number")
    .required("!!!!!!Card Number required!!!!!!")
    .min(12, "Not Matched"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("!!!!!!Email is required field!!!!!!"),
});

const Checkout = () => {
  const { values, touched, errors, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema,
    });

  let navigate = useNavigate();

  return (
    <>
      <div className="col-md-7">
        <h3 className="checkout-title">Checkout Here </h3>
        <h6 className="py-2">Basic Details</h6>
        <form className="p-3" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              <i class="fa fa-user"></i>Name
            </label>

            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Full Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {touched.name && errors.name && (
            <div style={{ color: "red" }}>{errors.name}</div>
          )}

          <div className="form-group">
            <label htmlFor="location">
              <i class="fa fa-address-card" aria-hidden="true"></i>Address
            </label>
            <input
              type="text"
              className="form-control"
              name="location"
              placeholder="Complete Address State/Zip"
              value={values.location}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {touched.location && errors.location && (
            <div style={{ color: "red" }}>{errors.location}</div>
          )}

          <div className="form-group">
            <label htmlFor="phone">
              <i class="fa fa-credit-card" aria-hidden="true"></i>Credit Card
              Number
            </label>
            <input
              type="text"
              className="form-control"
              name="credit"
              placeholder="111-222-333-444"
              value={values.credit}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {touched.credit && errors.credit && (
            <div style={{ color: "red" }}>{errors.credit}</div>
          )}

          <div className="form-group ">
            <label htmlFor="email">
              <i class="fa fa-envelope-open" aria-hidden="true"></i>Email
              Address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter your email here"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {touched.email && errors.email && (
            <div style={{ color: "red" }}>{errors.email}</div>
          )}

          <button
            type="submit"
            className="btn btn-success"
            onClick={() => {
              navigate("/");
            }}
          >
            Continue To Checkout
          </button>
        </form>
      </div>
    </>
  );
};

export default Checkout;
