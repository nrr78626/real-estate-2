import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { parseCookies } from "nookies";

export const getAllProperties = createAsyncThunk("All Properties", async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/pages/AllProperties`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    try {
        const json = await response.json()
        return json
    } catch (error) {
        return isRejectedWithValue(error)
    }
})

export const addProperty = createAsyncThunk("Add Property", async (body) => {
    const { authtoken } = parseCookies()

    const { address, propertyType, price, title, rooms, baths, purpose, sqft, description, fullname, contact, email, coverVideo, condition, airCondition, balcony_or_terrace, gym_or_health_club, swimmingPool, jacuzzi, sauna, steam_Room, maintenance_staff, securityStaff, status } = body


    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/pages/AddProperty`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authtoken": authtoken
        },
        body: JSON.stringify({ address, propertyType, price, title, rooms, baths, purpose, sqft, description, fullname, contact, email, coverVideo, condition, airCondition, balcony_or_terrace, gym_or_health_club, swimmingPool, jacuzzi, sauna, steam_Room, maintenance_staff, securityStaff, status })
    })
    try {
        const json = await response.json()
        return json
    } catch (error) {
        return isRejectedWithValue(error)
    }
})

export const updatePropertyDetail = createAsyncThunk("Update Property Details", async (body) => {
    const { authtoken } = parseCookies()
    const { purpose, propertyType, title, address, rooms, baths, price, sqft, description, condition, airCondition, balcony_or_terrace, gym_or_health_club, swimmingPool, jacuzzi, sauna, steam_Room, maintenance_staff, securityStaff, coverVideo, email, mobile, fullname, Property, status } = body

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/pages/updateProperty?assetid=${Property}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "authtoken": authtoken
        },
        body: JSON.stringify({ purpose, propertyType, title, address, rooms, baths, price, sqft, description, condition, airCondition, balcony_or_terrace, gym_or_health_club, swimmingPool, jacuzzi, sauna, steam_Room, maintenance_staff, securityStaff, coverVideo, email, mobile, fullname, Property, status })
    })
    try {
        const json = await response.json()
        return json
    } catch (error) {
        return isRejectedWithValue(error)
    }
})

export const deleteProperty = createAsyncThunk("Delete Property", async (body) => {
    const { authtoken } = parseCookies()
    const { id } = body
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/pages/DeleteProperty?assetid=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "authtoken": authtoken
        }
    })
    try {
        const json = await response.json()
        return json
    } catch (error) {
        return isRejectedWithValue(error)
    }
})


const propertiesSlices = createSlice({
    name: "Properties",
    initialState: {
        loading: false,
        msg: null,
        error: null,
        success: false,
        properties: [],
        currentProperty: []
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProperties.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllProperties.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.msg
        })
        builder.addCase(getAllProperties.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.properties = action.payload.properties
        })
        builder.addCase(addProperty.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addProperty.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.msg
        })
        builder.addCase(addProperty.fulfilled, (state, action) => {
            state.loading = false
            state.msg = action.payload.msg
            state.properties.push(action.payload.property)
        })
        builder.addCase(updatePropertyDetail.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updatePropertyDetail.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.msg
        })
        builder.addCase(updatePropertyDetail.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            for (let i = 0; state.properties.length > i; i++) {
                if (state.properties[i]._id == action.payload.updatedProperty._id) {
                    state.properties[i] == action.payload.updatedProperty
                }
            }
        })
        builder.addCase(deleteProperty.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteProperty.rejected, (state, action) => {
            state.loading = false,
                state.error = action.payload.msg,
                state.success = action.payload.success
        })
        builder.addCase(deleteProperty.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success = action.payload.success
            // state.properties = state.properties.filter((e) => {
            //     e._id != action.payload.deletedProperty._id
            // })
        })
    }
})

export default propertiesSlices.reducer