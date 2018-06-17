var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var movie = require('../models/movie');
var top250 = require('../models/top250');
var p = require('../utils/parseInfo');
var wechatapi = require('wechat-api');
var menu = require('../config/menu.json');
var wx = require('../config/wx');

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
          case 'menu_btn_how2use': {
            res.reply(wx.reply.how2use);
            break;
          }
          case 'menu_btn_random': {
            movie.count({}, (err, c) => {
              movie.find({}, (err, doc) => {
                moviedoc = doc[parseInt(Math.random() * c)];
                res.reply([p.replyPicText(moviedoc)]);
              });
            });
            break;
          }
          case 'menu_btn_trend': {
            movie.find({year:new Date().getFullYear()}).sort({'rate':-1}).limit(20).exec((err, docs) => {
              result = "今年上映的精品电影有：\n";
              docs.forEach((item, index) => {
                result += p.parseQuery(item);
              });
              res.reply(result);
            });
            break;
          }
          case 'menu_btn_doubanList': {
            top250.find().sort({rate:-1}).limit(20).exec((err, docs) => {
              result = "豆瓣高分榜单：\n";
              docs.forEach((item, index) => {
                result = result + "NO." + (index+1).toString() + p.parseQuery(item);
              });
              res.reply(result);
              res.reply(result);
            });
            break;
          }
        }
      }
    }
  } else if (message.MsgType === 'text') {
    if(/[0-9]{5,9}/.test(message.Content)) {
      movie.findOne({id:(message.Content)}).exec((err, doc) => {
        if(doc) {
          res.reply([p.replyPicText(doc)]);
        } else {
          res.reply(wx.reply.notFound);
        }
      });
    } else if(/^\*[0-9]{4}$/.test(message.Content)) {
      movie.find({year:(message.Content).toString()}).sort({'rate':-1}).limit(20).exec((err, docs) => {
        if(docs) {
          result = message.Content + "上映的精品电影有：\n";
          docs.forEach((item, index) => {
            result += p.parseQuery(item);
          });
          res.reply(result);
        } else {
          res.reply(wx.reply.notFound);
        }
      });
    } else if(/^#.{2}$/.test(message.Content)) {
      movie.find({categories:message.Content.toString().slice(1)}).sort({'rate':-1}).limit(20).exec((err, docs) => {
        if(docs) {
          result = message.Content.slice(1) + "类型的电影有：\n";
          docs.forEach((item, index) => {
            result += p.parseQuery(item);
          });
          res.reply(result);
        } else {
          res.reply(wx.reply.notFound);
        }
      });
    } else if(/!.+/.test(message.Content)) {
      movie.find({starring:new RegExp(message.Content.toString().slice(1))}).sort({'rate':-1}).limit(20).exec((err, docs) => {
        if(docs) {
          result = message.Content.slice(1) + "主演的电影有：\n";
          docs.forEach((item, index) => {
            result += p.parseQuery(item);
          }) 
          res.reply(result);
        } else {
          res.reply(wx.reply.notFound);
        }
      });
    } else {
      movie.find({title:new RegExp(message.Content.toString())}).sort({'rate':-1}).limit(20).exec((err, docs) => {
        if(docs) {
          result = "关于" + message.Content.slice(1) + "的电影有：\n";
          docs.forEach((item, index) => {
            result += p.parseQuery(item);
          }) 
          res.reply(result);
        } else {
          res.reply(wx.reply.notFound);
        }
      });
    }
  } else {
    res.reply(wx.reply.how2use);
  }
}));

module.exports = router;