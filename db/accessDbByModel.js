var mongoose = require("mongoose");
var Template = require("../models/Template")
var Instance = require("../models/Instance")
var History = require("../models/History")
var url = "mongodb://localhost:27017/training";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function getAllList(model) {
  return model.find().sort({
    id: 1
  });
}
async function getByCondition(model, condition) {
  return model.find(condition).sort({
    id: 1
  });
}
async function getMaxId(model) {
  return new Promise((resolve, reject) => {
    model.find()
      .sort({
        id: -1
      })
      .limit(1)
      .exec((err, docs) => {
        if (err || docs == "") {
          resolve(1);
        } else {
          resolve(docs[0].id + 1);
        }
      })
  });
}

async function insert(model, doc) {
  return model.create(doc);
}

async function remove(model, condition) {
  return model.deleteMany(condition);
}

// init Template
async function init(condition) {
  let list = await getByCondition(Template, condition);
  if (list.length == 0) {
    insertTemplate(condition);
  }
}

async function insertTemplate(condition) {
  if (condition.name == "name") {
    await insert(Template, [{
      "id": 1,
      "name": "Cal",
      "visible": "true",
      "description": "Calculate Test",
      "formular": [{
        "id": 1,
        "formular": "generate2(1)"
      }, {
        "id": 2,
        "formular": "generate2(1)"
      }, {
        "id": 3,
        "formular": "generate2(1)"
      }, {
        "id": 4,
        "formular": "generate2(2)"
      }, {
        "id": 5,
        "formular": "generate2(2)"
      }, {
        "id": 6,
        "formular": "generate2(2)"
      }, {
        "id": 7,
        "formular": "generate3(1)"
      }, {
        "id": 8,
        "formular": "generate3(2)"
      }, {
        "id": 9,
        "formular": "generate3(3)"
      }, {
        "id": 10,
        "formular": "generate3(4)"
      }]
    }]);
  } else if (condition.name == "Chart") {
    await insert(Template, [{
      "id": 2,
      "name": "Chart",
      "visible": "true",
      "description": "Chart Training",
      "formular": []
    }]);
  } else if (condition.name == "Guess") {
    await insert(Template, [{
      "id": 3,
      "name": "Guess",
      "visible": "true",
      "description": "Guess Number Training",
      "formular": []
    }]);
  }
}

module.exports = {
  getAllList,
  getByCondition,
  getMaxId,
  insert,
  remove,
  init
};