import { combineReducers } from "redux";
import posReducer from "./pos/pos.reducer";

const rootReducer = combineReducers({
  pos: posReducer,
});

export default rootReducer;
