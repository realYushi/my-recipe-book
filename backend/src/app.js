import express from 'express';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import ingredientRouter from './routes/ingredientRoutes.js';
import verifyToken from './middleware/firebase-auth.js';
import mongoose from 'mongoose';
import recipeRouter from './routes/recipeRoutes.js';
import testAuth from './middleware/test-auth.js';
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


// Test routes
// app.use('/api/users', testAuth, userRouter);

app.use('/api/users', verifyToken, userRouter);
app.use('/api/ingredients', verifyToken, ingredientRouter);
app.use('/api/recipes', verifyToken, recipeRouter);


app.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}`);
});
