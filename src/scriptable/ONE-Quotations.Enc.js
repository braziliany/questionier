// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: child;
/********************************************************
 ************* MAKE SURE TO COPY EVERYTHING *************
 *******************************************************
 ************ © 2024 Copyright Nicolas-kings ************/
/********************************************************
 * script     : ONE-Quotations.js
 * version    : 1.0.0
 * author     : Nicolas-kings
 * date       : 2024-06-29
 * desc       : 具体配置说明，详见微信公众号-曰(读yue)坛
 * github     : https://github.com/Nicolasking007/Scriptable
 * Changelog  : v1.0.0 - 首次发布               
----------------------------------------------- */
// //##############公共参数配置模块##############
// 选择true时，使用透明背景
const changePicBg = false;
// 选择true时，使用必应壁纸
const ImageMode =false;
// 预览大小  small/medium/large
const previewSize = config.runsInWidget ? config.widgetFamily : "large";
// 是否使用纯色背景
const colorMode = false;
// 小组件背景色
const bgColor = new Color("000000");
// 高斯样式：light/dark
const blurStyle = "light";
// 模糊程度 参数范围 1~150
const blursize = 100;
// 1: 图片加蒙板 2: 自建图库  3: 用Bing 壁纸
const Imgstyle = 1;
// 右下角是否显示图像
const SFSymbolmodel = true;
// 左上角logo
const alogourl =
  "https://pic.rmb.bdstatic.com/bjh/d34fa23b66c3d72147b774e301cdf035.png"; //logo图片
// 用户头像
const avatar =
  "https://pic.rmb.bdstatic.com/bjh/b024ead24a7bab77e1e2f143db1fd6e4.png";
// 右下角logo
const corner =
  "https://pic.rmb.bdstatic.com/bjh/f0f595d8ceaa5cb6cc6c4e684c8b87b9.jpeg";
// 适配浅色、深色模式内容字体颜色
const themes_Fontcolor = Color.dynamic(Color.black(), Color.white());
// 适配浅色、深色模式内容字体颜色
const themes_Maincolor = Color.dynamic(Color.white(), Color.black());
// 小尺寸设置边距(上，左，下，右)
const padding = { top: 10, left: 10, bottom: 10, right: 10 };

// //⇈⇈⇈⇈⇈⇈⇈⇈⇈⇈⇈⇈⇈⇈⇈⇈⇈⇈⇈⇈⇈⇈⇈⇈⇈⇈⇈⇈⇈⇈⇈⇈⇈⇈
// //##############用户自定义参数配置模块-结束##############
const filename = `${Script.name()}`;
const files = FileManager.local();
const path = files.joinPath(files.documentsDirectory(), filename);
const localversion = "1.0.0";
const versionData = await getversion();
const needUpdated = await updateCheck(localversion);
const QuotationsData = await getData();
const widget = await createWidget();

//#####################背景模块-START#####################

