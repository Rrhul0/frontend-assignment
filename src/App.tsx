import { Route, Routes } from 'react-router'
import SignIn from './SignIn'
import Dashboard from './Dashboard'
import Stats from './Stats'
import Page404 from './404'
import Layout from './layout'
export default function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/' element={<Dashboard />} />
                <Route path='stats' element={<Stats />} />
                <Route path='signin' element={<SignIn />} />
                <Route path='*' element={<Page404 />} />
            </Route>
        </Routes>
    )
}
