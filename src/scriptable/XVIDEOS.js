// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: video;
/**
 1，复制链接安装捷径下载视频。
 2，点击组件右上角的分数自动安装。
 3，捷径可单独使用，复制链接运行即可下载。
 * https://www.icloud.com/shortcuts/1dd2c5d1ae4543a3aa13a79857185b1f
 4，点击组件自动播放视频。
 5，点击组件上的 Download 下载视频。
 */

const [val, menu, vidUrl, root] = [
  'xvideos_val', 
  'xvideos_menu', 
  'xvideos_url',
  'https://www.xvideos.com'
];

const keychain = (key) => Keychain.contains(key);

const getCache = (key) => {
  if (keychain) return JSON.parse(Keychain.get(key));
};

const setKeychain = (key, json) => {
  Keychain.set(key, JSON.stringify(json));
};

const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

const shadowImage = async (img) => {
  const size = img.size;
  const ctx = new DrawContext();
  ctx.size = size;
  ctx.drawImageInRect(img, new Rect(0, 0, size.width, size.height));
  ctx.setFillColor(new Color('#000000', 0.4));
  ctx.fillRect(new Rect(0, 0, size.width, size.height));
  return await ctx.getImage();
};

const getImage = async (url) => await new Request(url).loadImage();

const videoHigh = async (url) => {
  const html = await new Request(url).loadString();
  const videoHighUrl =  html.match(/setVideoUrlHigh\('(.+)'\);/)?.[1];
  return videoHighUrl;
};

const getMovieList = async () => {
  try {
    const { name, value, page } = keychain(val) ? getCache(val) : '';
    
    const randomNumber = (num) => Math.floor(Math.random() * num) + 1;
    const number = randomNumber(page ?? 1000);
    
    const url = keychain(val) 
      ? (value?.startsWith('?k') 
      ? `${root}/${value}=${number}` 
      : `${root}${value}/${number}`) 
      : `${root}/new/${number}`;
    
    const html = await new Request(url).loadString();
    const webView = new WebView();
    await webView.loadHTML(html);
  
    const data = await webView.evaluateJavaScript(`
      (() => {
        const subList = [];
        const elementSub = document.querySelectorAll('ul#main-cats-sub-list li');
  
        elementSub.forEach(ele => {
          const titleElement = ele.querySelector('a');
          if (titleElement) {
            subList.push({
              name: titleElement.textContent.trim(),
              value: titleElement.getAttribute('href')  
            });
          }
        });
        
        const lastPageElement = document.querySelector('.last-page');
        const page = !lastPageElement ? 10 : lastPageElement.textContent.trim();
        
        const videos = [];
        const elements = document.querySelectorAll('.mozaique.cust-nb-cols .thumb-block');
  
        elements.forEach(element => {
          const titleElement = element.querySelector('.title a');
          const metadataElement = element.querySelector('.metadata');
          const imgElement =         element.querySelector('.thumb img');
          const hdMarkElement = element.querySelector('.video-hd-mark');

          if (titleElement && metadataElement && imgElement) {
            const title = titleElement.textContent.trim();
            const sprfluous = metadataElement.textContent.replace(/\s+/g, ' ').trim();
            const duration = metadataElement.querySelector('.duration').textContent.trim();
            const url = '${root}' + titleElement.getAttribute('href');
            const image = imgElement.src;
            const videosHd = !hdMarkElement ? '480p' : hdMarkElement.textContent.trim();
            
            videos.push({ title, url, sprfluous, duration, image, page, videosHd });
          }
        });
        return { videos, subList }
      })();
    `);
    
    const { videos, subList } = data;
    keychain(menu) ? [] : setKeychain(menu, subList);
    
    const randomJson = getRandomItem(videos);
    if (keychain(val)) {  
      setKeychain(val, { ...getCache(val), ...randomJson });
    }
    
    return { ...randomJson, name };
  } catch (e) {
    console.log(e + '使用缓存');
    return getCache(val);
  }
};

