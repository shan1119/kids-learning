const express = require("express");
const app = express();
const db = require("./db/accessDbByModel");
var CalController = require("./controllers/CalController");
var ChartController = require("./controllers/ChartController");
var GuessController = require("./controllers/GuessController");
const path = require("path");
var Template = require("./models/Template")

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use("/Cal", CalController);
app.use("/Chart", ChartController);
app.use("/Guess", GuessController);

app.get("/", (req, res) => {
  res.sendfile("index.html");
});
app.get("/list", (req, res) => {
  // get template list
  let getlist = async function () {
    let list = await db.getAllList(Template);
    res.render("list", {
      title: "weicome",
      message: "Hello World!",
      list: list
    });
  };

  getlist();
});

app.listen(3000, () => {
  db.init({
    name: "Cal"
  });
  db.init({
    name: "Chart"
  });
  db.init({
    name: "Guess"
  });
  console.log("Listening on port 3000!");
});