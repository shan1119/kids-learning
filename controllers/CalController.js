const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const dateFormat = require("dateformat");
var Template = require("../models/Template")
var Instance = require("../models/Instance")
var History = require("../models/History")

const data = require("../routes/createData");
const db = require("../db/accessDbByModel");

const url = require("url");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// middleware for bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var template = new Array(10);
var param = new Array(10);
var answer = new Array(10);

app.get("/main", (req, res) => {
    // get templateid from query string
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var templateid = query.templateid;

    // get instance and history
    let gethistory = async function () {
        var ins = new Array();
        let instance = await db.getAllList(Instance);
        for (let index = 0; index < instance.length; index++) {
            let his = await db.getByCondition(History, {
                instanceid: instance[index].id
            });
            ins.push({
                instanceid: instance[index].id,
                createtime: instance[index].createTime,
                history: his == undefined ? [] : his
            });
        }

        res.render("Cal/main", {
            id: templateid,
            instance: ins
        });
    };

    gethistory();
});
app.get("/instance", (req, res) => {
    // get templateid from query string
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var templateid = query.templateid;
    var instanceid = query.instanceid;

    let getinstance = async function () {
        var details = new Array(10);

        if (instanceid == undefined) {
            // create new instance
            instanceid = await db.getMaxId(Instance);

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
            db.insert(
                Instance,
                [{
                    id: instanceid,
                    templateid: parseInt(templateid),
                    createTime: dateFormat(),
                    details: details
                }]
            );
        } else {
            // get instance
            instance = await db.getByCondition(Instance, {
                id: parseInt(instanceid),
                templateid: parseInt(templateid)
            });
            for (let index = 0; index < instance[0].details.length; index++) {
                param[index] = instance[0].details[index].formular;
                answer[index] = instance[0].details[index].answer;
            }
        }

        res.render("Cal/instance", {
            instanceid: instanceid,
            templateid: templateid,
            param: param
        });
    };

    getinstance();
});

app.get("/check", (req, res) => {
    // get templateid from query string
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var templateid = query.templateid;
    var instanceid = query.instanceid;
    var historyid = query.historyid;

    let gethistory = async function () {
        // get instance
        let instance = await db.getByCondition(Instance, {
            id: parseInt(instanceid),
            templateid: parseInt(templateid)
        });
        for (let index = 0; index < instance[0].details.length; index++) {
            param[index] = instance[0].details[index].formular;
            answer[index] = instance[0].details[index].answer;
        }

        // get history
        let history = await db.getByCondition(History, {
            id: parseInt(historyid),
            instanceid: parseInt(instanceid)
        });

        res.render("Cal/check", {
            templateid: templateid,
            param: param,
            yourAnswer: history[0].yourAnswer,
            answer: answer,
            cost: history[0].cost,
            point: history[0].point
        });
    };

    gethistory();
});

app.post("/check", (req, res) => {
    var instanceid = req.body.instanceid;
    var templateid = req.body.templateid;
    var timer = req.body.cost;

    let point = 0;
    for (let index = 0; index < answer.length; index++) {
        if (req.body.answer[index] == answer[index]) point++;
    }

    let check = async function () {
        let historyid = await db.getMaxId(History);
        // insert history
        // { id: 1, instanceid: 1, point: 100, cost: "01:30", yourAnswer: [] }
        db.insert(
            History,
            [{
                id: historyid,
                instanceid: parseInt(instanceid),
                point: point * 10,
                cost: timer,
                yourAnswer: req.body.answer
            }],
            cnt => {}
        );

        res.render("Cal/check", {
            templateid: templateid,
            param: param,
            yourAnswer: req.body.answer,
            answer: answer,
            cost: timer,
            point: point * 10
        });
    };

    check();
});

module.exports = app;