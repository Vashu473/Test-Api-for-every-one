const express = require("express");
const { randomBytes } = require("crypto");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

// { name, age, id, location, email }
let users = {};

app.get("/get/users", (req, res) => res.status(200).send(users));
app.get("/get/user/:id", (req, res) => {
  let id = req.params.id;
  let user = users[id];
  res.status(200).send(user);
});
app.post("/add/user", (req, res) => {
  let id = randomBytes(4).toString("hex");
  users[id] = {
    ...req.body,
    id,
  };
  res.status(201).send("user created");
});
app.put("/update/user/:id", (req, res) => {
  let id = req.params.id;
  if (users[id]) {
    users[id] = req.body;
    res.status(202).send(users[id]);
  } else {
    res.status(403).send("user not found");
  }
});
app.patch("/update/user/:id", (req, res) => {
  let id = req.params.id;
  if (users[id]) {
    users[id] = { ...users[id], ...req.body };
    res.status(202).send(users[id]);
  } else {
    res.status(403).send("user not found");
  }
});
app.delete("/delete/user/:id", (req, res) => {
  let id = req.params.id;
  if (users[id]) {
    delete users[id];
    res.status(204).send("user deleted");
  } else {
    res.status(403).send("user not found");
  }
});
app.delete("/delete/all", (req, res) => {
  users = {};
  res.status(204).send("all users deleted");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
