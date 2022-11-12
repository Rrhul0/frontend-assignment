import { Outlet } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import { useAccount, useDisconnect } from 'wagmi'
import { MdOpenInNew, MdOutlineSpaceDashboard } from 'react-icons/md'
import { useAppDispatch } from './app/hooks'
import { logOut } from './features/events/eventSlice'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'
import { ImStatsDots, ImGithub } from 'react-icons/im'
import { FiHome } from 'react-icons/fi'
import { useState } from 'react'

export default function Layout() {
    const [showFull, setShowFull] = useState(false)
    const { isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const dispatch = useAppDispatch()

    return (
        <div className='h-screen w-screen flex pl-16 md:pl-0'>
            <div
                className={
                    (showFull ? 'px-10' : ' px-4 ') +
                    ' absolute z-10 left-0 top-0 md:static bg-white md:basis-2/12 flex flex-col items-center justify-between h-full py-10 md:px-12 border-r'
                }>
                <div className=' flex flex-col items-center gap-16 '>
                    <Link to='/' className='hidden md:block text-center border-b-2 pb-2'>
                        <h1 className='font-extrabold text-4xl text-primary uppercase'>Samudai</h1>
                        <h2 className='font-extrabold text-3xl text-secondry uppercase'>Assignment</h2>
                    </Link>
                    <button className='md:hidden self-start pl-1' onClick={() => setShowFull(o => !o)}>
                        {showFull ? <GrClose size='25' /> : <GiHamburgerMenu size='25' />}
                    </button>
                    <nav className='flex flex-col gap-12 font-bold text-xl text-secondry'>
                        <NavLink
                            className={'text-xl hover:text-stone-900 '}
                            style={({ isActive }) => (isActive ? { color: 'rgb(28 25 23 )' } : undefined)}
                            to='/'>
                            <div className='flex items-center gap-2'>
                                <FiHome size='30' />
                                <div className={showFull ? 'block' : 'hidden md:block'}>Home</div>
                            </div>
                        </NavLink>
                        <NavLink
                            className='text-lg hover:text-stone-900'
                            style={({ isActive }) => (isActive ? { color: 'rgb(28 25 23 )' } : undefined)}
                            to='/dashboard'>
                            <div className='flex items-center gap-2'>
                                <MdOutlineSpaceDashboard size='32' />
                                <div className={showFull ? 'block' : 'hidden md:block'}>Dashboard</div>
                            </div>
                        </NavLink>
                        <NavLink
                            className='text-lg hover:text-stone-900'
                            style={({ isActive }) => (isActive ? { color: 'rgb(28 25 23 )' } : undefined)}
                            to='/stats'>
                            <div className='flex items-center gap-2 pl-1.5'>
                                <ImStatsDots size='22' />
                                <div className={showFull ? 'block' : 'hidden md:block'}>Statistics</div>
                            </div>
                        </NavLink>
                        <a
                            href='https://github.com/Rrhul0/frontend-assignment'
                            target='_blank'
                            rel='noreferrer'
                            className='text-lg hover:text-stone-900'>
                            <div className='flex items-center gap-2'>
                                <div className='flex items-center gap-2 pl-1'>
                                    <ImGithub size='22' />
                                    <div className={showFull ? 'block' : 'hidden md:block'}>GitHub</div>
                                    <MdOpenInNew className={showFull ? 'block' : 'hidden md:block'} />
                                </div>
                            </div>
                        </a>
                    </nav>
                </div>
                <div className={showFull ? 'block' : 'hidden md:block'}>
                    {isConnected ? (
                        <div className='flex gap-3 items-center'>
                            <button
                                className='border-2 rounded-lg px-6 py-1 text-lg hover:bg-pink-200 border-pink-200'
                                onClick={() => {
                                    disconnect()
                                    dispatch(logOut())
                                }}>
                                LogOut
                            </button>
                        </div>
                    ) : (
                        <NavLink
                            to='/signin'
                            style={({ isActive }) => (isActive ? { background: 'rgb(251 207 232)' } : undefined)}
                            className='border-2 rounded-lg px-6 py-1 text-lg hover:bg-pink-200 border-pink-200'>
                            SignIn
                        </NavLink>
                    )}
                </div>
            </div>
            <main
                className='h-full p-4 flex flex-col gap-4 flex-auto overflow-scroll'
                onClick={() => setShowFull(false)}>
                <Link to='/' className='md:hidden '>
                    <h1 className='font-extrabold text-4xl text-primary uppercase border-b-2 pb-2 w-fit mb-4m px-4'>
                        Samudai <span className='text-secondry'>Assignment</span>
                    </h1>
                </Link>
                <Outlet />
            </main>
        </div>
    )
}
