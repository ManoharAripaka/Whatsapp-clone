import { createSlice } from "@reduxjs/toolkit";
const DataStore = createSlice({
    name: "data",
    initialState: {
        loggedin: false,
        user: '',
        userDetails : '', //userName
        userId : '',
        chats: '',
        chatId: '',
        chatName: '',
        dbChange: true,
        edit: 'flex',
        newChat: 'none',
        nameChange: 'none'
    },
    // W976AbtsHos5Bipsas2w
    reducers: {
        updateLoggedin: (state, action) => {state.loggedin = action.payload},
        updateUser: (state, action) => {state.user = action.payload},
        updateUserDetails: (state, action) => {state.userDetails = action.payload},
        updateUserId: (state, action) => {state.userId = action.payload},
        updateChats: (state, action) => {state.chats = action.payload},
        updateDbChange: (state, action) => {state.dbChange = !state.dbChange},
        updateEdit: (state, action) => {state.edit = action.payload},
        updateNewChat: (state, action) => {state.newChat = action.payload},
        updateNameChange: (state, action) => {state.nameChange = action.payload},
        updateChatId: (state, action) => {state.chatId = action.payload},
        updateChatName: (state, action) => {state.chatName = action.payload}
    }
})
export const { updateLoggedin, updateUser, updateUserId, updateChats, updateDbChange, updateEdit, updateUserDetails, updateNewChat, updateNameChange, updateChatId, updateChatName} = DataStore.actions
export default DataStore.reducer