var wx = {};

wx.url = 'http://118.25.178.109/';
wx.token = 'wrsndm';
wx.EncodingAESKey = 'K0ePPEb896e6GjTRsc852VHwpwm7uDHcr3tyXUMETpY';

wx.config = {
    token: 'wrsndm',
    appid: 'wx65001218d29e581f',
    encodingAESKey: 'K0ePPEb896e6GjTRsc852VHwpwm7uDHcr3tyXUMETpY',
    checkSignature: false
  };

wx.reply = {
  how2use = "输入影片名即可搜索对应结果。\n输入影片对应id即可得到详细信息。\n输入*2018即可得到2018年热片名单。\n"
}
  

module.exports = wx;
