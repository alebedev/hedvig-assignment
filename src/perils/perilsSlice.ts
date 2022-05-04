import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchPerils, FetchPerilsOptions, Peril } from "./perilsApi";

// Quick and dirty type, would use tagged union in real life
export type PerilsState = {
  value?: Peril[];
  status: "idle" | "loading" | "error";
};

const initialState: PerilsState = {
  status: "idle",
};

export const fetchPerilsAction = createAsyncThunk(
  "perils/fetch",
  async (options: FetchPerilsOptions) => {
    return await fetchPerils(options);
  }
);

export const perilsSlice = createSlice({
  name: "perils",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPerilsAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPerilsAction.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      });
  },
});

export const selectPerils = (state: RootState) => state.perils;

export default perilsSlice.reducer;
