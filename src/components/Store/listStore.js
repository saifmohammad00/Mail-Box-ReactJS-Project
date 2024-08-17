import { createSlice } from "@reduxjs/toolkit";
const initialState={
    mailItems:[],
    isRead:0,
}
const listStore=createSlice({
    name:"listStore",
    initialState:initialState,
    reducers:{
        addItem(state,action){
            state.mailItems=action.payload;
            state.isRead = action.payload.filter(mail => !mail.isRead).length;
        },
        markAsRead: (state, action) => {
            state.mailItems = state.mailItems.map(mail =>
              mail.id === action.payload.id ? { ...mail, isRead: true } : mail
            );
            state.isRead = state.mailItems.filter(mail => !mail.isRead).length;
          },
    }
});
export const listActions=listStore.actions;
export default listStore.reducer;