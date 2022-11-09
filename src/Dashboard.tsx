import { Link } from 'react-router-dom'
import { useAppSelector } from './app/hooks'
import { selectWallet } from './features/wallet/walletSlice'
import ApiCalendar from 'react-google-calendar-api'
import { useState } from 'react'

const CLIENT_ID = '1075249219041-r8idln1a2mk01jicab84q7k0mp1i1r1m.apps.googleusercontent.com'
const API_KEY = 'AIzaSyD0ZCsIM_L4u6t5_ET0rWQiXaS-c237z5U'
const SCOPES = 'https://www.googleapis.com/auth/calendar'
const DISCOVERY_DOC = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']

export default function Dashboard() {
    const [eventsRes, setEventsRes] = useState<any>()
    const [googleLoggedIn, setGoogleLoggedIn] = useState<'notLoggedIn' | 'loggedIn' | 'loading'>('notLoggedIn')
    const wallet = useAppSelector(selectWallet)

    const events: Array<any> = eventsRes?.items
    console.log(events)

    function getEvents() {
        apiCalendar
            .listUpcomingEvents(10, 'primary')
            .then((res: any) => setEventsRes(JSON.parse(res.body)))
            .catch(() => console.log('error in getting events'))
    }

    const apiCalendar = new ApiCalendar({
        clientId: CLIENT_ID,
        apiKey: API_KEY,
        scope: SCOPES,
        discoveryDocs: DISCOVERY_DOC,
    })

    function googleLogin() {
        setGoogleLoggedIn('loading')
        try {
            apiCalendar.handleAuthClick()
            setGoogleLoggedIn('loggedIn')
        } catch (e) {
            setGoogleLoggedIn('notLoggedIn')
        }
    }

    if (wallet.status === 'dontKnow') return <>Loading</>
    if (wallet.status === 'notLoggedIn') return <Link to={'signin'}>SignIn</Link>

    return (
        <>
            <h2>Wallet address</h2>
            <div>{wallet.status === 'loggedIn' ? wallet.address : 'Not logged in'}</div>
            <div>{wallet.status === 'loggedIn' ? wallet.balance : null}</div>
            <Link to='/stats'>stats</Link>
            <button onClick={getEvents}>get google calander events</button>
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
            {googleLoggedIn !== 'loggedIn' ? (
                <>
                    <button onClick={googleLogin}>
                        {googleLoggedIn !== 'loading' ? 'google login' : 'logging in ...'}
                    </button>
                </>
            ) : (
                <>
                    <button onClick={apiCalendar.handleSignoutClick}>logout Google</button>
                </>
            )}
        </>
    )
}
