import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { UserReducer } from "./user/reducer";

const persistConfig = {
  key: "speciesConfig",
  storage,
  whitelist: ["filters"]
};

const reducers = combineReducers({
  user: UserReducer.reducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ serializableCheck: false })
  ]
});

let persistor = persistStore(store);

const reduxData = { store, persistor };

export default reduxData;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
