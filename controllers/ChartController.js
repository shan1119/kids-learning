const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const dateFormat = require("dateformat");

const data = require("../routes/createData").default;

const url = require("url");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// middleware for bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/main", (req, res) => {
    res.render("Chart/main");
});
app.get("/instance", (req, res) => {
    // get templateid from query string
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var templateid = query.templateid;
    res.render("Chart/index" + templateid);
});

app.get("/check", (req, res) => {});

app.post("/check", (req, res) => {});

module.exports = app;