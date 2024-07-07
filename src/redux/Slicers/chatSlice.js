import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    chatId: "null",
    user: {},
};

const currentUser =  JSON.parse(localStorage.getItem('user')) || null;

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        changeUser: (state,action) => {
            return {
                user: action.payload,
                chatId:
                    currentUser.id > action.payload.id
                        ? currentUser.id + action.payload.id
                        : action.payload.id + currentUser.id,
            };
        },
    },
})

export const { changeUser } = chatSlice.actions;

export default chatSlice.reducer