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
  how2use: "输入影片名即可搜索对应结果。\n输入影片对应id即可得到详细信息。\n输入 *2017 即可得到2017年热片名单。\n输入 #动作 即可得到动作类热片名单。\n输入 !吴京 即可获得由吴京主演的热片名单。\n默认输出条目为20条，所有符号为英文半角符号。",
  notFound: "没有找到对应的记录。"
}
  

module.exports = wx;
