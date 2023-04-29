const express = require("express");
const cors = require("cors");
const { connection } = require("./configs/db");
const { UserRouter } = require("./Routes/User.routes");
const { ServicesRoutes } = require("./Routes/Services.Routes");
const { DiscountRoutes } = require("./Routes/Discount.Routes");


require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/user",UserRouter);
app.use("/services",ServicesRoutes)
app.use("/discount",DiscountRoutes)

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connect to db");
  } catch (err) {
    console.log("Error while connecting to DB");
    console.log(err);
  }
  console.log(`Server running at ${process.env.port}`);
});
