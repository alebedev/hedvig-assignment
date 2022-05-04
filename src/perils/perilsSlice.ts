import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchPerils, FetchPerilsOptions, Peril } from "./perilsApi";

// Quick and dirty type, would use tagged union in real life
export type PerilsState = {
  value?: Peril[];
  selectedIndex?: number;
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
  reducers: {
    select: (state, action: PayloadAction<number>) => {
      state.selectedIndex = action.payload;
    },
    deselect: (state) => {
      delete state.selectedIndex;
    },
    selectPrev: (state) => {
      if (state.value && typeof state.selectedIndex === "number") {
        state.selectedIndex = state.selectedIndex - 1;
        if (state.selectedIndex < 0) {
          state.selectedIndex = state.value.length - 1;
        }
      }
    },
    selectNext: (state) => {
      if (state.value && typeof state.selectedIndex === "number") {
        state.selectedIndex = state.selectedIndex + 1;
        if (state.selectedIndex >= state.value.length) {
          state.selectedIndex = 0;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPerilsAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPerilsAction.rejected, (state) => {
        state.status = "error";
      })
      .addCase(fetchPerilsAction.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      });
  },
});

export const selectPerils = (state: RootState) => state.perils;

export default perilsSlice.reducer;
