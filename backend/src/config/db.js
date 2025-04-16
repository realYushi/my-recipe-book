import mongoose from 'mongoose';

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://database:27017/recipe-book');
    console.log('MongoDB connected');
};

export default connectDB;