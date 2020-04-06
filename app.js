const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const dateFormat = require("dateformat");

const data = require("./routes/createData");
const db = require("./db/accessDb");

const url = require("url");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// middleware for bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

var template = new Array(10);
var param = new Array(10);
var answer = new Array(10);

app.get("/", (req, res) => {
  res.sendfile("index.html");
});
app.get("/list", (req, res) => {
  // get template list
  let getlist = async function() {
    let list = await db.getData("template", {});
    res.render("list", {
      title: "weicome",
      message: "Hello World!",
      list: list
    });
  };

  getlist();
});
app.get("/template/:tpname/main", (req, res) => {
  // get templateid from query string
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var templateid = query.templateid;
  var templatename = req.params.tpname;

  // get instance and history
  let gethistory = async function() {
    var ins = new Array();
    let instance = await db.getData("instance", {});
    for (let index = 0; index < instance.length; index++) {
      let his = await db.getData("history", {
        instanceid: instance[index].id
      });
      ins.push({
        instanceid: instance[index].id,
        createtime: instance[index].createTime,
        history: his == undefined ? [] : his
      });
    }

    res.render("template/" + templatename + "/main", {
      id: templateid,
      instance: ins
    });
  };

  gethistory();
});
app.get("/template/:tpname/instance", (req, res) => {
  // get templateid from query string
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var templateid = query.templateid;
  var templatename = req.params.tpname;
  var instanceid = query.instanceid;

  let getinstance = async function() {
    var details = new Array(10);

    if (instanceid == undefined) {
      // create new instance
      instanceid = await db.getMaxId("instance");

      for (let index = 0; index < 10; index++) {
        if (index < 3) {
          param[index] = data.generate2(1);
        } else if (index < 6) {
          param[index] = data.generate2(2);
        } else {
          param[index] = data.generate3(index - 5);
        }
        // set question and answer
        var q = data.random(0, index < 6 ? 2 : 3) * 2;
        answer[index] = param[index][q];
        param[index][q] = "";

        //insert instanceDetails
        // { id: 1,formularid: 1,formular: ["1", "+", "2", "=", "3"],qid: 2,answer: 3 }
        details[index] = {
          formular: param[index],
          qid: q,
          answer: answer[index]
        };
      }

      // insert instance
      db.insertData(
        "instance",
        [
          {
            id: instanceid,
            templateid: parseInt(templateid),
            createTime: dateFormat(),
            details: details
          }
        ],
        cnt => {}
      );
    } else {
      // get instance
      instance = await db.getData("instance", {
        id: parseInt(instanceid),
        templateid: parseInt(templateid)
      });
      for (let index = 0; index < instance[0].details.length; index++) {
        param[index] = instance[0].details[index].formular;
        answer[index] = instance[0].details[index].answer;
      }
    }

    res.render("template/" + templatename + "/instance", {
      instanceid: instanceid,
      templateid: templateid,
      param: param
    });
  };

  getinstance();
});

app.get("/template/:tpname/check", (req, res) => {
  // get templateid from query string
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var templateid = query.templateid;
  var templatename = req.params.tpname;
  var instanceid = query.instanceid;
  var historyid = query.historyid;

  let gethistory = async function() {
    // get instance
    let instance = await db.getData("instance", {
      id: parseInt(instanceid),
      templateid: parseInt(templateid)
    });
    for (let index = 0; index < instance[0].details.length; index++) {
      param[index] = instance[0].details[index].formular;
      answer[index] = instance[0].details[index].answer;
    }

    // get history
    let history = await db.getData("history", {
      id: parseInt(historyid),
      instanceid: parseInt(instanceid)
    });

    res.render("template/" + templatename + "/check", {
      templateid: templateid,
      param: param,
      yourAnswer: history[0].yourAnswer,
      answer: answer,
      point: history[0].point
    });
  };

  gethistory();
});

app.post("/template/:tpname/check", (req, res) => {
  var instanceid = req.body.instanceid;
  var templateid = req.body.templateid;
  var templatename = req.params.tpname;
  let point = 0;
  for (let index = 0; index < answer.length; index++) {
    if (req.body.answer[index] == answer[index]) point++;
  }

  let check = async function() {
    let historyid = await db.getMaxId("history");
    // insert history
    // { id: 1, instanceid: 1, point: 100, cost: "01:30", yourAnswer: [] }
    db.insertData(
      "history",
      [
        {
          id: historyid,
          instanceid: parseInt(instanceid),
          point: point * 10,
          cost: "01:30", // TODO dummy
          yourAnswer: req.body.answer
        }
      ],
      cnt => {}
    );

    res.render("template/" + templatename + "/check", {
      templateid: templateid,
      param: param,
      yourAnswer: req.body.answer,
      answer: answer,
      point: point * 10
    });
  };

  check();
});
app.get("/Feb", (req, res) => {
  res.render("Feb");
});
app.get("/Feb-template", (req, res) => {
  res.render("Feb-template");
});
app.listen(3000, () => {
  console.log("Listening on port 3000!");
});
