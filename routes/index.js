var express = require('express');
var router = express.Router();
var wx = require('../config/wx');
var crypto = require('crypto');
var xml2js = require('xml2js');
var parse = new xml2js.Parser();
var builder = new xml2js.Builder();

/* GET home page. */
router.get('/', function(req, res, next) {
  var token = wx.token;
  var signature = req.query.signature;
  var nonce = req.query.nonce;
  var timestamp = req.query.timestamp;
  var echostr = req.query.echostr;
  var str = [token, timestamp, nonce].sort().join('');
  var sha = crypto.createHash('sha1').update(str).digest('hex');

  if(sha === signature) {
    res.send(echostr + '');
  } else {
    res.send('error');
  }
});

module.exports = router;
