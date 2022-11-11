import { useBlockNumber } from 'wagmi'
import { BsQuestionCircleFill } from 'react-icons/bs'

export default function BlockHeightWidget() {
    const { data } = useBlockNumber({ watch: true })

    return (
        <div className='col-span-3 flex flex-col items-center justify-center gap-4 bg-[#0B45F5] shadow-zinc-700 shadow-2xl text-white rounded-3xl p-8'>
            <div className='flex items-center gap-3'>
                <h3 className='font-bold text-3xl'>Current Block Height </h3>
                <div className='relative flex flex-col items-center group'>
                    <BsQuestionCircleFill size={20} />
                    <div className='absolute bottom-0 z-10 flex-col items-center hidden mb-6 group-hover:flex'>
                        <span className='p-2 text-xs leading-none text-primary whitespace-no-wrap bg-white shadow-lg rounded-md'>
                            Current Etherium Block height (Websocket)
                        </span>
                        <div className='w-3 h-3 -mt-2 rotate-45 bg-white'></div>
                    </div>
                </div>
            </div>
            <h4 className='font-extrabold text-5xl drop-shadow-2xl'>{data}</h4>
        </div>
    )
}
