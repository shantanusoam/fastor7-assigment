import { combineReducers, legacy_createStore } from "redux";
import { InfoReducer } from "./InfoReducer";
import { RestaurantsReducer } from "./RestaurantsReducer";

const rootReducer = combineReducers({
  user_info: InfoReducer,
  restaurants: RestaurantsReducer,
});

export const store = legacy_createStore(rootReducer);
