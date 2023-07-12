import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { contractApi } from "./contractApi";
import contractReducer from "./contractSlice";
import { dentalLabApi } from "./dentalLabApi";
import dentalLabReducer from "./dentalLabSlice";
import { equipmentApi } from "./equipmentApi";
import equipmentReducer from "./equipmentSlice";

export const store = configureStore({
  reducer: {
    dentalLab: dentalLabReducer,
    contract: contractReducer,
    equipment: equipmentReducer,
    [dentalLabApi.reducerPath]: dentalLabApi.reducer,
    [contractApi.reducerPath]: contractApi.reducer,
    [equipmentApi.reducerPath]: equipmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      dentalLabApi.middleware,
      contractApi.middleware,
      equipmentApi.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
