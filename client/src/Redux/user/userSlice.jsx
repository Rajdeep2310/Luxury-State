import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    isLoading:false,
};

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart:(state) =>{
            state.isLoading = true;
        },
        signInSuccess:(state, action) =>{
            state.currentUser = action.payload; 
            state.isLoading = false;
            state.error = null;
        }, 
        signInFailure:(state ,action ) =>{
            state.error = action.payload;
            state.isLoading = false;
        },
        updateUserStart:(state) =>{
            state.isLoading = true;
        },
        updateUserSuccess:(state , action) =>{
            state.currentUser = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        updateUserFailure:(state, action) =>{
            state.error = action.payload ;
            state.isLoading = false;
            state.error = null;
        }
    }
})
const userReducer = userSlice.reducer;
export const { signInFailure , signInStart ,signInSuccess, updateUserStart, updateUserSuccess , updateUserFailure} = userSlice.actions;

export default userReducer ;