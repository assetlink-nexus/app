const express = require('express');
const bodyParser = require('body-parser'); // For parsing JSON request body

const app = express();
const port = 3000;


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

app.use(bodyParser.json());

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
  

  
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });