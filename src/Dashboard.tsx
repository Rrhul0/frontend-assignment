import { useAccount, useEnsName } from 'wagmi'
import GoogleEvents from './components/googleEvents'

export default function Dashboard() {
    const { address, connector, isConnected } = useAccount()
    const { data: ensName } = useEnsName({ address })

    return (
        <>
            {isConnected ? (
                <div>
                    <div className='text-lg text-pink-400 font-bold'>Wallet Properties</div>
                    <div className='border rounded-md py-2 px-3'>
                        <div className='text-lg font-semibold'>
                            Address:
                            <span className='text-lg text-stone-700'>
                                {ensName ? `${ensName} (${address})` : address}
                            </span>
                        </div>
                        <div>Connected to {connector?.name}</div>
                    </div>
                    <GoogleEvents />
                </div>
            ) : (
                <>Please Login with your Etherium Wallet first!</>
            )}
        </>
    )
}
