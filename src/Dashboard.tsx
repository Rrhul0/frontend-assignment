import { Link } from 'react-router-dom'
import { useAccount, useDisconnect, useEnsName } from 'wagmi'
import GoogleEvents from './components/googleEvents'

export default function Dashboard() {
    const { address, connector, isConnected } = useAccount()
    const { data: ensName } = useEnsName({ address })
    const { disconnect } = useDisconnect()

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
            <GoogleEvents />
        </>
    )
}
