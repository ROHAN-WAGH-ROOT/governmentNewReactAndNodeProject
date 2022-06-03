import { createSlice } from '@reduxjs/toolkit';
const authSlice = createSlice({
    name: "user",
    initialState: {
        firstName: '',
        lastName: '',
        email: '',
        token: localStorage.getItem('token'),
    },
    reducers: {
        setUser: (state, action) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        removeUser: (state, action) => {
            state.token = null;
            state.firstName = null;
            state.lastName = null;
            state.email = null;
        }
    }
})

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;