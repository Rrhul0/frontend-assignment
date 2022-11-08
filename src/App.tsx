import './App.css'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { selectWallet, update } from './features/wallet/walletSlice'
import { providers } from 'ethers'
import { signIn } from './app/utils'

async function getWalletAndStore() {
    const provider = new providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    const balance = await signer.getBalance()
    return { address, balance }
}

function App() {
    const [loggedIn, setLoggedIn] = useState(true)
    const wallet = useAppSelector(selectWallet)
    const dispatch = useAppDispatch()

    if (loggedIn)
        getWalletAndStore()
            .then(values => {
                dispatch(update({ address: values.address, balance: values.balance.toString() }))
            })
            .catch(() => setLoggedIn(false))

    return (
        <div className='App'>
            <button className={loggedIn ? 'hidden' : ''} onClick={() => signIn().then(() => setLoggedIn(true))}>
                Sign in with Etherium (MetaMask Wallet)
            </button>
            <h2>Wallet address</h2>
            <div>{wallet.status === 'loggedIn' ? wallet.address : 'Not logged in'}</div>
            <div>{wallet.status === 'loggedIn' ? wallet.balance : null}</div>
        </div>
    )
}

export default App
