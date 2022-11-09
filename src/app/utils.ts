import { providers } from 'ethers'
import { SiweMessage } from 'siwe'

export async function signIn() {
    const provider = new providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    try {
        await provider.send('eth_requestAccounts', [])
    } catch (e) {
        console.log('user rejected request')
        return
    }

    const [address] = await provider.listAccounts()

    if (!address) {
        throw new Error('Address not found')
    }

    const chainId = await provider.getNetwork().then(({ chainId }) => chainId)

    const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in to front-end Assignment Example App',
        uri: window.location.origin,
        version: '1',
        chainId, // giving 10 as need to send to api
    })

    await signer.signMessage(message.prepareMessage())

    await sendData(address, chainId) //send data to api endpoint

    return { address, balance: await (await signer.getBalance()).toString() }
}

export async function sendData(address: string, chainId: number) {
    const body = {
        walletAddress: address,
        chainId: chainId,
        member: { did: '' },
    }
    try {
        const response = await fetch('https://dev-gcn.samudai.xyz/api/member/demo/login', {
            method: 'POST',
            body: JSON.stringify(body),
        })
        if (response.ok) console.log('data successfully sent')
    } catch (e) {
        console.log('something wrong with sending data to api')
    }
}

export async function getWallet() {
    const provider = new providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    const balance = await signer.getBalance()
    return { address, balance }
}
