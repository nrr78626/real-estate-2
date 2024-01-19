import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import { setCookie } from 'nookies'

export const loginUser = createAsyncThunk("login", async (body) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    try {
        const json = await response.json()
        if (json.success) {
            setCookie(null, "authtoken", json.authtoken, { maxAge: 30 * 24 * 60 * 60, path: "/" })
        }
        return json
    } catch (error) {
        return isRejected(error)
    }
})

const loginUserSlice = createSlice({
    name: "login",
    initialState: {
        loading: false,
        error: null,
        loginStatus: []
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false,
                state.loginStatus= action.payload
        })
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false,
                state.error = action.payload
        })
    }
})

export default loginUserSlice.reducer