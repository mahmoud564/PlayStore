import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";
export let RegisterUeser = createAsyncThunk(
  "Register/RegisterUeser",
  async function RegisterSliceProvider(value) {
    let respons = await axios.post(
      "https://route-ecommerce-app.vercel.app/api/v1/auth/signup",
      value
    );
    return respons;
  }
);
export let Login = createAsyncThunk(
  "Login/LoginUeser",
  async function LoginSliceProvider(value) {
    let respons = await axios.post(
      "https://route-ecommerce-app.vercel.app/api/v1/auth/signin",
      value
    );
    return respons;
  }
);

let initialState = {
  data: [],
  key: "",
  User: "",
  loginLoding: false,
};
export let RegisterSlice = createSlice({
  name: "Regster",
  initialState,
  reducers: {
    token(state, action) {
      state.key = localStorage.getItem("gametoken");
    },
    logout(state, actions) {
      localStorage.removeItem("gametoken");
      state.key = "";
    },
    isLoding(state, actions) {
      state.loginLoding = true;
    },
    notLoding(state, actions) {
      state.loginLoding = false;
    },
    UserDetails(state, actions) {
      let token = localStorage.getItem("gametoken");
      state.User = jwt_decode(token);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RegisterUeser.fulfilled, (state, action) => { 
      state.data.push(action.payload);
    });
    builder.addCase(Login.fulfilled, (state, action) => {
      state.key = action.payload;
    });
  },
});
export let RegisterSlices = RegisterSlice.reducer;
export let { token, logout, isLoding, notLoding, UserDetails } =
  RegisterSlice.actions;
