import {configureStore} from '@reduxjs/toolkit'
import signupslice from './slices/signupslice/signupslice'
import tokenSplice from './slices/tokenslice/tokenslice'
export const store=configureStore({
    reducer:{
        signUp:signupslice,
        token:tokenSplice
    }
})