import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { User } from "../../models/user";

export interface Auth {
    isLoggedIn:boolean,
    logging?:boolean,
    currentUser?:User
}
export interface LoginAccount {
    username:string,
    password:string,
    onSuccess: () => void
}
const initialState : Auth = {
    isLoggedIn:false,
    logging:false,
    currentUser: undefined
} 
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action:PayloadAction<LoginAccount>) => {
        state.logging = true
    },
    loginSuccess: (state, action) => {
        state.logging = false
        state.isLoggedIn = true
        state.currentUser = action.payload
    },
    loginFaild: (state, action) => {
        state.logging = false
    },
    logout: (state) => {
        state.isLoggedIn = false;
        state.currentUser = undefined
    },
  },
});

export const { login,loginSuccess,loginFaild,logout } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
