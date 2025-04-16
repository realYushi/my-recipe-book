const express = require('express');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
const ingredientRouter = require('./routes/ingredientRoutes');
const verifyToken = require('./middleware/firebase-auth');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));

mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.once('open', () => {
    console.log('MongoDB connected successfully');
    mongoose.connection.db.listCollections().toArray((err, collections) => {
        if (err) {
            console.error('Error listing collections:', err);
        } else {
            console.log('Available collections:', collections.map(c => c.name));
        }
    });
});

app.use(express.json());



app.use('/api/users', verifyToken, userRouter);
app.use('/api/ingredients', verifyToken, ingredientRouter);


app.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}`);
});
