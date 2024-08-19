import { configureStore } from "@reduxjs/toolkit";
import listStore from "./listStore";
import authreducer from "./auth";

const store=configureStore({
    reducer:{list:listStore,auth:authreducer}
})
export default store;