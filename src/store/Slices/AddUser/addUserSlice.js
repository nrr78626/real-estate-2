import { createSlice, createAsyncThunk, isRejected } from "@reduxjs/toolkit";
import { parseCookies } from "nookies";

export const addUser = createAsyncThunk("addUser", async (body) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/auth/AddUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    try {
        const json = await response.json()
        return json
    } catch (error) {
        return isRejected(error)
    }
})

export const showUsers = createAsyncThunk("showuser", async () => {
    const { authtoken } = await parseCookies()
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/auth/GetUsers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authtoken": authtoken
        }
    })
    try {
        const json = await response.json()
        return json
    } catch (error) {
        return isRejected(error)
    }
})

export const updateUsersRole = createAsyncThunk("updateRole", async (body) => {
    const { authtoken } = await parseCookies()
    const { role, currUpdateUserRole } = body
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/auth/UpdateUserRole?current_user_id=${currUpdateUserRole}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "authtoken": authtoken
        },
        body: JSON.stringify({ role })
    })
    try {
        const json = await response.json()
        return json
    } catch (error) {
        return isRejected(error)
    }
})

export const getCurrentProfile = createAsyncThunk("profile", async () => {
    const { authtoken } = await parseCookies()
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/auth/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authtoken": authtoken
        }
    })
    try {
        const json = await response.json()
        return json
    } catch (error) {
        return isRejected(error)
    }

})

export const updateProfile = createAsyncThunk("updateProfile", async (body) => {
    const { authtoken } = parseCookies()
    const { fullname, contact, myId, password } = body
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/auth/profile`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "authtoken": authtoken
        },
        body: JSON.stringify({ fullname, contact, myId, password })
    })
    try {
        const json = await response.json()
        return json
    } catch (error) {
        return isRejected(error)
    }
})

export const updateMyAvatar = createAsyncThunk("updateMyAvatar", async (userPic) => {
    const { authtoken } = parseCookies()
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/auth/UpdateAvatar`, {
        method: "PUT",
        headers: {
            "authtoken": authtoken
        },
        body: userPic
    })
    try {
        const json = await response.json()
        return json
    } catch (error) {
        return isRejected(error)
    }

})

export const deleteUser = createAsyncThunk("deleteUser", async (body) => {
    const { authtoken } = parseCookies()
    const { userId } = body
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/auth/deleteuser?current_user_id=${userId}`, {
        method: "DELETE",
        headers: {
            "authtoken": authtoken,
            "Content-Type": "application/json"
        }
    })
    try {
        const json = await response.json()
    return json
    } catch (error) {
        return isRejected(error)
    }
})

const addUserSlice = createSlice({
    name: "addUser",
    initialState: {
        loading: false,
        error: null,
        addedUser: [],
        success: null,
        msg: null,
        currentUser: []
    },
    extraReducers: (builder) => {
        builder.addCase(addUser.pending, (state, action) => {
            state.loading = true
            state.success = false
        })
        builder.addCase(addUser.rejected, (state, action) => {
            state.loading = false
            state.success = action.payload.success
            state.error = action.payload.msg
        })
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.loading = false
            state.success = action.payload.success
            state.msg = action.payload.msg
            state.addedUser.users.push(action.payload.user)
        })
        builder.addCase(showUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(showUsers.rejected, (state, action) => {
            state.loading = false
            state.success = action.payload.success
            state.msg = action.payload.msg
        })
        builder.addCase(showUsers.fulfilled, (state, action) => {
            state.loading = false
            state.success = action.payload.success
            state.msg = action.payload.msg
            state.addedUser = action.payload
        })
        builder.addCase(updateUsersRole.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateUsersRole.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.msg
            state.success = action.payload.success
        })
        builder.addCase(updateUsersRole.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success = action.payload.success
        })
        builder.addCase(getCurrentProfile.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getCurrentProfile.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.msg
        })
        builder.addCase(getCurrentProfile.fulfilled, (state, action) => {
            state.loading = false
            state.currentUser = action.payload
        })
        builder.addCase(updateProfile.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.loading = false
            state.success = action.payload.success
            state.error = action.payload.msg
        })
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false
            state.success = action.payload.success
            const { fullname, contact } = action.payload.updatedUser
            state.currentUser.user.fullname = fullname
            state.currentUser.user.contact = contact
        })
        builder.addCase(updateMyAvatar.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(updateMyAvatar.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.msg
            state.success = action.payload.success
        })
        builder.addCase(updateMyAvatar.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success = action.payload.success
            state.currentUser.user.userPic = action.payload.userPic
        })
        builder.addCase(deleteUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.msg
            state.success = action.payload.success
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success = action.payload.success
            const { userId } = action.payload

            if (userId) {
                state.addedUser.users = state.addedUser.users.filter((e) =>
                    e._id != userId
                )
            }
        })
    }
})


export default addUserSlice.reducer