if (!colorMode && !ImageMode && !config.runsInWidget && changePicBg) {
  const okTips = "您的小部件背景已准备就绪";
  let message =
    "开始之前，请回到主屏幕并进入编辑模式。 滑到最右边的空白页并截图。";
  let options = ["图片选择", "透明背景", "配置文档", "取消"];
  let response = await generateAlert(message, options);
  if (response == 3) return;
  if (response == 0) {
    let img = await Photos.fromLibrary();
    message = okTips;
    const resultOptions = ["好的"];
    await generateAlert(message, resultOptions);
    files.writeImage(path, img);
  }
  if (response == 2) {
    Safari.openInApp(versionData["ONE-oilprice"].wxurl, false);
  }
  if (response == 1) {
    message =
      "以下是【透明背景】生成步骤，如果你没有屏幕截图请退出，并返回主屏幕长按进入编辑模式。滑动到最右边的空白页截图。然后重新运行！";
    let exitOptions = ["继续(已有截图)", "退出(没有截图)"];

    let shouldExit = await generateAlert(message, exitOptions);
    if (shouldExit) return;

    // Get screenshot and determine phone size.
    let img = await Photos.fromLibrary();
    let height = img.size.height;
    let phone = phoneSizes()[height];
    if (!phone) {
      message =
        "您似乎选择了非iPhone屏幕截图的图像，或者不支持您的iPhone。请使用其他图像再试一次!";
      await generateAlert(message, ["好的！我现在去截图"]);
      return;
    }
    if (height == 2436) {
      let files = FileManager.local();
      let cacheName = "nk-phone-type";
      let cachePath = files.joinPath(files.libraryDirectory(), cacheName);
      if (files.fileExists(cachePath)) {
        let typeString = files.readString(cachePath);
        phone = phone[typeString];
      } else {
        message = "你使用什么型号的iPhone？";
        let types = ["iPhone 12 mini", "iPhone 11 Pro, XS, or X"];
        let typeIndex = await generateAlert(message, types);
        let type = typeIndex == 0 ? "mini" : "x";
        phone = phone[type];
        files.writeString(cachePath, type);
      }
    }
    // Prompt for widget size and position.
    message = "您想要创建什么尺寸的小部件？";
    let sizes = ["小号", "中号", "大号"];
    let size = await generateAlert(message, sizes);
    let widgetSize = sizes[size];

    message = "您想它在什么位置？";
    message +=
      height == 1136
        ? " (请注意，您的设备仅支持两行小部件，因此中间和底部选项相同。)"
        : "";

    // Determine image crop based on phone size.
    let crop = {
      w: "",
      h: "",
      x: "",
      y: "",
    };
    if (widgetSize == "小号") {
      crop.w = phone.小号;
      crop.h = phone.小号;
      let positions = [
        "顶部 左边",
        "顶部 右边",
        "中间 左边",
        "中间 右边",
        "底部 左边",
        "底部 右边",
      ];
      let position = await generateAlert(message, positions);

      // Convert the two words into two keys for the phone size dictionary.
      let keys = positions[position].split(" ");
      crop.y = phone[keys[0]];
      crop.x = phone[keys[1]];
    } else if (widgetSize == "中号") {
      crop.w = phone.中号;
      crop.h = phone.小号;

      // 中号 and 大号 widgets have a fixed x-value.
      crop.x = phone.左边;
      let positions = ["顶部", "中间", "底部"];
      let position = await generateAlert(message, positions);
      let key = positions[position].toLowerCase();
      crop.y = phone[key];
    } else if (widgetSize == "大号") {
      crop.w = phone.中号;
      crop.h = phone.大号;
      crop.x = phone.左边;
      let positions = ["顶部", "底部"];
      let position = await generateAlert(message, positions);

      // 大号 widgets at the 底部 have the "中间" y-value.
      crop.y = position ? phone.中间 : phone.顶部;
    }

    // Crop image and finalize the widget.
    let imgCrop = cropImage(img, new Rect(crop.x, crop.y, crop.w, crop.h));

    message = "您的小部件背景已准备就绪，退出到桌面预览。";
    const resultOptions = ["导出到相册", "预览组件"];
    const exportToFiles = await generateAlert(message, resultOptions);
    if (exportToFiles) {
      files.writeImage(path, imgCrop);
    } else {
      Photos.save(imgCrop);
    }
  }
}

//#####################背景模块-设置小组件的背景#####################

if (colorMode) {
  widget.backgroundColor = bgColor;
} else if (ImageMode) {
  switch (Imgstyle) {
    case 1:
      const blugImgs = await getImageByUrl(
        "https://source.unsplash.com/random/800x373?" + IMAGE_SEARCH_TERMS,
        `_${Script.name()}-bg`,
        false
      );
      bgImg = await blurImage(blugImgs, blurStyle, blursize);
      widget.backgroundImage = bgImg;
      break;
    case 2:
      const unsplashurl =
        "https://source.unsplash.com/random/800x373?" + IMAGE_SEARCH_TERMS;
      const orginImgs = await getImageByUrl(
        unsplashurl,
        `_${Script.name()}-orginImgs-bg`,
        false
      );
      bgImg = await shadowImage(orginImgs);
      widget.backgroundImage = bgImg;
      break;
    case 3:
      const bingurl = "https://api.dujin.org/bing/1366.php";
      const bingImgs = await getImageByUrl(
        bingurl,
        `_${Script.name()}-bingImgs-bg`,
        false
      );
      bgImg = await shadowImage(bingImgs);
      widget.backgroundImage = bgImg;
      break;
  }
} else {
  widget.backgroundImage = files.readImage(path);
}
// 设置边距(上，左，下，右)
widget.setPadding(padding.top, padding.left, padding.bottom, padding.right);

if (!config.runsInWidget) {
  switch (previewSize) {
    case "small":
      await widget.presentSmall();
      break;
    case "medium":
      await widget.presentMedium();
      break;
    case "large":
      await widget.presentLarge();
      break;
  }
}
Script.setWidget(widget);
// 完成脚本
Script.complete();

//#####################内容模块-创建小组件内容#####################

