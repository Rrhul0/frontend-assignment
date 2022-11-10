import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import client from './app/connectWalletClient'
import { WagmiConfig } from 'wagmi'
import { Buffer } from 'buffer'

// polyfill Buffer for client
if (!window.Buffer) {
    window.Buffer = Buffer
}

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <WagmiConfig client={client}>
                    <App />
                </WagmiConfig>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
)
