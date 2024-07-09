import express from "express";
import cors from "cors";
import "dotenv/config.js";
import connectDb from "./db.js";
const app = express();
import router from "./routes/router.js";

app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use("/api", router);

const port = process.env.PORT || 5500;
try {
  await connectDb();
  app.listen(port, () => {
    console.log(`Server connected to port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
