import { createSlice } from "@reduxjs/toolkit";
import type store from "./Store";
import type { ILogin_ProfileData } from "@/Interfaces/AuthInterface";

interface IAuthState {
    loginData: ILogin_ProfileData | null;
  }

  const initialState: IAuthState = {
    loginData: null,
  };


const authSlice=createSlice({
name:'AuthSlice',
initialState:initialState,
// to add modify on  initial state we need actions===reducres action to modify loginData
reducers:{
    // takes 2 params prev state+action
fillLoginData:function(state,action){
    console.log(state,action)
    state.loginData=action.payload

},
logOut:function(state,_action){
    state.loginData=null
}

}})

export const AuthReduceer= authSlice.reducer;
export type RootState = ReturnType<typeof store.getState>;
export const {fillLoginData,logOut}=authSlice.actions;
