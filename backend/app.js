const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(cors());

// Definicje odpowiedzi - przykładowe, należy dostosować do swoich potrzeb
const responses = {
    tokenEnvelope: {
        /* struktura danych zwracana w przypadku sukcesu, należy zdefiniować */
    },
    messageResponse: { message: "Error" }, // Należy dostosować
};

app.get("/getTokens", (req, res) => {
    const tokens = [
        { tokenName: "TokenA", value: "123" },
        { tokenName: "TokenB", value: "456" },
        { tokenName: "TokenC", value: "789" },
    ];

    res.json(tokens);
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
    console.log(`Aplikacja nasłuchuje na http://localhost:${port}`);
});
