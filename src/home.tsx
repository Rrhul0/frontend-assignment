import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { HiMail } from 'react-icons/hi'

export default function Home() {
    return (
        <div className='flex flex-col justify-between min-h-full sm:px-4'>
            <section className='flex flex-col gap-2'>
                <h1 className='uppercase text-primary font-bold text-3xl pb-4'>Samudai Front-End Assignment</h1>
                <div className='text-primaryBg font-semibold text-2xl'>Page catalog:</div>
                <ol className='text-secondry flex flex-col gap-2'>
                    <li>
                        <Link to='/' className='text-pink-400 underline underline-offset-2 text-lg pr-2'>
                            Home
                        </Link>
                        current page
                    </li>
                    <li>
                        <Link to='/signin' className='text-pink-400 underline underline-offset-2 text-lg pr-2 '>
                            Sign In
                        </Link>
                        Sign in with Etherium
                    </li>
                    <li>
                        <Link to='/dashboard' className='text-pink-400 underline underline-offset-2 text-lg pr-2'>
                            Dashboard
                        </Link>
                        Auth/Signin Protected
                    </li>
                    <li>
                        <Link to='/stats' className='text-pink-400 underline underline-offset-2 text-lg pr-2'>
                            Stats/Statistics
                        </Link>
                        Auth/Signin Protected
                    </li>
                    <li>
                        <Link to='/dshjsd' className='text-pink-400 underline underline-offset-2 text-lg pr-2'>
                            404 page
                        </Link>
                        page with every route other then defined above
                    </li>
                </ol>
            </section>
            <section className='flex flex-col gap-4 items-start ml-auto'>
                <h2 className='uppercase text-primary font-bold text-2xl'>By Rahul</h2>
                <div className='text-blue-600 font-semibold'>Follow or Contact me</div>
                <div className='flex gap-8 text-primaryBg items-center'>
                    <a target='_blank' href='#l' rel='noreferrer' className='hover:text-blue-400'>
                        <BsLinkedin size='30' />
                    </a>
                    <a
                        target='_blank'
                        href='https://github.com/Rrhul0'
                        rel='noreferrer'
                        className='hover:text-blue-400'>
                        <BsGithub size='30' />
                    </a>
                    <a
                        target='_blank'
                        href='mailto:rahulraj1417@gmail.com'
                        rel='noreferrer'
                        className='hover:text-blue-400'>
                        <HiMail size='40' />
                    </a>
                </div>
            </section>
        </div>
    )
}
