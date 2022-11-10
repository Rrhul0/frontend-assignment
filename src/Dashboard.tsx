import { Link } from 'react-router-dom'
import ApiCalendar from 'react-google-calendar-api'
import { useState } from 'react'
import { useAccount, useDisconnect, useEnsName, useBlockNumber } from 'wagmi'

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || ''
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY || ''
const SCOPES = 'https://www.googleapis.com/auth/calendar'
const DISCOVERY_DOC = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']

export default function Dashboard() {
    const [eventsRes, setEventsRes] = useState<any>()
    const [googleLoggedIn, setGoogleLoggedIn] = useState<'notLoggedIn' | 'loggedIn' | 'loading'>('notLoggedIn')

    const { address, connector, isConnected } = useAccount()
    const { data: ensName } = useEnsName({ address })
    const { disconnect } = useDisconnect()

    const { data, isError, isLoading } = useBlockNumber({ watch: true })

    const events: Array<any> = eventsRes?.items

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


    return (
        <>
            {isConnected ? (
                <div>
                    <div>{ensName ? `${ensName} (${address})` : address}</div>
                    <div>Connected to {connector?.name}</div>
                    <button onClick={() => disconnect()}>Disconnect</button>
                </div>
            ) : (
                <Link to={'signin'}>SignIn</Link>
            )}
            <Link to='/stats'>stats</Link>
            <div>Block number: {data}</div>
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
