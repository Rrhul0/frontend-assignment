import { useState } from 'react'
import { GrRefresh } from 'react-icons/gr'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { apiCalendar } from '../app/utils'
import { logIn, logOut, selectGoogleEvents, updateEvents } from '../features/events/eventSlice'
import EventCard from './eventCard'

export default function GoogleEvents() {
    const [showError, setShowError] = useState(false)
    const [getEventsClick, setGetEventsClick] = useState(false)
    const googleEvents = useAppSelector(selectGoogleEvents)
    const dispatch = useAppDispatch()

    function getEvents() {
        apiCalendar
            .listUpcomingEvents(5, 'primary')
            .then((res: any) => {
                const rawEvents = JSON.parse(res.body).items
                dispatch(
                    updateEvents(
                        rawEvents.map((rawEvent: any) => {
                            return {
                                desc: rawEvent.summary,
                                startDate: rawEvent.start.date,
                                endDate: rawEvent.end.date,
                                id: rawEvent.etag,
                            }
                        })
                    )
                )
                setGetEventsClick(false)
            })
            .catch(() => {
                setShowError(true)
                dispatch(logOut())
                console.log('error in getting events')
            })
    }

    function googleLogin() {
        setShowError(false)

        try {
            apiCalendar.handleAuthClick()
            setGetEventsClick(true)
            dispatch(logIn())
        } catch (e) {
            console.log('error in google log in')
            setShowError(true)
            dispatch(logOut())
        }
    }
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-center pb-4'>
                <h2 className='text-4xl font-bold text-pink-400'>Google Calendar Events</h2>
                <button onClick={getEvents} className='bg-stone-200 hover:bg-stone-300 p-2 rounded-lg'>
                    <GrRefresh />
                </button>
            </div>
            {showError ? (
                <div className=' text-red-400 font-semibold '>
                    Error in getting events from google account <br /> Please Login again!
                </div>
            ) : null}
            {googleEvents.loginStatus !== 'loggedIn' ? (
                <button
                    onClick={googleLogin}
                    className='bg-stone-300 self-center text-primary hover:bg-stone-400 px-5 py-1.5 rounded-lg font-semibold'>
                    LogIn with Google Account
                </button>
            ) : (
                <div className='flex flex-col gap-2'>
                    <ul className='flex flex-col gap-4'>
                        {googleEvents.events.length !== 0 ? (
                            googleEvents.events.map(event => <EventCard key={event.id} event={event} />)
                        ) : getEventsClick ? (
                            <div className='text-secondry font-semibold'>Please Refresh Events</div>
                        ) : (
                            <div className='text-secondry font-semibold'>Google Account have no Events</div>
                        )}
                    </ul>
                    <button
                        className='self-end bg-red-300 hover:bg-red-400 mt-4 py-1.5 px-5 rounded-xl text-primary font-semibold text-lg'
                        onClick={() => {
                            apiCalendar.handleSignoutClick()
                            dispatch(logOut())
                        }}>
                        Logout Google Account
                    </button>
                </div>
            )}
        </div>
    )
}
