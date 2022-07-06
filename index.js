const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require("uuid");
uuid();
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let comments = [
  {
    id: uuid(),
    username: "Michel",
    comment: "Thats what she said",
  },
  {
    id: uuid(),
    username: "Joey",
    comment: "How you doing!",
  },
  {
    id: uuid(),
    username: "Barney",
    comment: "it's gonna be legend wait for it dary legendary!!!",
  },
  {
    id: uuid(),
    username: "Berta",
    comment: "I ain't cleaning that up",
  },
  {
    id: uuid(),
    username: "Punit",
    comment: "Eat sleep code repeat",
  },
];

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const updatedComment = req.body.comment;
  const choosenComment = comments.find((c) => c.id === id);
  choosenComment.comment = updatedComment;
  res.redirect("/comments");
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  const foundComment = comments.find((c) => c.id === id);
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

app.listen(3000, () => {
  console.log("Tune is to port 3000");
});
