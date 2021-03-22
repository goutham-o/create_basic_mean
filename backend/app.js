const express = require("express");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const app = express();

mongoose
  .connect(
    "mongodb+srv://angular_node:MxlRvnm7N26fHGAS@cluster0.usbxl.mongodb.net/post_user?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then((con) => {
    console.log(`Connected to Database ${con.connection.host}`);
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
