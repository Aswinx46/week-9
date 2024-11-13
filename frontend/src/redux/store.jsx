import {configureStore} from '@reduxjs/toolkit'
import signupslice from './slices/signupslice/signupslice'
import tokenSplice from './slices/tokenslice/tokenslice'
import userSlice from './slices/signinslice/userSlice'
import adminSlice from './slices/admin/adminSlice'
export const store=configureStore({
    reducer:{
        signUp:signupslice,
        token:tokenSplice,
        user:userSlice,
        admin:adminSlice
    }
})