import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name:'auth',
    initialState: {
        token: localStorage.getItem('access_token') || null,
        loggedUser: null
    },
    reducers:{
        setToken(state,action){
            state.token = action.payload;
            localStorage.setItem('access_token',action.payload);
        },
        setLoggedUser(state,action){
            state.loggedUser = action.payload;
        },
        clearAuth(state){
            state.token = null;
            state.loggedUser = null
            localStorage.removeItem('access_token')
        }
    }
})

export const {setToken,setLoggedUser,clearAuth} = authSlice.actions;
export default authSlice.reducer