async function createWidget() {
  let w = new ListWidget();
  const timeFormatter = new DateFormatter();
  timeFormatter.locale = "en";
  timeFormatter.useNoDateStyle();
  timeFormatter.useShortTimeStyle();
  switch (previewSize) {
    case "small":
      let SaLogos = await getImageByUrl(
        alogourl,
        `_${Script.name()}-avagrtop-bg1`,
        false
      );
      let Salogo = w.addImage(SaLogos);
      Salogo.imageSize = new Size(20, 20);
      w.addSpacer();
      let Sheading = w.addText(QuotationsData.content.text);
      Sheading.font = Font.systemFont(16);
      Sheading.textColor = themes_Fontcolor;
      Sheading.centerAlignText();
      Sheading.shadowColor = themes_Maincolor;
      Sheading.minimumScaleFactor = 0.5;

      w.addSpacer();

      const SfooterStack = w.addStack();
      SfooterStack.bottomAlignContent();

      const SprofileStack = SfooterStack.addStack();
      SprofileStack.topAlignContent();

      const Simage = await getImageByUrl(
        avatar,
        `_${Script.name()}-avagr-bg`,
        false
      );
      let SprofileImage = SprofileStack.addImage(Simage);

      SprofileImage.imageSize = new Size(30, 30);
      SprofileImage.cornerRadius = 15;
      SprofileImage.borderWidth = 4;
      SprofileImage.borderColor = new Color("#bfbfbf");

      SprofileStack.addSpacer(10);

      const SnameStack = SprofileStack.addStack();
      SnameStack.layoutVertically();

      const Susername = SnameStack.addText(QuotationsData.title);
      Susername.textColor = Color.red();
      Susername.font = Font.lightSystemFont(12);
      Susername.lineLimit = 1;
      SnameStack.addSpacer(5);
      const Staglist = SnameStack.addText(QuotationsData.desc);
      Staglist.textColor = new Color("#bfbfbf");
      Staglist.font = Font.semiboldSystemFont(9);
      Staglist.lineLimit = 1;
      SfooterStack.addSpacer();
      if (SFSymbolmodel) {
        let SdocsSymbol = SFSymbol.named("figure.wave"); //tortoise.fill
        let SdocsElement = SfooterStack.addImage(SdocsSymbol.image);
        SdocsElement.imageSize = new Size(20, 20);
        SdocsElement.tintColor = Color.dynamic(Color.red(), Color.white());
      } else {
        const SdevLogos = await getImageByUrl(
          corner,
          `_${Script.name()}-avagrtop-bg`,
          false
        );
        const Slogo = SfooterStack.addImage(SdevLogos);
        Slogo.imageSize = new Size(20, 20);
      }
      break;
    case "medium":
      let MaLogos = await getImageByUrl(
        alogourl,
        `_${Script.name()}-avagrtop-bg1`,
        false
      );
      let Malogo = w.addImage(MaLogos);
      Malogo.imageSize = new Size(20, 20);
      w.addSpacer();
      let Mheading = w.addText(QuotationsData.content.text);
      Mheading.font = Font.systemFont(18);
      Mheading.textColor = themes_Fontcolor;
      Mheading.centerAlignText();
      Mheading.shadowColor = themes_Maincolor;
      Mheading.minimumScaleFactor = 0.5;

      w.addSpacer();

      const MfooterStack = w.addStack();
      MfooterStack.bottomAlignContent();

      const MprofileStack = MfooterStack.addStack();
      MprofileStack.topAlignContent();

      const Mimage = await getImageByUrl(
        avatar,
        `_${Script.name()}-avagr-bg`,
        false
      );
      let MprofileImage = MprofileStack.addImage(Mimage);

      MprofileImage.imageSize = new Size(30, 30);
      MprofileImage.cornerRadius = 15;
      MprofileImage.borderWidth = 4;
      MprofileImage.borderColor = new Color("#bfbfbf");
      MprofileStack.addSpacer(10);

      const MnameStack = MprofileStack.addStack();
      MnameStack.layoutVertically();

      const Musername = MnameStack.addText(QuotationsData.title);
      Musername.textColor = Color.red();
      Musername.font = Font.lightSystemFont(12);
      Musername.lineLimit = 1;
      MnameStack.addSpacer(5);
      const Mtaglist = MnameStack.addText(QuotationsData.desc);
      Mtaglist.textColor = new Color("#bfbfbf");
      Mtaglist.font = Font.semiboldSystemFont(9);
      Mtaglist.lineLimit = 1;
      MfooterStack.addSpacer();
      if (SFSymbolmodel) {
        let MdocsSymbol = SFSymbol.named("figure.wave"); //tortoise.fill
        let MdocsElement = MfooterStack.addImage(MdocsSymbol.image);
        MdocsElement.imageSize = new Size(20, 20);
        MdocsElement.tintColor = Color.dynamic(Color.red(), Color.white());
      } else {
        const MdevLogos = await getImageByUrl(
          corner,
          `_${Script.name()}-avagrtop-bg`,
          false
        );
        const Mlogo = MfooterStack.addImage(MdevLogos);
        Mlogo.imageSize = new Size(20, 20);
      }
      break;
    case "large":
      let LtitleStack = w.addStack()
      let LaLogos = await getImageByUrl(
        alogourl,
        `_${Script.name()}-avagrtop-bg1`,
        false
      );
      let Lalogo = LtitleStack.addImage(LaLogos);
      Lalogo.imageSize = new Size(30, 30);
      LtitleStack.addSpacer()


      let LsubTitleStack = LtitleStack.addStack()
      LsubTitleStack.backgroundColor = new Color("#FF0000", 1)
      LsubTitleStack.cornerRadius = 10
      LsubTitleStack.setPadding(2, 6, 2, 6)

      let LsubTitle = LsubTitleStack.addText(QuotationsData.topic)
      LsubTitle.font = Font.systemFont(14)
      LsubTitle.textColor = new Color("#FFD700", 1)

      LtitleStack.addSpacer(5)

      let LsecondSubTitleStack = LtitleStack.addStack()
      LsecondSubTitleStack.backgroundColor = new Color("#4B92DB", 1)
      LsecondSubTitleStack.cornerRadius = 10
      LsecondSubTitleStack.setPadding(2, 6, 2, 6)

      let LsecondSubTitle = LsecondSubTitleStack.addText(QuotationsData.peace)
      LsecondSubTitle.font = Font.systemFont(14)
      LsecondSubTitle.textColor = Color.white();

      w.addSpacer();
      let Lheading = w.addText(QuotationsData.content.text);
      Lheading.font = Font.systemFont(20);
      Lheading.textColor = themes_Fontcolor;
      Lheading.centerAlignText();
      Lheading.shadowColor = themes_Maincolor;
      Lheading.minimumScaleFactor = 0.5;

      w.addSpacer();

      const LfooterStack = w.addStack();
      LfooterStack.bottomAlignContent();

      const LprofileStack = LfooterStack.addStack();
      LprofileStack.topAlignContent();

      const Limage = await getImageByUrl(
        avatar,
        `_${Script.name()}-avagr-bg`,
        false
      );
      let LprofileImage = LprofileStack.addImage(Limage);

      LprofileImage.imageSize = new Size(40, 40);
      LprofileImage.cornerRadius = 20;
      LprofileImage.borderWidth = 4;
      LprofileImage.borderColor = new Color("#bfbfbf");

      LprofileStack.addSpacer(10);

      const LnameStack = LprofileStack.addStack();
      LnameStack.layoutVertically();

      const Lusername = LnameStack.addText(QuotationsData.title);
      Lusername.textColor = Color.red();
      Lusername.font = Font.lightSystemFont(14);
      Lusername.lineLimit = 1;
      LnameStack.addSpacer(5);
      const Ltaglist = LnameStack.addText(QuotationsData.desc);
      Ltaglist.textColor = new Color("#bfbfbf");
      Ltaglist.font = Font.semiboldSystemFont(10);
      Lusername.lineLimit = 1;
      LfooterStack.addSpacer();
      if (SFSymbolmodel) {
        let LdocsSymbol = SFSymbol.named("figure.wave"); //tortoise.fill
        let LdocsElement = LfooterStack.addImage(LdocsSymbol.image);
        LdocsElement.imageSize = new Size(30, 30);
        LdocsElement.tintColor = Color.dynamic(Color.red(), Color.white());
      } else {
        const LdevLogos = await getImageByUrl(
          corner,
          `_${Script.name()}-avagrtop-bg`,
          false
        );
        const Llogo = LfooterStack.addImage(LdevLogos);
        Llogo.imageSize = new Size(30, 30);
      }
      break;
    default:
      throw new Error("Invalid widget size");
  }

  return w;
}

//#####################事务逻辑处理模块#####################

async function getData() {
  const QuotationsCachePath = files.joinPath(
    files.documentsDirectory(),
    "Quotations-NK"
  );
  var QuotationsData;
  try {
    QuotationsData = await new Request(
      atob("aHR0cHM6Ly9hcGkubmt1cHAuY29tL3F1b3RhdGlvbnM=")).loadJSON(),
      files.writeString(QuotationsCachePath, JSON.stringify(QuotationsData)),
      console.log("[+]获取毛主席语录成功")
  } catch (e) {
    QuotationsData = JSON.parse(files.readString(QuotationsCachePath));
    console.log("[+]获取毛主席语录失败，使用缓存数据");
  }

  return QuotationsData;
}

//#####################背景模块-逻辑处理部分#####################

async function shadowImage(img) {
  let ctx = new DrawContext();
  // 把画布的尺寸设置成图片的尺寸
  ctx.size = img.size;
  // 把图片绘制到画布中
  ctx.drawImageInRect(
    img,
    new Rect(0, 0, img.size["width"], img.size["height"])
  );
  // 设置绘制的图层颜色，为半透明的黑色
  ctx.setFillColor(new Color("#000000", 0.5));
  // 绘制图层
  ctx.fillRect(new Rect(0, 0, img.size["width"], img.size["height"]));

  // 导出最终图片
  return await ctx.getImage();
}

async function generateAlert(message, options) {
  let alert = new Alert();
  alert.message = message;

  for (const option of options) {
    alert.addAction(option);
  }

  let response = await alert.presentAlert();
  return response;
}

// Crop an image into the specified rect.
function cropImage(img, rect) {
  let draw = new DrawContext();
  draw.size = new Size(rect.width, rect.height);
  draw.drawImageAtPoint(img, new Point(-rect.x, -rect.y));
  return draw.getImage();
}

// **
//  * 图片高斯模糊
//  * @param {Image} img
//  * @param {string} style light/dark
//  * @return {Image} 图片
//  */
async function blurImage(img, style, blur = blursize) {
  const js = `
  var mul_table=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259];var shg_table=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24];function stackBlurCanvasRGB(id,top_x,top_y,width,height,radius){if(isNaN(radius)||radius<1)return;radius|=0;var canvas=document.getElementById(id);var context=canvas.getContext("2d");var imageData;try{try{imageData=context.getImageData(top_x,top_y,width,height)}catch(e){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");imageData=context.getImageData(top_x,top_y,width,height)}catch(e){alert("Cannot access local image");throw new Error("unable to access local image data: "+e);return}}}catch(e){alert("Cannot access image");throw new Error("unable to access image data: "+e);}var pixels=imageData.data;var x,y,i,p,yp,yi,yw,r_sum,g_sum,b_sum,r_out_sum,g_out_sum,b_out_sum,r_in_sum,g_in_sum,b_in_sum,pr,pg,pb,rbs;var div=radius+radius+1;var w4=width<<2;var widthMinus1=width-1;var heightMinus1=height-1;var radiusPlus1=radius+1;var sumFactor=radiusPlus1*(radiusPlus1+1)/2;var stackStart=new BlurStack();var stack=stackStart;for(i=1;i<div;i++){stack=stack.next=new BlurStack();if(i==radiusPlus1)var stackEnd=stack}stack.next=stackStart;var stackIn=null;var stackOut=null;yw=yi=0;var mul_sum=mul_table[radius];var shg_sum=shg_table[radius];for(y=0;y<height;y++){r_in_sum=g_in_sum=b_in_sum=r_sum=g_sum=b_sum=0;r_out_sum=radiusPlus1*(pr=pixels[yi]);g_out_sum=radiusPlus1*(pg=pixels[yi+1]);b_out_sum=radiusPlus1*(pb=pixels[yi+2]);r_sum+=sumFactor*pr;g_sum+=sumFactor*pg;b_sum+=sumFactor*pb;stack=stackStart;for(i=0;i<radiusPlus1;i++){stack.r=pr;stack.g=pg;stack.b=pb;stack=stack.next}for(i=1;i<radiusPlus1;i++){p=yi+((widthMinus1<i?widthMinus1:i)<<2);r_sum+=(stack.r=(pr=pixels[p]))*(rbs=radiusPlus1-i);g_sum+=(stack.g=(pg=pixels[p+1]))*rbs;b_sum+=(stack.b=(pb=pixels[p+2]))*rbs;r_in_sum+=pr;g_in_sum+=pg;b_in_sum+=pb;stack=stack.next}stackIn=stackStart;stackOut=stackEnd;for(x=0;x<width;x++){pixels[yi]=(r_sum*mul_sum)>>shg_sum;pixels[yi+1]=(g_sum*mul_sum)>>shg_sum;pixels[yi+2]=(b_sum*mul_sum)>>shg_sum;r_sum-=r_out_sum;g_sum-=g_out_sum;b_sum-=b_out_sum;r_out_sum-=stackIn.r;g_out_sum-=stackIn.g;b_out_sum-=stackIn.b;p=(yw+((p=x+radius+1)<widthMinus1?p:widthMinus1))<<2;r_in_sum+=(stackIn.r=pixels[p]);g_in_sum+=(stackIn.g=pixels[p+1]);b_in_sum+=(stackIn.b=pixels[p+2]);r_sum+=r_in_sum;g_sum+=g_in_sum;b_sum+=b_in_sum;stackIn=stackIn.next;r_out_sum+=(pr=stackOut.r);g_out_sum+=(pg=stackOut.g);b_out_sum+=(pb=stackOut.b);r_in_sum-=pr;g_in_sum-=pg;b_in_sum-=pb;stackOut=stackOut.next;yi+=4}yw+=width}for(x=0;x<width;x++){g_in_sum=b_in_sum=r_in_sum=g_sum=b_sum=r_sum=0;yi=x<<2;r_out_sum=radiusPlus1*(pr=pixels[yi]);g_out_sum=radiusPlus1*(pg=pixels[yi+1]);b_out_sum=radiusPlus1*(pb=pixels[yi+2]);r_sum+=sumFactor*pr;g_sum+=sumFactor*pg;b_sum+=sumFactor*pb;stack=stackStart;for(i=0;i<radiusPlus1;i++){stack.r=pr;stack.g=pg;stack.b=pb;stack=stack.next}yp=width;for(i=1;i<=radius;i++){yi=(yp+x)<<2;r_sum+=(stack.r=(pr=pixels[yi]))*(rbs=radiusPlus1-i);g_sum+=(stack.g=(pg=pixels[yi+1]))*rbs;b_sum+=(stack.b=(pb=pixels[yi+2]))*rbs;r_in_sum+=pr;g_in_sum+=pg;b_in_sum+=pb;stack=stack.next;if(i<heightMinus1){yp+=width}}yi=x;stackIn=stackStart;stackOut=stackEnd;for(y=0;y<height;y++){p=yi<<2;pixels[p]=(r_sum*mul_sum)>>shg_sum;pixels[p+1]=(g_sum*mul_sum)>>shg_sum;pixels[p+2]=(b_sum*mul_sum)>>shg_sum;r_sum-=r_out_sum;g_sum-=g_out_sum;b_sum-=b_out_sum;r_out_sum-=stackIn.r;g_out_sum-=stackIn.g;b_out_sum-=stackIn.b;p=(x+(((p=y+radiusPlus1)<heightMinus1?p:heightMinus1)*width))<<2;r_sum+=(r_in_sum+=(stackIn.r=pixels[p]));g_sum+=(g_in_sum+=(stackIn.g=pixels[p+1]));b_sum+=(b_in_sum+=(stackIn.b=pixels[p+2]));stackIn=stackIn.next;r_out_sum+=(pr=stackOut.r);g_out_sum+=(pg=stackOut.g);b_out_sum+=(pb=stackOut.b);r_in_sum-=pr;g_in_sum-=pg;b_in_sum-=pb;stackOut=stackOut.next;yi+=width}}context.putImageData(imageData,top_x,top_y)}function BlurStack(){this.r=0;this.g=0;this.b=0;this.a=0;this.next=null}
        // https://gist.github.com/mjackson/5311256
      
        function rgbToHsl(r, g, b){
            r /= 255, g /= 255, b /= 255;
            var max = Math.max(r, g, b), min = Math.min(r, g, b);
            var h, s, l = (max + min) / 2;
      
            if(max == min){
                h = s = 0; // achromatic
            }else{
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch(max){
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }
      
            return [h, s, l];
        }
      
        function hslToRgb(h, s, l){
            var r, g, b;
      
            if(s == 0){
                r = g = b = l; // achromatic
            }else{
                var hue2rgb = function hue2rgb(p, q, t){
                    if(t < 0) t += 1;
                    if(t > 1) t -= 1;
                    if(t < 1/6) return p + (q - p) * 6 * t;
                    if(t < 1/2) return q;
                    if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                    return p;
                }
      
                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hue2rgb(p, q, h + 1/3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1/3);
            }
      
            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        }
        
        function lightBlur(hsl) {
        
          // Adjust the luminance.
          let lumCalc = 0.35 + (0.3 / hsl[2]);
          if (lumCalc < 1) { lumCalc = 1; }
          else if (lumCalc > 3.3) { lumCalc = 3.3; }
          const l = hsl[2] * lumCalc;
          
          // Adjust the saturation. 
          const colorful = 2 * hsl[1] * l;
          const s = hsl[1] * colorful * 1.5;
          
          return [hsl[0],s,l];
          
        }
        
        function darkBlur(hsl) {
      
          // Adjust the saturation. 
          const colorful = 2 * hsl[1] * hsl[2];
          const s = hsl[1] * (1 - hsl[2]) * 3;
          
          return [hsl[0],s,hsl[2]];
          
        }
      
        // Set up the canvas.
        const img = document.getElementById("blurImg");
        const canvas = document.getElementById("mainCanvas");
      
        const w = img.naturalWidth;
        const h = img.naturalHeight;
      
        canvas.style.width  = w + "px";
        canvas.style.height = h + "px";
        canvas.width = w;
        canvas.height = h;
      
        const context = canvas.getContext("2d");
        context.clearRect( 0, 0, w, h );
        context.drawImage( img, 0, 0 );
        
        // Get the image data from the context.
        var imageData = context.getImageData(0,0,w,h);
        var pix = imageData.data;
        
        var isDark = "${style}" == "dark";
        var imageFunc = isDark ? darkBlur : lightBlur;
      
        for (let i=0; i < pix.length; i+=4) {
      
          // Convert to HSL.
          let hsl = rgbToHsl(pix[i],pix[i+1],pix[i+2]);
          
          // Apply the image function.
          hsl = imageFunc(hsl);
        
          // Convert back to RGB.
          const rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
        
          // Put the values back into the data.
          pix[i] = rgb[0];
          pix[i+1] = rgb[1];
          pix[i+2] = rgb[2];
      
        }
      
        // Draw over the old image.
        context.putImageData(imageData,0,0);
      
        // Blur the image.
        stackBlurCanvasRGB("mainCanvas", 0, 0, w, h, ${blur});
        
        // Perform the additional processing for dark images.
        if (isDark) {
        
          // Draw the hard light box over it.
          context.globalCompositeOperation = "hard-light";
          context.fillStyle = "rgba(55,55,55,0.2)";
          context.fillRect(0, 0, w, h);
      
          // Draw the soft light box over it.
          context.globalCompositeOperation = "soft-light";
          context.fillStyle = "rgba(55,55,55,1)";
          context.fillRect(0, 0, w, h);
      
          // Draw the regular box over it.
          context.globalCompositeOperation = "source-over";
          context.fillStyle = "rgba(55,55,55,0.4)";
          context.fillRect(0, 0, w, h);
        
        // Otherwise process light images.
        } else {
          context.fillStyle = "rgba(255,255,255,0.4)";
          context.fillRect(0, 0, w, h);
        }
      
        // Return a base64 representation.
        canvas.toDataURL(); 
        `;

  // Convert the images and create the HTML.
  let blurImgData = Data.fromPNG(img).toBase64String();
  let html = `
        <img id="blurImg" src="data:image/png;base64,${blurImgData}" />
        <canvas id="mainCanvas" />
        `;

  // Make the web view and get its return value.
  let view = new WebView();
  await view.loadHTML(html);
  let returnValue = await view.evaluateJavaScript(js);

  // Remove the data type from the string and convert to data.
  let imageDataString = returnValue.slice(22);
  let imageData = Data.fromBase64String(imageDataString);

  // Convert to image and crop before returning.
  let imageFromData = Image.fromData(imageData);
  // return cropImage(imageFromData)
  return imageFromData;
}

