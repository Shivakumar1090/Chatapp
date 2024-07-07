import { createSlice } from '@reduxjs/toolkit'

const initialState = JSON.parse(localStorage.getItem('user')) || null;

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state,action) => {
            const userData = action.payload
            localStorage.setItem('user', JSON.stringify(userData));
            return action.payload;
        },
    },
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer