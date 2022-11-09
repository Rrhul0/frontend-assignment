import './App.css'
import { useAppDispatch } from './app/hooks'
import { update } from './features/wallet/walletSlice'
import { signIn } from './app/utils'
import { useNavigate } from 'react-router'

export default function SignIn() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    function onClickSignIn() {
        signIn()
            .then(res => {
                res && dispatch(update(res))
                navigate('/')
            })
            .catch(() => console.log('something wrong with signin process'))
    }

    return (
        <div className='App'>
            <button onClick={onClickSignIn}>Sign in with Etherium (MetaMask Wallet)</button>
        </div>
    )
}
