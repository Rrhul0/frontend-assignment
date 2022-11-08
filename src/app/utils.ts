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

    const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in to front-end Assignment Example App',
        uri: window.location.origin,
        version: '1',
        chainId: 10, // giving 10 as need to send to api
    })

    await signer.signMessage(message.prepareMessage())

    await sendData(address) //send data to api endpoint
}

export async function sendData(address: string) {
    const body = {
        walletAddress: address,
        chainId: 10,
        member: { did: '' },
    }
    try {
        const response = await fetch('https://dev-gcn.samudai.xyz/api/member/login', {
            method: 'POST',
            body: JSON.stringify(body),
        })
        if (response.status === 201) console.log('data successfully sent')
    } catch (e) {
        console.log('something wrong with sending data to api')
    }
}

// {
//     "walletAddress": <SIGNER_ADDRESS>,
//     "chainId": 10,
//     "member": {
//         "did": “”
//     }
//  }
