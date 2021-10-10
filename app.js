const express = require("express");
const users = require("./db/users.json");
const fs = require("fs");
const app = express();
const port = 1212;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/gameplay", (req, res) => {
  res.render("gameplay");
});

app.get("/users", (req, res) => {
  console.log(users);
  res.status(200).json(users);
});

app.get("/loginpage", (req, res) => {
  res.render("loginPage");
});

app.get("/register", (req, res) => {
  res.render("registerPage");
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  const newUser = {
    email,
    password,
  };

  users.push(newUser);
  // fs.writeFileSync("/data/user.json", JSON.stringify(users));
  res.status(201).redirect("/loginpage");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  for (user of users) {
    if (user.email === email && user.password === password) {
      return res.redirect("/gameplay");
    }
  }
  res.status(400).json({
    message: "wrong email or password",
  });
});

app.listen(port, () => {
  console.log(`listen at port: ${port}`);
});
