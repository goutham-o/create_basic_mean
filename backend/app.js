const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/post");
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

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  // console.log(post);
  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Post Added Successfully",
        postId: createdPost._id
      });
    })
    .catch();
});

app.get("/api/posts", (req, res, next) => {
  posts = Post.find()
    .then((documents) => {
      res.status(200).json({
        message: "Posts fetched succesfully!",
        posts: documents,
      });
    })
    .catch((err) => console.log(err));
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "Post deleted" });
    })
    .catch();
});

module.exports = app;
