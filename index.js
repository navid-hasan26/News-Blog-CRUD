const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const sequelize = require("./Database/database");
const userPost = require("./api/Controllers/posts/crud");
const user_crud = require("./api/Controllers/user/crud");
const user_auth = require("./api/Controllers/user/register_login");
const Post = require("./api/Models/post");
const User = require("./api/Models/user");
const cors = require("cors");


app.listen(3000, () => console.log("express server is running at port 3000"));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors())

app.use("/api/posts", userPost);
app.use("/api/user", user_crud);
app.use("/api/auth", user_auth);

User.hasMany(Post, {
  onDelete: "CASCADE",
});

sequelize.sync();

app.get("/", (req, res) => {
  res.send("Welcome to Homepage");
});
