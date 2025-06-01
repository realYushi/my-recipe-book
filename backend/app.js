import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import userRouter from "./src/routes/userRoutes.js";
import ingredientRouter from "./src/routes/ingredientRoutes.js";
import recipeRouter from "./src/routes/recipeRoutes.js";
import scrapeRouter from "./src/routes/scrapeRouter.js";
import verifyToken from "./src/middleware/firebase-auth.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Test route
app.get("/api/test-direct", (req, res) => {
  res.send("✅ Direct route working!");
});

// Mount routers
app.use("/api/users", verifyToken, userRouter);
app.use("/api/ingredients", verifyToken, ingredientRouter);
app.use("/api/recipes", verifyToken, recipeRouter);
app.use("/api/scrape", scrapeRouter); // 🧽 Unprotected route for now
console.log("✅ Mounting scrapeRouter at /api/scrape");

// MongoDB Connection
connectDB()
  .then(() => {
    console.log("✅ Connected to MongoDB");

    mongoose.connection.once("open", () => {
      mongoose.connection.db.listCollections().toArray((err, collections) => {
        if (err) {
          console.error("⚠️ Error listing collections:", err);
        } else {
          console.log(
            "📦 Available collections:",
            collections.map((c) => c.name)
          );
        }
      });
    });

    app.get("/api/scrape/test-direct", (req, res) => {
      res.send("✅ Test direct route works");
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB runtime error:", err);
});
