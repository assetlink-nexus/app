const { ethers } = require('ethers');


// Assuming all tokens have the same ABI because they're ERC20
const erc20ABI = [
    // Minimal ABI to interact with ERC20 tokens
    "function name() view returns (string)",
    "function totalSupply() view returns (uint256)"
];

const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/cVeMsJt089c_8f0uAVD6fKYWauwwzLne');


// Example usage with multiple addresses
const tokenAddresses = [
    '0xF9bF96f50c0553430a779B415ecF990Fe8C7e4Cb',
    '0xF66D6B91303904769E925129C71B51Dda1AC9868'
];

// Function to get token details for multiple addresses
async function getTokenDetails(tokenAddresses) {
    const tokenDetails = [];

    for (const address of tokenAddresses) {
        const contract = new ethers.Contract(address, erc20ABI, provider);

        try {
            const name = await contract.name();
            const totalSupply = await contract.totalSupply();
            const formattedTotalSupply = ethers.utils.formatUnits(totalSupply, 18);

            tokenDetails.push({ address, name, totalSupply: formattedTotalSupply });
        } catch (error) {
            console.error(`Failed to fetch details for token at ${address}: ${error}`);
            // Consider how you want to handle errors for individual tokens
        }
    }

    return tokenDetails;
}


getTokenDetails(tokenAddresses)
    .then(details => console.log(details))
    .catch(error => console.error(error));