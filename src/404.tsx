import { Link } from 'react-router-dom'

export default function Page404() {
    return (
        <main className='flex flex-col items-start justify-center h-full w-fit mx-auto px-6'>
            <div className='rounded-2xl text-white bg-secondry py-1 px-2'>Page not found</div>
            <h1 className='text-6xl font-bold text-primary py-5'>Oh No! Error 404</h1>
            <h2 className='text-secondry font-semibold'>
                You've moved so fast and got lost.
                <br /> Come back to Homepage
            </h2>
            <Link to='/' className='bg-primaryBg text-[#E1E6F0] px-2.5 py-1.5 rounded-lg font-semibold my-4'>
                Back to Homepage
            </Link>
        </main>
    )
}