async function getImageByUrl(url, cacheKey, useCache = true) {
  const cacheFile = FileManager.local().joinPath(
    FileManager.local().temporaryDirectory(),
    cacheKey
  );
  const exists = FileManager.local().fileExists(cacheFile);
  // 判断是否有缓存
  if (useCache && exists) {
    return Image.fromFile(cacheFile);
  }
  try {
    const req = new Request(url);
    const img = await req.loadImage();
    // 存储到缓存
    FileManager.local().writeImage(cacheFile, img);
    return img;
  } catch (e) {
    console.error(`图片加载失败：${e}`);
    if (exists) {
      return Image.fromFile(cacheFile);
    }
    // 没有缓存+失败情况下，返回黑色背景
    let ctx = new DrawContext();
    ctx.size = new Size(100, 100);
    ctx.setFillColor(Color.black());
    ctx.fillRect(new Rect(0, 0, 100, 100));
    return await ctx.getImage();
  }
}

// Pixel sizes and positions for widgets on all supported phones.
function phoneSizes() {
  let phones = {
    2796: {
      models: ["14 Pro Max"],
      小号: 510,
      中号: 1092,
      大号: 1146,
      左边: 99,
      右边: 681,
      顶部: 282,
      中间: 918,
      底部: 1554,
    },
    2556: {
      models: ["14 Pro"],
      小号: 474,
      中号: 1014,
      大号: 1062,
      左边: 82,
      右边: 622,
      顶部: 270,
      中间: 858,
      底部: 1446,
    },
    2532: {
      models: ["12", "12 Pro", "14"],
      小号: 474,
      中号: 1014,
      大号: 1062,
      左边: 78,
      右边: 618,
      顶部: 231,
      中间: 819,
      底部: 1407,
    },

    2778: {
      models: ["12 Pro Max", "13 Pro Max"],
      小号: 510,
      中号: 1092,
      大号: 1146,
      左边: 96,
      右边: 678,
      顶部: 246,
      中间: 882,
      底部: 1518,
    },

    2688: {
      models: ["Xs Max", "11 Pro Max"],
      小号: 507,
      中号: 1080,
      大号: 1137,
      左边: 81,
      右边: 654,
      顶部: 228,
      中间: 858,
      底部: 1488,
    },

    1792: {
      models: ["11", "Xr"],
      小号: 338,
      中号: 720,
      大号: 758,
      左边: 54,
      右边: 436,
      顶部: 160,
      中间: 580,
      底部: 1000,
    },

    2436: {
      x: {
        models: ["X", "Xs", "11 Pro"],
        小号: 465,
        中号: 987,
        大号: 1035,
        左边: 69,
        右边: 591,
        顶部: 213,
        中间: 783,
        底部: 1353,
      },

      mini: {
        models: ["12 mini"],
        小号: 465,
        中号: 987,
        大号: 1035,
        左边: 69,
        右边: 591,
        顶部: 231,
        中间: 801,
        底部: 1371,
      },
    },

    2208: {
      models: ["6+", "6s+", "7+", "8+"],
      小号: 471,
      中号: 1044,
      大号: 1071,
      左边: 99,
      右边: 672,
      顶部: 114,
      中间: 696,
      底部: 1278,
    },

    1334: {
      models: ["6", "6s", "7", "8", "SE2"],
      小号: 296,
      中号: 642,
      大号: 648,
      左边: 54,
      右边: 400,
      顶部: 60,
      中间: 412,
      底部: 764,
    },

    1136: {
      models: ["5", "5s", "5c", "SE"],
      小号: 282,
      中号: 584,
      大号: 622,
      左边: 30,
      右边: 332,
      顶部: 59,
      中间: 399,
      底部: 399,
    },
  };
  return phones;
}

