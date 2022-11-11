export default function TxnCard({ txn }: { txn: any }) {
    return (
        <li className='py-2 border-b text-sm'>
            <h4 className=''>{txn.tx_hash}</h4>
            <div className='flex justify-between'>
                <div>Block: {txn.block_height}</div>
                <div>Confirmed Date: {txn.confirmed?.split('T')[0]}</div>
            </div>
        </li>
    )
}
