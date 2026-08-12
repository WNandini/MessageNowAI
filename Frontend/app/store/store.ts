import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { automationApi } from "./api/automationApi";
import { instagramApi } from "./api/instagramApi";

export const store = configureStore({
    reducer: {
         [authApi.reducerPath]: authApi.reducer,
         [automationApi.reducerPath]: automationApi.reducer,
         [instagramApi.reducerPath]: instagramApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            automationApi.middleware,
            instagramApi.middleware
        ),
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;