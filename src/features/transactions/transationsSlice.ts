import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface txnsState {
    txns: txn[]
}

export interface txn {
    hash: string
    blockHeight: Number
    confirmedDate: string
}

const initialState: txnsState = {
    txns: [],
}

export const txnsSlice = createSlice({
    name: 'txnsRedux',
    initialState,
    reducers: {
        updateTxns: (state, action: PayloadAction<any[]>) => {
            const rawTxns = action.payload
            const txns = rawTxns.filter(txn => {
                return txn?.tx_hash || txn?.block_height || txn?.confirmed
            })
            state.txns = txns.map(txn => {
                return {
                    hash: txn.tx_hash,
                    blockHeight: txn.block_height,
                    confirmedDate: txn.confirmed,
                }
            })
        },
    },
})

export const { updateTxns } = txnsSlice.actions

export const selectTxns = (state: RootState) => state.txnsRedux

export default txnsSlice.reducer
