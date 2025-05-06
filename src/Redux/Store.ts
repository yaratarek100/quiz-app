import { configureStore } from '@reduxjs/toolkit'
import { AuthReduceer } from './AuthSlice'
const store=configureStore({
    reducer:
    {
        AuthReduceer
    }

})
export default store