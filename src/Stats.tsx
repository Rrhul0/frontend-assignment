import BlockHeightWidget from './components/blockheight.widget'
import TxnsWidget from './components/txns.widget'
import { useAccount } from 'wagmi'
import LoginFirst from './components/loginFirst'

export default function Stats() {
    const { address, isConnected } = useAccount()

    if (!isConnected) return <LoginFirst />

    return (
        <div className='grid lg:grid-cols-6 lg:grid-rows-2 w-full h-full gap-8 p-4 '>
            <TxnsWidget address={address} />
            <div className='bg-[#0B45F5] lg:col-span-2 shadow-zinc-700  shadow-2xl rounded-2xl p-8 hidden lg:flex items-center justify-center text-[#f59191] text-3xl font-bold'>
                Widget not configured
            </div>
            <div className='bg-[#0B45F5] lg:col-span-3  shadow-zinc-700  shadow-2xl rounded-2xl p-8 hidden lg:flex items-center justify-center text-[#f59191] text-3xl font-bold'>
                Widget not configured
            </div>
            <BlockHeightWidget />
        </div>
    )
}
