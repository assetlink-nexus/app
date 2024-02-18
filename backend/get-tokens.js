const express = require("express");
const cors = require('cors');
const { ethers } = require('ethers');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
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

app.get("/getTokens", async (req, res) => {
    // Use getTokenDetails here
    getTokenDetails(tokenAddresses)
    .then(details => {
        console.log(details); // Log details to console
        res.json(details); // Send details back to client
    })
    .catch(error => console.error(error));
    
});


function authenticateUser(username, password) {
    // Hardcoded username and password
    const hardcodedUsername = 'dominik@gmail.com';
    const hardcodedPassword = 'Hack1234!';
  
    // Check if the provided credentials match the hardcoded ones
    return new Promise((resolve) => {
      if (username === hardcodedUsername && password === hardcodedPassword) {
        resolve(true); // Authentication successful
      } else {
        resolve(false); // Authentication failed
      }
    });
  }

// app.use(bodyParser.json());

// Login endpoint
app.post('/login', async (req, res) => {
    // Extract username and password from the request body
    const { username, password } = req.body;
  
    try {
      // Placeholder for database user authentication logic
      // You should replace this with actual database query
      const user = await authenticateUser(username, password);
      
      if (user) {
        // User authentication successful
        // Generate and return a secret key or token
        // In a real application, use a secure method to generate this
        const secretKey = "DDD-001"; // This should be replaced with a secure key generation logic
        res.json({ success: true, secretKey });
      } else {
        // Authentication failed
        res.status(401).json({ success: false, message: 'Authentication failed' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

app.post('/createOrder', async (req, res) => {
    const { secretKey } = req.body;
  
    // Validate the secret key
    if (secretKey !== process.env.EXPECTED_SECRET_KEY) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
  
    try {
      const transactionHash = await createAccountAndMintNft();
      res.json({ success: true, transactionHash });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
  
app.post("/createOrder", (req, res) => {
    const authToken = req.headers["x-auth-token"];

    if (!authToken) {
        return res.status(403).json("Unauthorized"); // Authorization error
    }

    // Tutaj logika weryfikacji tokena i pobierania tokenów
    // Na potrzeby przykładu zwrócimy sukces bez rzeczywistej weryfikacji
    res.status(200).json(responses.tokenEnvelope);
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json(responses.messageResponse); // Server error
});


app.listen(port, () => {
    console.log(`Application listening at http://localhost:${port}`);
});



    module.exports = { getTokenDetails };
