var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/GMJwxBackend');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
    id : String,
    title : String,
    titleEng : String,
    alias : Array,
    rate : Double,
    countries : Array,
    categories : Array,
    year : String,
    cover : String,
    director : String,
    starring : Array,
    summary : String
});

module.exports.user = db.model('movie', movieSchema, 'movie');