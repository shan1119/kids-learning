const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const dateFormat = require("dateformat");
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
var answer = new Array(20);

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

        res.render("Unit/main", {
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
                let sign = data.random(1, 2);
                let i = data.random(0, data.unitSet.rate.length - 1);
                let rate = data.unitSet.rate[i];
                param[index] = data.generateUnit(sign, i);
                console.log(param[index]);
                // set question and answer
                var q = data.random(0, 2) * 5;
                answer[2 * index] = param[index][q];
                answer[2 * index + 1] = param[index][q + 2];
                param[index][q] = "";
                param[index][q + 2] = "";

                //insert instanceDetails
                // { id: 1,formularid: 1,formular: ["1", "+", "2", "=", "3"],qid: 2,answer: 3 }
                details[index] = {
                    formular: param[index],
                    qid: rate,
                    answer: answer[2 * index] * rate + answer[2 * index + 1]
                };
            }
            console.log(answer);

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
                let rate = instance[0].details[index].qid;
                let ai = instance[0].details[index].answer;
                answer[2 * index] = Math.floor(ai / rate);
                answer[2 * index + 1] = ai - answer[2 * index] * rate;
            }
        }

        res.render("Unit/instance", {
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
            let rate = instance[0].details[index].qid;
            let ai = instance[0].details[index].answer;
            answer[2 * index] = Math.floor(ai / rate);
            answer[2 * index + 1] = ai - answer[2 * index] * rate;
        }

        // get history
        let history = await db.getByCondition(History, {
            id: parseInt(historyid),
            instanceid: parseInt(instanceid)
        });

        res.render("Unit/check", {
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
    for (let index = 0; index < answer.length / 2; index++) {
        if (req.body.answer[2 * index] == answer[2 * index] &&
            req.body.answer[2 * index + 1] == answer[2 * index + 1]) point++;
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

        res.render("Unit/check", {
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