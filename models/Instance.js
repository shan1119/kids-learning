var mongoose = require("mongoose");
var InstanceSchema = new mongoose.Schema({
    // id: 1, templateid: 1, createTime: "2020/03/29 00:00:00", details: [instanceDetail,...]
    id: Number,
    templateid: Number,
    createTime: String,
    details: [{
        // id: 1,formularid: 1,formular: ["1", "+", "2", "=", "3"],qid: 2,answer: 3
        id: Number,
        formularid: Number,
        formular: [String],
        qid: Number,
        answer: Number
    }]
});
mongoose.model("instance", InstanceSchema);
module.exports = mongoose.model("instance");