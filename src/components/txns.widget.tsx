import { useEffect, useState } from 'react'

//api endpoint
const API_ENDPOINT = 'https://api.blockcypher.com/v1/eth/main/addrs/' //<ADDR>

export default function TxnsWidget({ address }: { address: string | null }) {
    const [txns, setTxns] = useState<Array<any> | null>(null)

    useEffect(() => {
        if (!address) {
            console.log('no address')
            return
        }
        getTxns(address).catch(() => console.log('something wrong with fetching api'))
    }, [address])

    async function getTxns(address: string) {
        const res = await fetch(API_ENDPOINT + address)
        const resJson = await res.json()
        console.log(resJson)
        if (resJson.txrefs) setTxns(resJson.txrefs)
        else setTxns(null)
    }

    if (!txns) return <>No transactions made from this wallet</>
    return (
        <ul>
            {txns.map((txn: any) => (
                <li key={txn.tx_hash}>
                    <div>txn hash: {txn.tx_hash}</div>
                    <div>block height: {txn.block_height}</div>
                </li>
            ))}
        </ul>
    )
}
