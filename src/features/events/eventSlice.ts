import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface googleEventsState {
    loginStatus: 'loggedIn' | 'notLoggedIn' | 'dontKnow'
    events: Array<Event>
}

export interface Event {
    desc: string
    startDate: string
    endDate: string
    id: string
}

const initialState: googleEventsState = {
    loginStatus: 'dontKnow',
    events: [],
}

export const googleEventsSlice = createSlice({
    name: 'googleEvents',
    initialState,
    reducers: {
        logIn: state => {
            state.loginStatus = 'loggedIn'
        },
        updateEvents: (state, action: PayloadAction<Event[]>) => {
            const events = action.payload
            state.events = events.filter((event, index) => {
                if (index === 0) return true
                return event.id !== events[index - 1].id
            })
        },
        logOut: state => {
            state.loginStatus = 'notLoggedIn'
            state.events = []
        },
    },
})

export const { logIn, logOut, updateEvents } = googleEventsSlice.actions

export const selectGoogleEvents = (state: RootState) => state.googleEvents

export default googleEventsSlice.reducer
