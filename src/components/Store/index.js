import { configureStore } from "@reduxjs/toolkit";
import listStore from "./listStore";

const store=configureStore({
    reducer:{listStore:listStore}
})
export default store;