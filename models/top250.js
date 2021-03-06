var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/GMJwxBackend');
var Schema = mongoose.Schema;

var top250Schema = new Schema({
    id : String,
    title : String,
    titleEng : String,
    alias : Array,
    rate : Number,
    countries : Array,
    categories : Array,
    year : String,
    cover : String,
    director : String,
    starring : Array,
    summary : String
});

module.exports = mongoose.model('top250', top250Schema, 'top250');