import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BigNumber } from 'ethers'
import { RootState } from '../../app/store'

export interface WalletState {
    status: 'loggedIn' | 'notLoggedIn'
    address: string | null
    balance: string | null
}

const initialState: WalletState = {
    status: 'notLoggedIn',
    address: null,
    balance: null,
}

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<{ address: string; balance: string }>) => {
            state.status = 'loggedIn'
            state.address = action.payload.address
            state.balance = action.payload.balance
        },
        remove: state => {
            state.status = 'notLoggedIn'
            state.address = null
            state.balance = null
        },
    },
})

export const { update, remove } = walletSlice.actions

export const selectWallet = (state: RootState) => state.wallet

export default walletSlice.reducer
