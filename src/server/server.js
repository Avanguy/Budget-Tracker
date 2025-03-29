import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import userRoute from  "./routes/userRoute.js"
import mongoose from "mongoose";
import transactionRoute from "./routes/transactionRoute.js";
const app = express();
// Middleware 
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173", // Replace with your frontend URL in production
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allows cookies/auth headers
};

app.use(cors(corsOptions));
app.use(express.json()); // No need for body-parser
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
// Routes 

app.get('/', (req, res) => {
    res.send('Server is running...');
});
// Start the server
app.use('/api/users', userRoute);
app.use('/api/transaction', transactionRoute);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log('Listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });