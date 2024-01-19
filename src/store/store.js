import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import propertiesSlice from "./Slices/Product/propertiesSlice";
import loginSlice from "./Slices/LoginSlice/loginSlice";
import addUserSlice from "./Slices/AddUser/addUserSlice";
import propertiesSlices from "./Slices/Properties/propertiesSlices";
import addQuerySlice from "./Slices/AddQuery/addQuerySlice";

export const store = configureStore({
    reducer: {
        newProperty: propertiesSlice,
        login: loginSlice,
        addUser:addUserSlice,
        properties:propertiesSlices,
        Query:addQuerySlice
    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware()
 
})