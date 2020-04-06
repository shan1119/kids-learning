var mongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

function createCollection() {
  mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    console.log("Database created!");
    dbase = db.db("training");
    console.log("db object points to the database : " + dbase.databaseName);

    dbase.collection("template").insertMany([
      {
        id: 1,
        name: "Jan",
        visible: "true",
        description: "January Test",
        formular: [
          { id: 1, formular: "generate2(1)" },
          { id: 2, formular: "generate2(1)" },
          { id: 3, formular: "generate2(1)" },
          { id: 4, formular: "generate2(2)" },
          { id: 5, formular: "generate2(2)" },
          { id: 6, formular: "generate2(2)" },
          { id: 7, formular: "generate3(1)" },
          { id: 8, formular: "generate3(2)" },
          { id: 9, formular: "generate3(3)" },
          { id: 10, formular: "generate3(4)" }
        ]
      },
      {
        id: 2,
        name: "Feb",
        visible: "true",
        description: "February Test",
        formular: [
          { id: 1, formular: "generate2(1)" },
          { id: 2, formular: "generate2(1)" },
          { id: 3, formular: "generate2(1)" },
          { id: 4, formular: "generate2(2)" },
          { id: 5, formular: "generate2(2)" },
          { id: 6, formular: "generate2(2)" },
          { id: 7, formular: "generate3(1)" },
          { id: 8, formular: "generate3(2)" },
          { id: 9, formular: "generate3(3)" },
          { id: 10, formular: "generate3(4)" }
        ]
      }
    ]);
    // dbase.collection("instance").insertMany([]);
    // dbase.collection("instanceDetail").insertMany([]);
    // dbase.collection("history").insertMany([]);
    // dbase.collection("historyDetail").insertMany([]);

    db.close();
  });
}

function dropCollection(collection) {
  mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    dbase = db.db("traing");
    dbase.dropCollection(collection);
    db.close();
  });
}

createCollection();
// dropCollection("template");