//#####################版本更新模块#####################

async function getversion() {
  const versionCachePath = files.joinPath(
    files.documentsDirectory(),
    "version-NK"
  );
  var versionData;
  try {
    versionData = await new Request(
      atob(
        "aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL05pY29sYXNraW5nMDA3L0NETkBsYXRlc3QvU2NyaXB0YWJsZS9VUERBVEUuanNvbg=="
      )
    ).loadJSON();
    files.writeString(versionCachePath, JSON.stringify(versionData));
    console.log(`===>欢迎使用：${versionData.author}制作的小组件<===`);
    console.log("[+]遇到问题，请前往公众号：曰坛 反馈");
    log("[+]版本信息获取成功");
  } catch (e) {
    versionData = JSON.parse(files.readString(versionCachePath));
    log("[+]获取版本信息失败，使用缓存数据");
  }

  return versionData;
}

// 版本比较
function version_compare(v1, v2) {
  // 将两个版本号拆成数组
  var arr1 = v1.split("."),
    arr2 = v2.split(".");
  var minLength = Math.min(arr1.length, arr2.length);
  // 依次比较版本号每一位大小
  for (var i = 0; i < minLength; i++) {
    if (parseInt(arr1[i]) != parseInt(arr2[i])) {
      return parseInt(arr1[i]) > parseInt(arr2[i]) ? 1 : -1;
    }
  }
  // 若前几位分隔相同，则按分隔数比较。
  if (arr1.length == arr2.length) {
    return 0;
  } else {
    return arr1.length > arr2.length ? 1 : -1;
  }
}

