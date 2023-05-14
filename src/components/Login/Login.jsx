/* eslint-disable jsx-a11y/alt-text */
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Login, token, isLoding, notLoding, UserDetails } from "../../Resux/RegisterSlice";
import photo from "../Media/register-login-banner.d5751ff804c935b205d3.jpg";
import logo from "../Media/logo.548dc5719c2345c22eef.png";

export default function LoginUser() {
  let { loginLoding } = useSelector((state) => state.Register);
  const [error, seterror] = useState("");
  let dispatch = useDispatch();
  let navget = useNavigate();
  async function SendDatalogin(value) {
    dispatch(isLoding());
    let respons = await dispatch(Login(value)).catch((e) => {
      dispatch(notLoding());
      seterror(
        `${e.response.payload.data.errors.param} :${e.response.payload.data.errors.msg}`
      );
    });
    if (respons.payload.data.message === "success") {
      localStorage.setItem("gametoken", respons.payload.data.token);
      navget("/");
      dispatch(token());
      dispatch(UserDetails())
      dispatch(notLoding());
    }
  }
  let validationSchema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Email is Not valed"),
    password: yup
      .string()
      .required("password is required")
      .matches(
        /^[A-Z][\w]{5,15}$/,
        "password stert letter Captal and password Length 6 to 15 "
      ),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: SendDatalogin,
  });
  return (
    <>
      <div className=" container  py-5 my-5">
        <div className="row">
          <div className="col-md-6">
            <img src={photo} className=" img-fluid" />
          </div>
          <div className="col-md-6 regester  text-center">
            <div className="my-3">
              <img src={logo} height={100} alt="" />
              <h3 className="mb-3">Log in to GameOver</h3>

              {error ? (
                <div className="alert alert-danger fs-6">{error}</div>
              ) : null}
              <form onSubmit={formik.handleSubmit}>
                <input
                  className=" form-control my-3"
                  placeholder="Email"
                  type="email"
                  name="email"
                  id="email"
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <input
                  className=" form-control my-3"
                  placeholder="Password"
                  type="password"
                  name="password"
                  id="password"
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />

                {loginLoding !== false ? (
                  <button className="btn bg-main " type="button" disabled>
                    <span
                      className="spinner-border spinner-border-sm  "
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </button>
                ) : (
                  <button
                    disabled={!(formik.isValid && formik.dirty)}
                    type="submit"
                    className="btn text-white p-2 w-100 border border-dark"
                  >
                    LogIn{" "}
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
