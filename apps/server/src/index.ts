import app from "./app";
import connectDB from "./config/connectDB";
import dotenv from "dotenv";
import { initialzeRedis } from "./config/redist";

dotenv.config(); // Load environment variables

const port = process.env.PORT || 8000;
export let redis: any; // Global Redis instance

const startServer = async () => {
  try {
    // Initialize MongoDB
    await connectDB();

    // Initialize Redis
    redis = await initialzeRedis();

    // Start Express server
    app.listen(port, () => {
      console.log(`Server started on port ${port}: http://localhost:${port}`);
    });
  } catch (error: any) {
    console.error("Error starting the server:", error.message);
    process.exit(1); // Exit the process on failure
  }
};

startServer();