async function updateCheck(localversion) {
  let uC = versionData;
  let originversion = uC["ONE-Quotations"].version;
  let status = version_compare(originversion, localversion);
  log("[+]最新版本：" + originversion);
  let needUpdate = false;
  if (status == 1) {
    needUpdate = true;
    log("[+]检测到有新版本！");
    if (!config.runsInWidget) {
      log("[+]执行更新步骤");
      let upd = new Alert();
      upd.title = "检测到有新版本！";
      upd.addDestructiveAction("暂不更新");
      upd.addAction("立即更新");
      upd.add;
      upd.message = uC["ONE-Quotations"].notes;
      if ((await upd.present()) == 1) {
        const req = new Request(uC["ONE-Quotations"].cdn_scriptURL);
        const codeString = await req.loadString();
        files.writeString(module.filename, codeString);
        const n = new Notification();
        n.title = "下载更新成功";
        n.body = "请点击左上角Done完成，重新进入脚本即可~";
        n.schedule();
      }
      Script.complete();
    }
  } else if (status == 0) {
    log("[+]当前版本已是最新");
  } else {
    const n = new Notification();
    n.title = "作者肯定是打瞌睡啦！";
    n.body = "哎呀！赶紧去公众号反馈吧~";
    n.schedule();
  }

  return needUpdate;
}

/********************************************************
 ************* MAKE SURE TO COPY EVERYTHING *************
 *******************************************************
 ************ © 2024 Copyright Nicolas-kings ************/
