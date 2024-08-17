import { configureStore } from "@reduxjs/toolkit";
import listStore from "./listStore";

const store=configureStore({
    reducer:{list:listStore}
})
export default store;