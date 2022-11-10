import { Wallet } from 'ethers'
import { useEffect, useState } from 'react'

//api endpoint
const API_ENDPOINT = 'https://api.blockcypher.com/v1/eth/main/addrs/' //<ADDR>

export default function TxnsWidget({ address }: { address: string | null }) {
    const [txns, setTxns] = useState<Array<any>>([])

    useEffect(() => {
        getTxns(address)
    }, [address])

    async function getTxns(address: string | null) {
        if (!address) return

        try {
            const res = await fetch(API_ENDPOINT + address)
            const resJson = await res.json()
            console.log(resJson)
            if (resJson.txrefs) setTxns(resJson.txrefs)
            else setTxns([])
        } catch {
            console.log('something wrong with fetching api')
        }
    }

    if (!address) return <>No address found</>

    return (
        <>
            <button onClick={() => getTxns(address)}>Refresh Txns</button>
            {txns.length ? (
                <ul>
                    {txns.map((txn: any) => (
                        <li key={txn.tx_hash}>
                            <div>txn hash: {txn.tx_hash}</div>
                            <div>block height: {txn.block_height}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No transactions made from this wallet</div>
            )}
        </>
    )
}
