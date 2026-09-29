import express from "express";
import { initDB } from "./database/db.js";
import config from "./config/index.js";

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const port = config.port;
 initDB();


// app.use("/api/v1/auth", authRoute);




app.get("/", (req, res) => {
  res.status(200).json({
    message: "This is the root route",
    path: req.path,
  });
});
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});