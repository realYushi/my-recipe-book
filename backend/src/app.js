const express = require('express');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
const app = express();
const PORT = 5000;

connectDB()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));

app.use(express.json());

app.use('/api/users', userRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
