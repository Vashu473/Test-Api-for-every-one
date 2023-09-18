const express = require("express");
const { randomBytes } = require("crypto");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// { name, age, id, location, email }
let users = {};

app.get("/get/users", (req, res) => res.json(users));
app.get("/get/user/:id", (req, res) => {
  let id = req.params.id;
  let user = users[id];
  res.json(user);
});
app.post("/add/user", (req, res) => {
  let id = randomBytes(4).toString("hex");
  users[id] = {
    ...req.body,
    id,
  };
  res.json("user created");
});
app.put("/update/user/:id", (req, res) => {
  let id = req.params.id;
  if (users[id]) {
    users[id] = req.body;
    res.json(users[id]);
  } else {
    res.json("user not found");
  }
});
app.patch("/update/user/:id", (req, res) => {
  let id = req.params.id;
  if (users[id]) {
    users[id] = { ...users[id], ...req.body };
    res.json(users[id]);
  } else {
    res.json("user not found");
  }
});
app.delete("/delete/user/:id", (req, res) => {
  let id = req.params.id;
  if (users[id]) {
    delete users[id];
    res.json("user deleted");
  } else {
    res.json("user not found");
  }
});
app.delete("/delete/all", (req, res) => {
  users = {};
  res.json("all users deleted");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
