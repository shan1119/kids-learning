var mongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/training";

function insertData(template, data, callback) {
  mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbase = db.db("training");
    dbase.collection(template).insertMany(data, (err, r) => {
      if (err) {
        callback(-1);
      } else {
        callback(1);
        db.close();
      }
    });
  });
}

async function getMaxId(template) {
  return new Promise((resolve, reject) => {
    mongoClient.connect(url, (err, db) => {
      if (err) throw err;
      var dbase = db.db("training");
      dbase
        .collection(template)
        .find()
        .sort({ id: -1 })
        .limit(1)
        .toArray((err, docs) => {
          if (err || docs == "") {
            resolve(1);
            db.close();
          } else {
            resolve(docs[0].id + 1);
            db.close();
          }
        });
    });
  });
}

async function getData(template, condition) {
  return new Promise((resolve, reject) => {
    mongoClient.connect(url, (err, db) => {
      if (err) reject(err);
      var dbase = db.db("training");
      dbase
        .collection(template)
        .find(condition)
        .toArray((err, docs) => {
          if (err) {
            reject(err);
            db.close();
          } else {
            resolve(docs);
            db.close();
          }
        });
    });
  });
}

function getData_async(template, condition, callback) {
  mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbase = db.db("training");
    dbase
      .collection(template)
      .find(condition)
      .toArray((err, docs) => {
        if (err) {
          throw err;
        } else {
          callback(docs);
          db.close();
        }
      });
  });
}

function getMaxId_async(template, callback) {
  mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbase = db.db("training");
    dbase
      .collection(template)
      .find()
      .sort({ id: -1 })
      .limit(1)
      .toArray((err, docs) => {
        if (err || docs == "") {
          callback(0);
          db.close();
        } else {
          callback(docs[0].id);
          db.close();
        }
      });
  });
}

function dropTemplate() {
  mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    console.log("Database created!");
    var dbase = db.db("training");
    console.log("db object points to the database : " + dbase.databaseName);
    dbase.dropCollection("template");
    db.close();
  });
}

function dropDB() {
  mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbase = db.db("training");
    dbase.dropDatabase();
    db.close();
  });
}

module.exports = {
  insertData,
  getData,
  getMaxId
};