// 组件
const createWidget = async () => {
  const { title, sprfluous, duration, url, image, name, videosHd } = await getMovieList();
  
  const newTitle = title ? title.replace(/\d+小时\s?\d+分钟|\d+小时|\d+分钟|\d+秒/, '') : title;

  let desc = sprfluous ? sprfluous.replace(/^\d+小时\s?\d+分钟|^\d+小时|^\d+分钟|^\d+秒/, '') : name;
  if (desc.includes('观看')) desc = desc.match(/-\s(.+)/)[1].replace(/^\s/, '');

  const selected_Series = name ? `  《 ${name} 》` : '';

  Keychain.set(vidUrl, url);
  const family = config.widgetFamily === 'medium';
  
  //
  const widget = new ListWidget();
  const img = await getImage(image);
  widget.backgroundImage = await shadowImage(img);
  widget.refreshAfterDate = new Date(Date.now() + 1000 * 60 * 20);

  const padding = family ? 15 : 20;
  widget.setPadding(padding, padding, padding - 1, padding);
  const mainStack = widget.addStack();
  mainStack.layoutVertically();
  mainStack.centerAlignContent();
  
  const topStack = mainStack.addStack();
  topStack.layoutHorizontally();
  topStack.centerAlignContent();
  topStack.size = new Size(0, 70);
  
  const leftStack = topStack.addStack();
  leftStack.layoutVertically();
  leftStack.setPadding(-7, 0, 0, 0);
  leftStack.url = `scriptable:///run/${encodeURIComponent(Script.name())}`
  
  const titleStack = leftStack.addStack();
  titleStack.layoutHorizontally();
  titleStack.centerAlignContent();
  
  const titleText = titleStack.addText('X');
  titleText.leftAlignText();
  titleText.textColor = Color.red();
  titleText.font = Font.boldSystemFont(family ? 30 : 32)
  
  const titleText2 = titleStack.addText('VIDEOS');
  titleText2.leftAlignText();
  titleText2.textColor = Color.white();
  titleText2.font = Font.boldSystemFont(family ? 22 : 24)
  leftStack.addSpacer();
  topStack.addSpacer();
  
  //
  const rightStack = topStack.addStack();
  rightStack.layoutVertically();
  rightStack.centerAlignContent();
  
  const valueStack = rightStack.addStack();
  valueStack.layoutHorizontally();
  valueStack.addSpacer();
  
  const randomNumber = () => 6 + Math.random() * 3.6;
  const num = randomNumber();
  const valueText = valueStack.addText(num.toFixed(1));
  valueText.textColor = Color.white();
  valueText.font = Font.boldSystemFont(family ? 32 : 40)
  const cut = 'shortcuts://shortcuts/1dd2c5d1ae4543a3aa13a79857185b1f';
  valueText.url = cut;
  
  const fenText = valueStack.addText('分');
  fenText.textColor = Color.white();
  fenText.font = Font.boldSystemFont(13);
  
  const starStack = rightStack.addStack();
  starStack.layoutHorizontally();
  starStack.addSpacer();
  
  const score = family ? 13 : 16;
  const count = num >= 9 ? 5 : getRandomItem([ 3, 3.5, 4, 4.5 ]);

  for (let i = 0; i < 5; i++) {
    const isFullStar = i < Math.floor(count);
    const isLastStarHalf = i === Math.floor(count) && count % 1 !== 0;
    const iconName = isFullStar ? 'star.fill' : (isLastStarHalf ? 'star.leadinghalf.filled' : 'star');
    const starIcon = starStack.addImage(SFSymbol.named(iconName).image);
    starIcon.imageSize = new Size(score, score);
    starIcon.tintColor = new Color('#FFDD00');
  };
  rightStack.addSpacer();
  mainStack.addSpacer();
  
  //
  const downStack = mainStack.addStack();
  downStack.layoutHorizontally();
  downStack.centerAlignContent();
  
  const barStack = downStack.addStack();
  barStack.setPadding(2, 12, 2, 12);
  barStack.borderWidth = 2;
  barStack.borderColor = new Color('#FF8800', 0.95);
  barStack.cornerRadius = 7;
  barStack.backgroundColor = new Color('#FF8800', 0.35);
  barStack.url = 'shortcuts://run-shortcut?name=xvideos&input=video';
  
  const downloadText = barStack.addText('Download');
  downloadText.textColor = Color.white();
  downloadText.font = Font.boldSystemFont(family ? 14 : 16)
  downStack.addSpacer(7);

  const barStack2 = downStack.addStack();
  barStack2.backgroundColor = new Color('#DF2500');
  barStack2.setPadding(2, 8, 2, 8);
  barStack2.cornerRadius = 7;
  
  const vidText = barStack2.addText(videosHd);
  vidText.textColor = Color.white();
  vidText.font = Font.boldSystemFont(family ? 14 : 16)
  vidText.textOpacity = 0.9;
  mainStack.addSpacer(7);
  
  const descText = mainStack.addText(`${desc} ` + duration + selected_Series);
  descText.leftAlignText();
  descText.textColor = Color.white();
  descText.font = Font.boldSystemFont(14);
  descText.textOpacity = 0.9;
  mainStack.addSpacer(2);
  
  const subText = mainStack.addText(newTitle);
  subText.leftAlignText();
  subText.textColor = Color.white();
  subText.font = Font.mediumSystemFont(15);
  subText.textOpacity = 0.65
  subText.url = url;
  
  if (config.runsInApp) {
    await widget.presentLarge();
  } else {
    widget.url = await videoHigh(url);
    Script.setWidget(widget);
    Script.complete();
  }
};

