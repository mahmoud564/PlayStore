/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const options = {
  headers: {
    "X-RapidAPI-Key": "cf7c79cb69mshff31df14226e1bbp1c7da3jsncf33a1a5813c",
    "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
  },
};
export let HomeData = createAsyncThunk(
  "Home/HomeData",
  async function ShwoDataHome() {
    let respons = await axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/games`,
      options
    );
    return respons;
  }
);

export let GameDetailss = createAsyncThunk(
  "Game/GameDetailss",
  async function ShowGameDetails(params) {
    let respons = await axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${params.id}`,
      options
    );
    return respons;
  }
);

export let CategoriesFunction = createAsyncThunk(
  "Categories/GameCategories",
  async function ShowGameCategories(param) {
    let respons = await axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${param.id}`,
      options
    );
    return respons;
  }
);
export let SortFunction = createAsyncThunk(
  "Sort/GameSort",
  async function ShowGameSort(param) {
    let respons = await axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=${param.id}`,
      options
    );
    return respons;
  }
);
export let PlatformsFunction = createAsyncThunk(
  "Sort/GamePlatforms",
  async function ShowGamePlatforms(param) {
    let respons = await axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${param.id}`,
      options
    );
    return respons;
  }
);

let initialState = {
  data: [],
};
export let ShowDataSlice = createSlice({
  name: "Showdata",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HomeData.fulfilled, (state, action) => {
      state.datapush(action.payload);
    });
  },
});
export let ShowAlldata = ShowDataSlice.reducer;
export let {} = ShowDataSlice.actions;
