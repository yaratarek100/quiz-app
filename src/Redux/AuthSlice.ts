import { createSlice } from "@reduxjs/toolkit";
import type store from "../Redux/Store1";
import type { ILogin_ProfileData } from "@/Interfaces/AuthInterface";

interface IAuthState {
    loginData: ILogin_ProfileData | null;
  }
  const storedUser = localStorage.getItem("user");
  const initialState: IAuthState = {
    loginData: storedUser?JSON.parse(storedUser):null,
  };

const authSlice=createSlice({
name:'AuthSlice',
initialState:initialState,
// to add modify on  initial state we need actions===reducres action to modify loginData
reducers:{
    // takes 2 params prev state+action
fillLoginData:function(state,action){
    // console.log(state,action)
    state.loginData=action.payload

},
logOut:function(state){
    state.loginData=null
}

}})

export const AuthReduceer= authSlice.reducer;
export type RootState = ReturnType<typeof store.getState>;
export const {fillLoginData,logOut}=authSlice.actions;
export const selectUserRole = (state: RootState) => state.AuthReduceer.loginData?.role;

