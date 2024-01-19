import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    properties: require("@/Features/data/Properties"),
    status: "idel",
    loading: false
}

export const propertySlice = createSlice({
    name:"Properties",
    initialState:initialstate,
    reducers:{
        addProperty:(state,action)=>{
            state.properties = action.payload
        }
    }
})

export const {addProperty} = propertySlice.actions

export default propertySlice.reducer