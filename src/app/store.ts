import { configureStore } from '@reduxjs/toolkit'
import googleEventsReducer from '../features/events/eventSlice'
import walletReducer from '../features/wallet/walletSlice'

export const store = configureStore({
    reducer: {
        wallet: walletReducer,
        googleEvents: googleEventsReducer,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
