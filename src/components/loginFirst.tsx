import { Link } from 'react-router-dom'

export default function LoginFirst() {
    return (
        <main className='flex flex-col items-start justify-center h-full w-fit mx-auto px-6'>
            <h1 className='text-6xl font-bold text-primary py-5'>Oh No! Not Logged In</h1>
            <h2 className='text-secondry font-semibold'>
                You've not Logged In yet, Please Login first
                <br />
                Then come back to this Page
            </h2>
            <Link to='/signin' className='bg-primaryBg text-[#E1E6F0] px-2.5 py-1.5 rounded-lg font-semibold my-4'>
                Go to SignIn Page
            </Link>
        </main>
    )
}
