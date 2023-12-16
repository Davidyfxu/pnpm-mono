import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./reducers/noteReducer";
import filterReducer from "./reducers/fiterReducer";

const store = configureStore({
  reducer: { notes: noteReducer, filter: filterReducer },
});

export default store;
