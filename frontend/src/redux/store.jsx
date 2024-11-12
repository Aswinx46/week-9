import {configureStore} from '@reduxjs/toolkit'
import signupslice from './slices/signupslice/signupslice'
export const store=configureStore({
    reducer:{
        signUp:signupslice
    }
})