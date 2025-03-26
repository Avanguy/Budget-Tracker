import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const PORT = process.env.PORT || 3000;
const app = express();
// Middleware 
app.use(cors());
app.use(bodyParser.json());

// Routes 
app.get('/', (req, res) => {
    res.send('Server is running...');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});