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
                res.reply([
                  {
                    title: moviedoc.title,
                    description: p.parse(moviedoc),
                    picurl: moviedoc.cover,
                    url: 'https://movie.douban.com/subject/'+moviedoc.id
                  }
                ]);
              });
            });
            break;
          }
          case 'menu_btn_trend': {
            movie.find({year:2018}).sort({'rate':1}).limit(10).exec((err, docs) => {
              result = "查询到的结果为：\n";
              docs.forEach((item, index) => {
                result += p.parseQuery(item);
              });
              res.reply(result);
            })
          }
        }
      }
    }
  } else {
    res.reply('111');
  }
}));

module.exports = router