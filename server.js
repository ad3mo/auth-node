const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./controllers/UserController");

//express app
const app = express();

//global middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/user", userRouter);

//listen for reqs
const PORT = 3001;
app.listen(PORT, async () => {
  const dbconnection = await mongoose
    .connect("mongodb://127.0.0.1:27017/db")
    .then(console.log("connect to db "))
    .catch((err) => {
      console.log(err);
    });

  console.log(`Server is running on port ${PORT}.`);
});
