import { configureStore } from "@reduxjs/toolkit";

import perilsReducer from "./perils/perilsSlice";

export const store = configureStore({
  reducer: {
    perils: perilsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
