import { useAccount, useEnsName } from 'wagmi'
import GoogleEvents from './components/googleEvents'
import LoginFirst from './components/loginFirst'

export default function Dashboard() {
    const { address, connector, isConnected } = useAccount()
    const { data: ensName } = useEnsName({ address })

    if (!isConnected) return <LoginFirst />

    return (
        <div className='sm:px-4  flex flex-col gap-6'>
            <div className='flex flex-col gap-2'>
                <h2 className='text-pink-400 font-bold text-4xl'>Wallet Properties</h2>
                <div className='border rounded-md py-4 px-4 lg:px-6'>
                    <div className='text-lg font-semibold text-primary flex flex-col lg:flex-row lg:gap-2'>
                        Address:
                        <span className='text-sm md:text-base lg:text-lg text-stone-700 '>
                            {ensName ? `${ensName} (${address})` : address}
                        </span>
                    </div>
                    <div>Connected to {connector?.name} Wallet</div>
                </div>
            </div>
            <GoogleEvents />
        </div>
    )
}
