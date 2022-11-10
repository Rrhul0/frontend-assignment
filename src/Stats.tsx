import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import BlockHeightWidget from './components/blockheight.widget'
import TxnsWidget from './components/txns.widget'
import { useAccount } from 'wagmi'
import { Link } from 'react-router-dom'

export default function Stats() {
    const { address, isConnected } = useAccount()

    const navigate = useNavigate()

    useEffect(() => {
        if (!isConnected) navigate('/signin')
    })

    return (
        <>
            <Link to='/'>Home</Link>
            <h2>Stats Page</h2>
            <h4>Address: {address}</h4>
            <TxnsWidget address={address} />
            <BlockHeightWidget />
        </>
    )
}
