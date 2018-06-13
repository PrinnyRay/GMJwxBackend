var express = require('express');
var router = express.Router();
var wechat = require('wechat');

var config = {
  token: 'wrsndm',
  appid: 'wx65001218d29e581f',
  appsecret: '803205e4df183ea4832d650c8355bd5d',
  encodingAESKey: 'K0ePPEb896e6GjTRsc852VHwpwm7uDHcr3tyXUMETpY',
  checkSignature: true
};

router.use(express.query());

router.use('/', wechat(config, (req, res, next) => {
  var message = req.weixin;
  if(message.Content === '随便看看') {
    res.reply('呵呵');
  } else {
    res.reply('111');
  }
}));

module.exports = router