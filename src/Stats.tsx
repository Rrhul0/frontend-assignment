import { useAppSelector } from './app/hooks'
import TxnsWidget from './components/txns.widget'
import { selectWallet } from './features/wallet/walletSlice'

export default function Stats() {
    const wallet = useAppSelector(selectWallet)

    if (wallet.status === 'dontKnow') return <>Loading</>

    return (
        <>
            <h2>Stats Page</h2>
            <TxnsWidget address={wallet.address} />
        </>
    )
}
