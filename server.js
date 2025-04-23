const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./connect/database');
const port = process.env.PORT || 5000;
const taskRouter = require('./routes/taskRoutes');
const userRouter = require('./routes/userRoutes');
const cors = require('cors');

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//CORS options to allow requests from frontend running on port 3000
const corsOptions = {
    origin: 'http://localhost:3000', // Allow only requests from this origin
    methods: 'GET,POST,PUT,DELETE', // Allow only these methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow only these headers
};
// Use CORS middleware with specified options
app.use(cors(corsOptions));

app.use('/api/tasks', taskRouter);
app.use('/api/users', userRouter);
app.use(errorHandler);
app.listen(port, () => console.log(`server is listening at port no: ${port}`));

