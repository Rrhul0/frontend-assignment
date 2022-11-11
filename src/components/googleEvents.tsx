import { useAppDispatch, useAppSelector } from '../app/hooks'
import { apiCalendar } from '../app/utils'
import { logIn, logOut, selectGoogleEvents, updateEvents } from '../features/events/eventSlice'

export default function GoogleEvents() {
    const googleEvents = useAppSelector(selectGoogleEvents)
    const dispatch = useAppDispatch()

    function getEvents() {
        apiCalendar
            .listUpcomingEvents(10, 'primary')
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
            })
            .catch(() => {
                dispatch(logOut())
                console.log('error in getting events')
            })
    }

    function googleLogin() {
        try {
            apiCalendar.handleAuthClick()
            dispatch(logIn())
        } catch (e) {
            console.log('error in google log in')
            dispatch(logOut())
        }
    }
    return (
        <>
            {googleEvents.loginStatus === 'loggedIn' ? (
                <>
                    <button onClick={getEvents}>get google calander events</button>
                    <button
                        onClick={() => {
                            apiCalendar.handleSignoutClick()
                            dispatch(logOut())
                        }}>
                        logout Google
                    </button>
                </>
            ) : (
                <button onClick={googleLogin}>LogIn</button>
            )}
            <ul>
                {googleEvents.events.length !== 0
                    ? googleEvents.events.map(event => (
                          <li key={event.id}>
                              <h3>{event.desc}</h3>
                              <div>start date: {event.startDate}</div>
                              <div>end date: {event.endDate}</div>
                          </li>
                      ))
                    : null}
            </ul>
        </>
    )
}
