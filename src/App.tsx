import './App.css'
import { SiweMessage } from 'siwe'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { selectWallet, update } from './features/wallet/walletSlice'
import { providers } from 'ethers'

function createSiweMessage(address: string, statement: string) {
    const domain = window.location.host
    const origin = window.location.origin
    const message = new SiweMessage({
        domain,
        address,
        statement,
        uri: origin,
        version: '1',
        chainId: 1,
    })
    return message.prepareMessage()
}

async function getWalletAndStore(signer: providers.JsonRpcSigner) {
    const address = await signer.getAddress()
    const balance = await signer.getBalance()
    return { address, balance }
}

async function signIn(provider: providers.Web3Provider, signer: providers.JsonRpcSigner) {
    try {
        await provider.send('eth_requestAccounts', []) //.catch(() => )
    } catch (e) {
        console.log('user rejected request')
        return
    }

    const message = createSiweMessage(await signer.getAddress(), 'Sign in with Ethereum to the app.')
    console.log(await signer.signMessage(message), await signer.getAddress())
}

function App() {
    const [loggedIn, setLoggedIn] = useState(true)
    const wallet = useAppSelector(selectWallet)
    const dispatch = useAppDispatch()
    const provider = new providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    if (loggedIn)
        getWalletAndStore(signer)
            .then(values => {
                dispatch(update({ address: values.address, balance: values.balance.toString() }))
            })
            .catch(() => setLoggedIn(false))

    return (
        <div className='App'>
            <button
                className={loggedIn ? 'hidden' : ''}
                onClick={() => signIn(provider, signer).then(() => setLoggedIn(true))}>
                Sign in with Etherium (MetaMask Wallet)
            </button>
            <h2>Wallet address</h2>
            <div>{wallet.status === 'loggedIn' ? wallet.address : 'Not logged in'}</div>
            <div>{wallet.status === 'loggedIn' ? wallet.balance : null}</div>
        </div>
    )
}

export default App
