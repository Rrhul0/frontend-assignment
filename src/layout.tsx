import { Outlet } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import { useAccount, useDisconnect } from 'wagmi'
import { MdOpenInNew } from 'react-icons/md'

export default function Layout() {
    const { address, connector, isConnected } = useAccount()
    const { disconnect } = useDisconnect()

    return (
        <div className='h-screen w-screen flex '>
            {/* <header className='flex justify-between items-center w-full h-20 px-16 border-b '></header> */}

            <div className='basis-2/12 flex flex-col items-center justify-between h-full py-10 px-12 border-r'>
                <div className='flex flex-col items-center gap-24'>
                    <div className='text-center'>
                        <h1 className='font-extrabold text-4xl text-primary uppercase'>Samudai</h1>
                        <h2 className='font-extrabold text-3xl text-secondry uppercase'>Assignment</h2>
                    </div>
                    <nav className=' flex flex-col text-center gap-12 font-bold text-xl text-secondry'>
                        <NavLink
                            className={'text-xl hover:text-stone-900 '}
                            style={({ isActive }) => (isActive ? { color: 'rgb(28 25 23 )' } : undefined)}
                            to='/'>
                            Home
                        </NavLink>
                        <NavLink
                            className='text-lg hover:text-stone-900'
                            style={({ isActive }) => (isActive ? { color: 'rgb(28 25 23 )' } : undefined)}
                            to='/dashboard'>
                            Dashboard
                        </NavLink>
                        <NavLink
                            className='text-lg hover:text-stone-900'
                            style={({ isActive }) => (isActive ? { color: 'rgb(28 25 23 )' } : undefined)}
                            to='/stats'>
                            Statistics
                        </NavLink>
                        <a
                            href='https://github.com/Rrhul0/frontend-assignment'
                            target='_blank'
                            rel='noreferrer'
                            className='text-lg hover:text-stone-900'>
                            <div className='flex items-center gap-2'>
                                GitHub
                                <MdOpenInNew />
                            </div>
                        </a>
                    </nav>
                </div>
                {isConnected ? (
                    <div className='flex gap-3 items-center'>
                        <button
                            className='border-2 rounded-lg px-6 py-1 text-lg hover:bg-pink-200 border-pink-200'
                            onClick={() => disconnect()}>
                            LogOut
                        </button>
                    </div>
                ) : (
                    <Link
                        to='/signin'
                        className='border-2 rounded-lg px-6 py-1 text-lg hover:bg-pink-200 border-pink-200'>
                        SignIn
                    </Link>
                )}
            </div>
            <main className='px-16 py-4 flex-auto'>
                <Outlet />
            </main>
        </div>
    )
}
