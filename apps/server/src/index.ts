import app from "./app";
import connectDB from "./config/connectDB";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.port || 8000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server Started at port : 3000  http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Error Starting Server");
  });
