import { useEffect, useState } from 'react'
import { apiCalendar } from '../app/utils'

export default function GoogleEvents() {
    const [events, setEvents] = useState<Array<any>>([])
    const [googleLoggedIn, setGoogleLoggedIn] = useState(false)
    useEffect(() => {
        setGoogleLoggedIn(apiCalendar.sign)
    }, [])

    function getEvents() {
        apiCalendar
            .listUpcomingEvents(5, 'primary')
            .then((res: any) => setEvents(JSON.parse(res.body).items))
            .catch(() => console.log('error in getting events'))
    }
    useEffect(() => {}, [events.length, googleLoggedIn])

    function googleLogin() {
        // setGoogleLoggedIn('loading')
        try {
            apiCalendar.handleAuthClick()
            setGoogleLoggedIn(true)
        } catch (e) {
            setGoogleLoggedIn(false)
        }
    }
    return (
        <>
            {googleLoggedIn ? (
                <>
                    <button onClick={getEvents}>get google calander events</button>
                    <button
                        onClick={() => {
                            apiCalendar.handleSignoutClick()
                            setGoogleLoggedIn(false)
                        }}>
                        logout Google
                    </button>
                </>
            ) : (
                <button onClick={googleLogin}>LogIn</button>
            )}
            <ul>
                {events
                    ? events.map((event: any, index) => (
                          <li key={index}>
                              <h3>{event.summary}</h3>
                              <div>start date: {event.start.date}</div>
                              <div>end date: {event.end.date}</div>
                          </li>
                      ))
                    : null}
            </ul>
        </>
    )
}
