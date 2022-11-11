import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import { useAccount, useDisconnect } from 'wagmi'

export default function Layout() {
    const { address, connector, isConnected } = useAccount()
    const { disconnect } = useDisconnect()

    return (
        <div className='h-screen w-screen flex '>
            {/* <header className='flex justify-between items-center w-full h-20 px-16 border-b '></header> */}

            <div className='basis-2/12 flex flex-col items-center justify-between h-full py-10 px-12 border-r'>
                <div className='flex flex-col items-center gap-24'>
                    <div className='text-center'>
                        <h1 className='font-extrabold text-4xl text-pink-400 uppercase'>Samudai</h1>
                        <h2 className='font-extrabold text-3xl text-pink-400 uppercase'>Assignment</h2>
                    </div>
                    <nav className=' flex flex-col text-center gap-12 font-bold text-xl text-stone-500'>
                        <Link className='text-lg hover:text-stone-900' to='/'>
                            Home
                        </Link>
                        <Link className='text-lg hover:text-stone-900' to='/dashboard'>
                            Dashboard
                        </Link>
                        <Link className='text-lg hover:text-stone-900' to='/stats'>
                            Statistics
                        </Link>
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
