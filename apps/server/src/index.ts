import app from "./app";
import connectDB from "./config/connectDB";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server Started at port : ${port}  http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Error Starting Server");
  });
