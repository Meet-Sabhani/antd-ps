import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import register from "./reducers/registerData";
import currentUser from "./reducers/currentUser";
import events from "./reducers/events";
import idCounterIncrement from "./reducers/idCounterIncrement";
import eventIdCounter from "./reducers/eventIdCounter";
import booking from "./reducers/booking";
import filter from "./reducers/filterData";
import { combineReducers, createStore } from "redux";

const combinedReducer = combineReducers({
  register,
  currentUser,
  idCounterIncrement,
  events,
  eventIdCounter,
  booking,
  filter,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "register",
    "currentUser",
    "idCounterIncrement",
    "events",
    "eventIdCounter",
    "booking",
    "filter",
  ],
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
