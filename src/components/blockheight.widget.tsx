import { useBlockNumber } from 'wagmi'

export default function BlockHeightWidget() {
    const { data } = useBlockNumber({ watch: true })

    return <>Current Block Height: {data}</>
}
