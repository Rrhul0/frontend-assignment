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
        <div>
            <h2>Sign in with Etherium</h2>
            <div>
                {connectors.map(connector => (
                    <button disabled={!connector.ready} key={connector.id} onClick={() => connect({ connector })}>
                        {connector.name}
                        {!connector.ready && ' (unsupported)'}
                        {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
                    </button>
                ))}

                {error && <div>{error.message}</div>}
            </div>
        </div>
    )
}
