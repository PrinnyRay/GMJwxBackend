var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var movie = require('../models/movie');
var parse = require('../utils/parseInfo');

var config = {
  token: 'wrsndm',
  appid: 'wxbf3f7205b87b088f',
  appsecret: 'ff510609e99295cb143c30a3cc6d2ad5',
  encodingAESKey: 'K0ePPEb896e6GjTRsc852VHwpwm7uDHcr3tyXUMETpY',
  checkSignature: false
};

router.use(express.query());

router.use('/', wechat(config, (req, res, next) => {
  var message = req.weixin;
  if(message.Content === '随便看看') {
    movie.count({}, (err, c) => {
      movie.find({}, (err, doc) => {
        movie = doc[parseInt(Math.random() * c)]
        res.reply(parse(movie));
      })
    })
  } else {
    res.reply('111');
  }
}));

module.exports = router