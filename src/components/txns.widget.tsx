import { useEffect, useState } from 'react'
import { BsQuestionCircleFill } from 'react-icons/bs'
import { GrRefresh } from 'react-icons/gr'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectTxns, updateTxns } from '../features/transactions/transationsSlice'
import TxnCard from './TxnCard'

//api endpoint
const API_ENDPOINT = 'https://api.blockcypher.com/v1/eth/main/addrs/' //<ADDR>

export default function TxnsWidget({ address }: { address?: `0x${string}` }) {
    const dispatch = useAppDispatch()
    const txnsRedux = useAppSelector(selectTxns)

    const txns = txnsRedux.txns

    useEffect(() => {
        if (txns.length === 0) return
        getTxns()
    }, [address])

    async function getTxns() {
        if (!address) return

        try {
            const res = await fetch(API_ENDPOINT + address)
            const resJson = await res.json()
            if (resJson.txrefs) dispatch(updateTxns(resJson.txrefs?.flat()))
            else dispatch(updateTxns([]))
        } catch {
            console.log('something wrong with fetching transactions')
        }
    }

    return (
        <div className='bg-[#0B45F5] overflow-hidden lg:col-span-4 shadow-zinc-700  shadow-2xl text-white rounded-3xl px-8 py-6'>
            <div className='flex items-center justify-between border-b-2 pb-2'>
                <div className='flex items-center gap-3'>
                    <h3 className='font-bold text-3xl'>Transactions</h3>
                    <div className='relative flex flex-col items-center group'>
                        <BsQuestionCircleFill size={20} />
                        <div className='absolute  left-7 -top-7 z-10 hidden flex-row mb-6 group-hover:flex'>
                            <span className=' p-2 text-xs leading-none  text-primary whitespace-no-wrap bg-white shadow-lg rounded-md'>
                                All Transactions made by logged in wallet
                            </span>
                        </div>
                    </div>
                </div>
                <div className='relative flex flex-col items-center group'>
                    <button onClick={() => getTxns()} className='bg-blue-400 p-2 rounded-lg'>
                        <GrRefresh />
                    </button>
                    <div className='absolute bottom-0 flex-col z-10 items-center hidden mb-9 group-hover:flex'>
                        <span className='p-2 text-xs leading-none text-primary whitespace-no-wrap bg-white shadow-lg rounded-md'>
                            Refresh
                        </span>
                        <div className='w-3 h-3 -mt-2 rotate-45 bg-white'></div>
                    </div>
                </div>
            </div>
            {txns.length ? (
                <ul className='overflow-scroll pb-10 h-full'>
                    {txns.map(txn => (
                        <TxnCard key={txn.hash} txn={txn} />
                    ))}
                </ul>
            ) : (
                <div className='py-4 text-lg'>No transactions made from this wallet</div>
            )}
        </div>
    )
}
