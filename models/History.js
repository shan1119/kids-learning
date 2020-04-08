var mongoose = require("mongoose");
var HistorySchema = new mongoose.Schema({
    // id: 1, instanceid: 1, point: 100, cost: "01:30", yourAnswer: []
    id: Number,
    instanceid: Number,
    point: Number,
    cost: String,
    yourAnswer: [String]
});
mongoose.model("history", HistorySchema);
module.exports = mongoose.model("history");