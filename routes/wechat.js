var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var movie = require('../models/movie');
var p = require('../utils/parseInfo');
var wechatapi = require('wechat-api');
var menu = require('../config/menu.json');
var Event = require('wechat').Event;

var config = {
  token: 'wrsndm',
  appid: 'wxbf3f7205b87b088f',
  appsecret: 'ff510609e99295cb143c30a3cc6d2ad5',
  encodingAESKey: 'K0ePPEb896e6GjTRsc852VHwpwm7uDHcr3tyXUMETpY',
  checkSignature: false
};
var api = new wechatapi(config.appid, config.appsecret);
api.createMenu(menu, () => {
  console.log('菜单初始化成功');
});

router.use(express.query());
// router.use('/', wechat(config).event(handle).middlewarify());
router.use('/', wechat(config, (req, res, next) => {
  var message = req.weixin;
  if(message.MsgType === 'event') {
    switch(message.Event) {
      case 'CLICK': {
        switch(message.EventKey) {
          case 'menu_btn_random': {
            movie.count({}, (err, c) => {
              movie.find({}, (err, doc) => {
                moviedoc = doc[parseInt(Math.random() * c)];
                res.reply([p.replyPicText(doc)]);
              });
            });
            break;
          }
          case 'menu_btn_trend': {
            movie.find({year:2018}).sort({'rate':1}).limit(10).exec((err, docs) => {
              result = "2018年上映的精品电影有：\n";
              docs.forEach((item, index) => {
                result += p.parseQuery(item);
              });
              res.reply(result);
            });
          }
        }
      }
    }
  } else if(message.MsgType === 'text') {
    if(/[0-9]{5,9}/.test(message.Content)) {
      movie.findOne({id:(message.Content).toString()}).exec((err, doc) => {
        if(doc) {
          res.reply([p.replyPicText(doc)]);
        } else {
          res.reply("没有找到对应的记录。");
        }
      });
    }
  } else {
    res.reply('111');
  }
}));

module.exports = router