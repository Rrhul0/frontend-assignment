import { txn } from '../features/transactions/transationsSlice'

export default function TxnCard({ txn }: { txn: txn }) {
    return (
        <li className='py-2 border-b text-sm'>
            <h4 className=''>{txn.hash}</h4>
            <div className='flex justify-between'>
                <div>Block {txn.blockHeight.toString()}</div>
                <div>{txn.confirmedDate?.split('T')[0]}</div>
            </div>
        </li>
    )
}