const smallWidget = async () => {
  const { videosHd, duration, url, image, name } = await getMovieList();

  const widget = new ListWidget();
  const img = await getImage(image);
  widget.backgroundImage = await shadowImage(img);
  
  const iconStack = widget.addStack();
  iconStack.size = new Size(100, 25);
  iconStack.setPadding(-5, -5, 0, 0);
  const icon = await getImage('https://static-cdn77.xvideos-cdn.com/v3/img/skins/default/logo/xvideos.white.png');
  iconStack.addImage(icon);
  widget.url = await videoHigh(url);
  widget.addSpacer();
  
  const subText = widget.addText(name ? `《 ${name} 》` : '《 随机1130万部影片 》');
  subText.leftAlignText();
  subText.textColor = Color.white();
  subText.font = Font.mediumSystemFont(14);
  subText.textOpacity = 0.8;
  widget.addSpacer(3);
  
  const downStack = widget.addStack();
  downStack.layoutHorizontally();
  downStack.centerAlignContent();
  
  const barStack = downStack.addStack();
  barStack.backgroundColor = new Color('#DF2500');
  barStack.setPadding(2, 6, 2, 6);
  barStack.cornerRadius = 6;
  
  const vidText = barStack.addText(videosHd);
  vidText.textColor = Color.white();
  vidText.font = Font.boldSystemFont(13);
  downStack.addSpacer(3);
  
  const descText = downStack.addText(duration);
  descText.leftAlignText();
  descText.textColor = Color.white();
  descText.font = Font.boldSystemFont(13);
  descText.textOpacity = 0.8;
  
  Script.setWidget(widget);
  Script.complete();
};

const removeMenu = async () => {
  const subList = getCache(menu);
  while (subList.length) {
    const alert = new Alert();
    alert.message = `\n删减类别❓ 【 ${subList.length} 个分类 】`;
    
    const toBack = [
      { name: '返回主页' }
    ];
    const menuList = toBack.concat(subList);
    menuList.forEach((item, i) => {
      item.value ? alert.addAction(`${i}，${item.name}`) : alert.addDestructiveAction(item.name)
    });
    alert.addCancelAction('取消');
    const menuId = await alert.presentSheet();
    if (menuId === -1) break;
      
    if (menuId === 0) {
      await presentMenu();
      break;
    } else {
      subList.splice(menuId - 1, 1);
      setKeychain(menu, subList);
      subList.length === 0 ? Keychain.remove(menu) : null;
    }
  }
};

const search = async () => {
  const alert = new Alert();
  alert.message = '输入内容'
  alert.addTextField('搜索视频');
  alert.addAction('确定');
  alert.addCancelAction('取消');
  const inputContent = await alert.present();
  
  if (inputContent === 0 && keychain(menu)) {
    const newInput = alert.textFieldValue(0);
    const subList = getCache(menu);
    if (newInput && !subList.some(item => item.name === newInput)) {
      subList.unshift({
        name: newInput,
        value: `?k=${encodeURIComponent(newInput)}&p`
      });
      setKeychain(menu, subList);
    };
    await presentMenu();
  }
};

const presentMenu = async () => {  
  const alert = new Alert();
  alert.message = `\n桌面组件默认显示随机的内容 ${keychain(val) ? ' 【 ' + getCache(val).name + ' 】' : ''}`;
  
  const topMenu = [
    { name: '预览组件' },
    { name: '重置所有' },
    ...(keychain(menu) ? [{ name: '删减分类' }, { name: '增加分类' }] : [])
  ];
  
  const subList = keychain(menu) ? getCache(menu) : [];
  const menuList = topMenu.concat(subList);
  menuList.forEach((item, i) => {
    const icon = item.name === (keychain(val) && getCache(val).name) ? '📍' : ''
    item.value ? alert.addAction(`${i - 3}，${item.name} ${icon}`) : alert.addDestructiveAction(item.name)
  });
  alert.addCancelAction('取消');
  const menuId = await alert.presentSheet();
  if (menuId !== -1) {
    switch (menuId) {
      case 0:
        return await createWidget();
      case 1:
        keychain(menu) && Keychain.remove(menu);
        keychain(val) && Keychain.remove(val);
        break;
      case 2:
        return await removeMenu();
      case 3:
        return await search();
      default:
        const newMovie = await getMovieList();
        delete newMovie.name;
        setKeychain(val, { ...menuList[menuId], ...newMovie })
        await randerWidget();
    };
  }
};

const randerWidget = async () => config.widgetFamily === 'small' ? smallWidget() : await createWidget();

config.runsInWidget ? await randerWidget() : await presentMenu();