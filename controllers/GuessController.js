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

var sums = new Array(3);
var cards = new Array(4);
var answer = new Array(4);

app.get("/main", (req, res) => {
    // get templateid from query string
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var templateid = query.templateid;

    // get instance and history
    let gethistory = async function () {
        var ins = new Array();
        let instance = await db.getByCondition(Instance, {
            templateid: templateid
        });
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

        res.render("Guess/main", {
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
        var details = new Array(4);

        if (instanceid == undefined) {
            // create new instance
            instanceid = await db.getMaxId(Instance);
            answer = data.getNumberSet();
            for (let index = 0; index < 4; index++) {
                details[index] = {
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
                answer[index] = instance[0].details[index].answer;
            }
        }
        sums[0] = answer[0] + answer[1] + answer[2];
        sums[1] = answer[0] + answer[2] + answer[3];
        sums[2] = answer[1] + answer[2] + answer[3];
        cards = [...answer].sort((a, b) => a - b);

        res.render("Guess/instance", {
            instanceid: instanceid,
            templateid: templateid,
            sums: sums,
            cards: cards,
            answer: answer,
            name: ["まりちゃん", "ゆきちゃん", "なっちゃん", "さきちゃん"]
            // name: ["Aくん", "Bくん", "Cちゃん", "Dちゃん"]
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
            answer[index] = instance[0].details[index].answer;
        }

        // get history
        let history = await db.getByCondition(History, {
            id: parseInt(historyid),
            instanceid: parseInt(instanceid)
        });

        sums[0] = answer[0] + answer[1] + answer[2];
        sums[1] = answer[0] + answer[2] + answer[3];
        sums[2] = answer[1] + answer[2] + answer[3];
        cards = [...answer].sort((a, b) => a - b);

        res.render("Guess/check", {
            templateid: templateid,
            yourAnswer: history[0].yourAnswer,
            answer: answer,
            sums: sums,
            cards: cards,
            cost: history[0].cost,
            point: history[0].point,
            // name: ["Aくん", "Bくん", "Cちゃん", "Dちゃん"]
            name: ["まりちゃん", "ゆきちゃん", "なっちゃん", "さきちゃん"]
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
                point: point * 25,
                cost: timer,
                yourAnswer: req.body.answer
            }],
            cnt => {}
        );

        res.render("Guess/check", {
            templateid: templateid,
            yourAnswer: req.body.answer,
            answer: answer,
            sums: sums,
            cards: cards,
            cost: timer,
            point: point * 25,
            // name: ["Aくん", "Bくん", "Cちゃん", "Dちゃん"]
            name: ["まりちゃん", "ゆきちゃん", "なっちゃん", "さきちゃん"]
        });
    };

    check();
});

module.exports = app;