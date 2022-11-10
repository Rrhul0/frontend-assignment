import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAppSelector } from './app/hooks'
import BlockHeightWidget from './components/blockheight.widget'
import TxnsWidget from './components/txns.widget'
import { selectWallet } from './features/wallet/walletSlice'

export default function Stats() {
    const wallet = useAppSelector(selectWallet)
    const navigate = useNavigate()

    useEffect(() => {
        if (wallet.status === 'notLoggedIn') navigate('/signin')
    })

    if (wallet.status === 'dontKnow') return <>Loading</>

    return (
        <>
            <h2>Stats Page</h2>
            <TxnsWidget address={wallet.address} />
            <BlockHeightWidget />
        </>
    )
}
