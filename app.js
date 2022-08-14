const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const sequelize = require("./Database/database");
const userPost = require("./API/Controllers/posts/crud");
const user_crud = require("./API/Controllers/user/crud");
const user_auth = require("./API/Controllers/user/register_login");
const Post = require("./API/Models/post");
const User = require("./API/Models/user");
const cors = require("cors");


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

app.listen(3000, () => {console.log("express server is running at port 3000")});
