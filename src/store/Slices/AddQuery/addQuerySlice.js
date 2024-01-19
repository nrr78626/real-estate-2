import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { parseCookies } from "nookies";

export const addQuery = createAsyncThunk("Add Query", async (body) => {
    const { fullname, email, contact, initQuery } = body
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/Order/AddQuery`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ fullname, email, contact, initQuery })
    })
    try {
        const json = await response.json()
        return json
    } catch (error) {
        return isRejectedWithValue(error)
    }
})

export const allQuery = createAsyncThunk("All Query", async (body) => {
    const { authtoken } = parseCookies()
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/Order/AllQuery`, {
        method: "GET",
        headers: {
            "authtoken": authtoken,
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

const addQuerySlice = createSlice({
    name: "Query",
    initialState: {
        loading: false,
        error: null,
        query: []
    },
    extraReducers: (builder) => {
        builder.addCase(allQuery.pending, (state) => {
            state.loading = true
        })
        builder.addCase(allQuery.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
        })
        builder.addCase(allQuery.fulfilled, (state, action) => {
            state.loading = false
            state.query = action.payload.queries
        })
        builder.addCase(addQuery.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(addQuery.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
        })
        builder.addCase(addQuery.fulfilled, (state, action) => {
            state.loading = false
            state.query.push(action.payload.queries)
        })
    }
})

export default addQuerySlice.reducer