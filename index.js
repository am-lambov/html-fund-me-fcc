import { ethers } from './ethers-6.7.0.min.js'
import { abi, contractAddress } from './constants.js'

const connectButton = document.getElementById('connectButton')
const fundButton = document.getElementById('fundButton')
const withdrawButton = document.getElementById('withdrawButton')
const ballanceButton = document.getElementById('balanceButton')
connectButton.onclick = connect
fundButton.onclick = fund
withdrawButton.onclick = withdraw
ballanceButton.onclick = getBalance

async function connect() {
    if (typeof (window.ethereum !== 'undefined')) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' })
        } catch (error) {
            console.log(error)
        }
        connectButton.classList.add('connectedButton')
        connectButton.innerHTML = 'Connected!'
    } else {
        console.log('Please install Metamask to interact with the FundMe App')
    }
}

async function getBalance() {
    if (typeof (window.ethereum !== 'undefined')) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        try {
            const balance = await provider.getBalance(contractAddress)
            console.log(`Ballance is: ${ethers.formatEther(balance)} ETH`)
        } catch (error) {
            console.log(error)
        }
    }
}

async function withdraw() {
    if (typeof (window.ethereum !== 'undefined')) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            await contract
                .cheaperWithdraw()
                .then(async (transactionResponse) => {
                    await transactionResponse.wait(1)
                    await listenForTransactionMine(
                        transactionResponse,
                        provider,
                    )
                })
        } catch (error) {
            console.log(error)
        }
    }
}

async function fund() {
    const ethAmount = document.getElementById('ethAmount').value
    console.log(`Funding with ${ethAmount}...`)
    if (typeof (window.ethereum !== 'undefined')) {
        console.log(`Funding ${ethAmount}...`)
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            await contract
                .fund({
                    value: ethers.parseEther(ethAmount),
                })
                .then(async (transactionResponse) => {
                    await transactionResponse.wait(1)
                    await listenForTransactionMine(
                        transactionResponse,
                        provider,
                    )
                })
            console.log('Done!')
        } catch (error) {
            console.log(error)
        }
    }
}

function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}`)
    return new Promise((resolve, reject) => {
        try {
            provider.once(
                transactionResponse.hash,
                async (transactionReceipt) => {
                    const num = await transactionReceipt.confirmations()
                    console.log(`Completed with ${num} confirmations. `)
                    resolve()
                },
            )
        } catch (error) {
            reject(error)
        }
    })
}
