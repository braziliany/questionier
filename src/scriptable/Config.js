// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: plus;
/*
 * Author: evilbutcher
 * Github: https://github.com/evilbutcher
 */

module.exports = {
  bilibili: () => 129, //👈就改这个数字。B站榜单对应关系：0全站，1动画，3音乐，4游戏，5娱乐，36科技，119鬼畜，129舞蹈。
  blnum: () => 6, //自定义B站显示数量
  blrancolor: () => true, //是否开启B站随机颜色
  dbnum: () => 6, //自定义豆瓣显示数量
  dbrancolor: () => true, //是否开启豆瓣随机颜色
  rrnum: () => 6, //自定义人人影视显示数量
  rrrancolor: () => true, //是否开启人人影视随机颜色
  rsslink: () =>
    "https://www.solidot.org/index.rss", //👈就改引号里的链接。
  rssnum: () => 6, //自定义RSS显示数量
  rssrancolor: () => true, //是否开启RSS随机颜色
  wbnum: () => 6, //自定义微博显示数量
  wbrancolor: () => true, //是否开启微博随机颜色
  zhnum: () => 6, //自定义知乎显示数量
  zhrancolor: () => true, //是否开启知乎随机颜色
  nasaapi: () => "686BJ2YbpYYmyxvbk312vmj5EuMcOp8gaVTeVs0t", //填写NASA API Key
  imglink: () => "http://api.dujin.org/bing/1366.php", //NASA备用图片地址，可自定义
  imglink2: () => "https://source.unsplash.com/random", //NASA备用图片地址，可自定义
  checkintitle: () => "渡口", //填写签到标题
  checkinloginurl: () => "https://flzt.top/user/login?redirect=%2Fuser%2Findex", //填写签到登陆链接
  checkinemail: () => "braziliany@gmail.com", //填写签到邮箱
  checkinpwd: () => "W4NNjyap2F@", //填写签到密码
  apps: () => [
    "1443988620|hk",
    "1312014438 cn",
    "499470113/vn",
    "1314212521-jp",
    "1282297037_au",
    "932747118:ie",
    "1442620678",
    "1373567447",
  ], //app跟踪id
  reg: () => "us", //默认区域：美国us 中国cn 香港hk
  lastnumberofcar: () => "9" //北京尾号限行脚本填写汽车尾号
};
