import { configureStore } from "@reduxjs/toolkit";
import { RegisterSlices } from "./RegisterSlice";


export let store=configureStore({
    reducer: { Register: RegisterSlices},
  })