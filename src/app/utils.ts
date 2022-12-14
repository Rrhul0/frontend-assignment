// import { providers } from 'ethers'
// import { SiweMessage } from 'siwe'

import ApiCalendar from 'react-google-calendar-api'

// export async function signIn(connector: 'metamask' | 'walletconnect') {
//     let provider: providers.Web3Provider

//     if (connector === 'walletconnect') {
//         // //connect with walletconnect
//         provider = new providers.Web3Provider(window.ethereum)
//     } else if (connector === 'metamask') {
//         //connect with metamask
//         provider = new providers.Web3Provider(window.ethereum)
//     } else return
//     const signer = provider.getSigner()
//     try {
//         await provider.send('eth_requestAccounts', [])
//     } catch (e) {
//         console.log('user rejected request')
//         return
//     }

//     const [address] = await provider.listAccounts()

//     if (!address) {
//         throw new Error('Address not found')
//     }

//     const chainId = await provider.getNetwork().then(({ chainId }) => chainId)

//     const message = new SiweMessage({
//         domain: window.location.host,
//         address,
//         statement: 'Sign in to front-end Assignment Example App',
//         uri: window.location.origin,
//         version: '1',
//         chainId, // giving 10 as need to send to api
//     })

//     await signer.signMessage(message.prepareMessage())

//     await sendData(address, chainId) //send data to api endpoint

//     return { address, balance: await (await signer.getBalance()).toString() }
// }

export async function sendData(address: `0x${string}`, chainId: number) {
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

// export async function getWallet() {
//     const provider = new providers.Web3Provider(window.ethereum)
//     const signer = provider.getSigner()
//     const address = await signer.getAddress()
//     const balance = await signer.getBalance()
//     return { address, balance }
// }

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || ''
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY || ''
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly'
const DISCOVERY_DOC = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']

export const apiCalendar = new ApiCalendar({
    clientId: CLIENT_ID,
    apiKey: API_KEY,
    scope: SCOPES,
    discoveryDocs: DISCOVERY_DOC,
})
