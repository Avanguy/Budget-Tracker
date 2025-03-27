import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoute from  "./routes/userRoute.js"
import mongoose from "mongoose";
const app = express();
// Middleware 
app.use(cors());
app.use(bodyParser.json());
console.log("")
// Routes 
app.get('/', (req, res) => {
    res.send('Server is running...');
});
// Start the server
app.use('/api/users', userRoute);
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