import { sendData } from './app/utils'
import { useNavigate } from 'react-router'
import { useConnect } from 'wagmi'

export default function SignIn() {
    const navigate = useNavigate()
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect({
        onSuccess(data) {
            sendData(data.account, data.chain.id)
            navigate('/')
        },
    })

    return (
        <div className='flex flex-col items-center justify-evenly min-h-full w-fit mx-auto gap-5'>
            <h2 className='md:px-10 text-6xl font-bold text-primary '>Sign in with Etherium Wallets</h2>
            <div className='grid sm:grid-cols-2 sm:grid-rows-2 gap-4'>
                {connectors.map(connector => (
                    <button
                        className='flex h-60 md:h-48 lg:h-60 aspect-square flex-col gap-4 text-center justify-center items-center border rounded-lg text-secondry font-semibold hover:text-primary'
                        disabled={!connector.ready}
                        key={connector.id}
                        onClick={() => connect({ connector })}>
                        <div className='w-[80px] aspect-square flex items-center justify-center'>
                            <img
                                width='80'
                                height='80'
                                alt={connector.name + ' logo'}
                                src={(connector.name === 'Coinbase Wallet' ? 'coinbase' : connector.name) + '.png'}
                            />
                        </div>
                        <h3 className='text-3xl'>
                            {connector.name}

                            <div className='text-xl'>{!connector.ready && ' (unsupported)'}</div>
                            <div className='text-xl'>
                                {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
                            </div>
                        </h3>
                    </button>
                ))}
            </div>
            {error && <div className='text-2xl font-semibold text-secondry'>{error.message}</div>}
        </div>
    )
}
