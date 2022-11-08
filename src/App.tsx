import './App.css'
import { ethers } from 'ethers'
import { SiweMessage } from 'siwe'

function App() {
    async function onClickSignIn() {
        //(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const domain = window.location.host
        const origin = window.location.origin
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        await provider.send('eth_requestAccounts', []) //.catch(() => console.log('user rejected request'))

        const signer = provider.getSigner()

        function createSiweMessage(address: string, statement: string) {
            const message = new SiweMessage({
                domain,
                address,
                statement,
                uri: origin,
                version: '1',
                chainId: 1,
            })
            return message.prepareMessage()
        }
        const message = createSiweMessage(await signer.getAddress(), 'Sign in with Ethereum to the app.')
        console.log(await signer.signMessage(message))
    }

    return (
        <div className='App'>
            <button
                onClick={e => {
                    onClickSignIn().then(() => console.log('done'))
                }}>
                Sign in with Etherium (MetaMask Wallet)
            </button>
        </div>
    )
}

export default App
