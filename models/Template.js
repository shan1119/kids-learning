var mongoose = require("mongoose");
var TemplateSchema = new mongoose.Schema({
    id: Number,
    name: String,
    visible: String,
    description: String,
    formular: [{
        id: Number,
        formular: String
    }]
});
mongoose.model("template", TemplateSchema);
module.exports = mongoose.model("template");