import { Link } from 'react-router-dom'
import { useAppSelector } from './app/hooks'
import { selectWallet } from './features/wallet/walletSlice'

export default function Dashboard() {
    const wallet = useAppSelector(selectWallet)
    if (wallet.status === 'dontKnow') return <>Loading</>
    return (
        <>
            {wallet.status === 'notLoggedIn' ? (
                <Link to={'signin'}>SignIn</Link>
            ) : (
                <>
                    <h2>Wallet address</h2>
                    <div>{wallet.status === 'loggedIn' ? wallet.address : 'Not logged in'}</div>
                    <div>{wallet.status === 'loggedIn' ? wallet.balance : null}</div>
                    <Link to='stats'>Stats</Link>
                </>
            )}
        </>
    )
}
