import { configureStore } from '@reduxjs/toolkit'
import { AuthReduceer } from './AuthSlice'
import { apis } from './apis'
import { setupListeners } from '@reduxjs/toolkit/query'
const store=configureStore({
    reducer:
    {
        AuthReduceer,
      [apis.reducerPath]:apis.reducer
    },
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(apis.middleware)
    

})
setupListeners(store.dispatch)
export default store