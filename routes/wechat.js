var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var movie = require('../models/movie');
var parse = require('../utils/parseInfo');
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
var events = new Event();
events.add('menu_btn_random', (req, res, next) => {
  if(req.message.event == 'click') {
    movie.count({}, (err, c) => {
      movie.find({}, (err, doc) => {
        moviedoc = doc[parseInt(Math.random() * c)];
        res.reply([
          {
            title: moviedoc.title,
            description: parse(moviedoc),
            picurl: moviedoc.cover,
            url: 'https://movie.douban.com/subject/'+moviedoc.id
          }
        ]);
      });
    });
  }
});
var handle = Event.dispatch(events);

router.use(express.query());
router.use('/', wechat(config).event(handle).middlewarify());
router.use('/', wechat(config, (req, res, next) => {
  var message = req.weixin;
  if(message.Content === '随便看看') {
    movie.count({}, (err, c) => {
      movie.find({}, (err, doc) => {
        moviedoc = doc[parseInt(Math.random() * c)];
        res.reply([
          {
            title: moviedoc.title,
            description: parse(moviedoc),
            picurl: moviedoc.cover,
            url: 'https://movie.douban.com/subject/'+moviedoc.id
          }
        ]);
      });
    });
  } else {
    res.reply('111');
  }
}));

module.exports = router