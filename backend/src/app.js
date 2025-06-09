import express from "express";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import ingredientRouter from "./routes/ingredientRoutes.js";
import recipeRouter from "./routes/recipeRoutes.js";
import verifyToken from "./middleware/firebase-auth.js";
import scrapeRouter from "./routes/scrapeRoutes.js";
import mongoose from "mongoose";
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connected successfully");
  mongoose.connection.db.listCollections().toArray((err, collections) => {
    if (err) {
      console.error("Error listing collections:", err);
    } else {
      console.log(
        "Available collections:",
        collections.map((c) => c.name)
      );
    }
  });
});

app.use(express.json());

app.use("/api/users", verifyToken, userRouter);
app.use("/api/ingredients", verifyToken, ingredientRouter);
app.use("/api/recipes", verifyToken, recipeRouter);
app.use("/api/scrape", verifyToken, scrapeRouter);

app.listen(PORT, () => {
  console.log(`Server is running and listening on port ${PORT}`);
});
