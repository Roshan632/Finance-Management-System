// import { configureStore } from "@reduxjs/toolkit";
// import { dashboardApi } from "../services/dashboardApi";

// export const store = configureStore({
//   reducer: {
//     [dashboardApi.reducerPath]: dashboardApi.reducer,
//   },

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(
//       dashboardApi.middleware
//     ),
// });

import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});