import { Route, Routes } from 'react-router'
import SignIn from './SignIn'
import Dashboard from './Dashboard'
import Stats from './Stats'
import Page404 from './404'
import { useEffect } from 'react'
import { useAppDispatch } from './app/hooks'
import { getWallet } from './app/utils'
import { setLoggedOut, update } from './features/wallet/walletSlice'

export default function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        getWallet()
            .then(values => {
                dispatch(update({ address: values.address, balance: values.balance.toString() }))
            })
            .catch(() => dispatch(setLoggedOut()))
    }, [])

    return (
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='stats' element={<Stats />} />
            <Route path='signin' element={<SignIn />} />
            <Route path='*' element={<Page404 />} />
        </Routes>
    )
}
