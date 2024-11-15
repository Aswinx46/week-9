import { createSlice } from "@reduxjs/toolkit";

const initialState={
    editUser:{}
}

export const editUser=createSlice({
    name:'editUser',
    initialState,
    reducers:{
        editname:(state,action)=>{
            state.editUser.name=action.payload
        },
        editemail:(state,action)=>{
            state.editUser.email=action.payload
        },
        userEdit:(state,action)=>{
            state.editUser=action.payload
        }
    }
})

export const {editemail,editname,userEdit}=editUser.actions
export default editUser.reducer