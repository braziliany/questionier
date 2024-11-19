// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: magic;
/**
 * 一个基于 Proxy 的 请求对象，用于以一致的接口进行请求。
 *
 * 用法示例:
 * const {body,headers,statusCode} = await http.get(url,timeout).json();
 *
 * const response = await http.post({ url, body, timeout}).str();
 *
 * @param {string} method - HTTP 方法（例如 'get', 'post', 'put', 'delete'）。
 * @param {Object} opts - 请求的选项。
 * @param {string} url - 请求的 URL。
 * @param {number} [timeout=5] - 请求的超时时间，默认为 5 秒。
 *
 * @returns {Object} - 包含三个方法（str, json, imsg）的对象，用于发送请求。
 *   - str: 发送请求并以字符串形式返回响应体。
 *   - json: 发送请求并以 JSON 形式返回响应体。
 *   - image: 发送请求并以 图片对象形式返回响应。
 */
const http = new Proxy(
  {},
  {
    get:
      (_, method) =>
      (opts, timeout = 5) => {
        if (!opts.url) opts = { url: opts };
        opts.timeoutInterval = opts.timeout ?? timeout;

        const request = Object.assign(new Request(opts.url), { method }, opts);

        const send = async (loader) => {
          try {
            const body = await request[loader]();
            const { headers, statusCode } = request.response;
            if (statusCode !== 200)
              throw new Error(`Request failed with status code ${statusCode}`);
            return { body, headers, statusCode };
          } catch (error) {
            throw new Error(`Failed to load ${opts.url}: ${error.toString()}`);
          }
        };

        return {
          str: () => send("loadString"),
          json: () => send("loadJSON"),
          image: () => send("loadImage"),
          data: () => send("load")
        };
      },
  }
);


/**
 * Thanks @mzeryck
 *
 * @param {number} [height] The screen height measured in pixels
 */
const phoneSize = (height) => {
  const phones = {
    /** 14 Pro Max */
    2796: {
      small: 510,
      medium: 1092,
      large: 1146,
      left: 99,
      right: 681,
      top: 282,
      middle: 918,
      bottom: 1554
    },
    /** 14 Pro */
    2556: {
      small: 474,
      medium: 1014,
      large: 1062,
      left: 82,
      right: 622,
      top: 270,
      middle: 858,
      bottom: 1446
    },
    /** 13 Pro Max, 12 Pro Max */
    2778: {
      small: 510,
      medium: 1092,
      large: 1146,
      left: 96,
      right: 678,
      top: 246,
      middle: 882,
      bottom: 1518
    },
    /** 13, 13 Pro, 12, 12 Pro */
    2532: {
      small: 474,
      medium: 1014,
      large: 1062,
      left: 78,
      right: 618,
      top: 231,
      middle: 819,
      bottom: 1407
    },
    /** 11 Pro Max, XS Max */
    2688: {
      small: 507,
      medium: 1080,
      large: 1137,
      left: 81,
      right: 654,
      top: 228,
      middle: 858,
      bottom: 1488
    },
    /** 11, XR */
    1792: {
      small: 338,
      medium: 720,
      large: 758,
      left: 55,
      right: 437,
      top: 159,
      middle: 579,
      bottom: 999
    },
    /** 13 mini, 12 mini / 11 Pro, XS, X */
    2436: {
      small: 465,
      medium: 987,
      large: 1035,
      x: {
        left: 69,
        right: 591,
        top: 213,
        middle: 783,
        bottom: 1353
      },
      mini: {
        left: 69,
        right: 591,
        top: 231,
        middle: 801,
        bottom: 1371
      }
    },
    /** Plus phones */
    2208: {
      small: 471,
      medium: 1044,
      large: 1071,
      left: 99,
      right: 672,
      top: 114,
      middle: 696,
      bottom: 1278
    },
    /** SE2 and 6/6S/7/8 */
    1334: {
      small: 296,
      medium: 642,
      large: 648,
      left: 54,
      right: 400,
      top: 60,
      middle: 412,
      bottom: 764
    },
    /** SE1 */
    1136: {
      small: 282,
      medium: 584,
      large: 622,
      left: 30,
      right: 332,
      top: 59,
      middle: 399,
      bottom: 399
    },
    /** 11 and XR in Display Zoom mode */
    1624: {
      small: 310,
      medium: 658,
      large: 690,
      left: 46,
      right: 394,
      top: 142,
      middle: 522,
      bottom: 902
    },
    /** Plus in Display Zoom mode */
    2001: {
      small: 444,
      medium: 963,
      large: 972,
      left: 81,
      right: 600,
      top: 90,
      middle: 618,
      bottom: 1146
    }
  }
  height = height || Device.screenResolution().height
  const scale = Device.screenScale()

  const phone = phones[height]
  if (phone) {
    return phone
  }

  if (config.runsInWidget) {
    const pc = {
      small: 164 * scale,
      medium: 344 * scale,
      large: 354 * scale
    }
    return pc
  }

  // in app screen fixed 375x812 pt
  return {
    small: 155 * scale,
    medium: 329 * scale,
    large: 345 * scale
  }
}

/**
 * @param {...string} paths
 */
const joinPath = (...paths) => {
  const fm = FileManager.local()
  return paths.reduce((prev, curr) => {
    return fm.joinPath(prev, curr)
  }, '')
}

/**
 * 规范使用 FileManager。每个脚本使用独立文件夹
 *
 * 注意：桌面组件无法写入 cacheDirectory 和 temporaryDirectory
 * @param {object} options
 * @param { boolean| string} [options.useICloud]
 * @param {boolean| string} [options.basePath]
 */
const useFileManager = (options = {}) => {
  let { useICloud, basePath } = options
  
  if (typeof useICloud === 'string')
  basePath = useICloud;
  
  const fm = useICloud ? FileManager.iCloud() : FileManager.local()
  const paths = [fm.documentsDirectory(), Script.name()]
  if (basePath && typeof basePath === 'string') {
    paths.push(basePath)
  }
  const cacheDirectory = joinPath(...paths)
  
  /**
   * 删除路径末尾所有的 /
   * @param {string} filePath
   */
  const safePath = (filePath) => {
    return fm.joinPath(cacheDirectory, filePath).replace(/\/+$/, '')
  }
  
  /**
   * 如果上级文件夹不存在，则先创建文件夹
   * @param {string} filePath
   */
  const preWrite = (filePath) => {
    const i = filePath.lastIndexOf('/')
    const directory = filePath.substring(0, i)
    if (!fm.fileExists(directory)) {
      fm.createDirectory(directory, true)
    }
  }
  
  /**
   * @param {string} filePath
   * @param {string} stringData
   */

  const writeString = (filePath, content) => {
    const nextPath = safePath(filePath)
    preWrite(nextPath)
    fm.writeString(nextPath, content)
  }

  /**
   * @param {string} filePath
   * @param {object} jsonData
   */
  const writeJSON = (filePath, jsonData) => writeString(filePath, JSON.stringify(jsonData))
  
  /**
   * @param {string} filePath
   * @param {Image} image
   */
  const writeImage = (filePath, image) => {
    const nextPath = safePath(filePath)
    preWrite(nextPath)
    return fm.writeImage(nextPath, image)
  }
  
  /**
   * @param {string} filePath
   * @param {*} Data - 数据对象
   */
  const writeData = (filePath, Data) => {
    const nextPath = safePath(filePath)
    preWrite(nextPath)
    return fm.write(nextPath, Data)
  }
  
  
  /**
   * 文件不存在时返回 null
   * @param {string} filePath
   * @returns {string|null}
   */
  const readString = (filePath,bool) => {
    const fullPath = fm.joinPath(cacheDirectory, filePath)
    if (fm.fileExists(fullPath)) {
          if (bool) return fullPath;
      return fm.readString(
        fm.joinPath(cacheDirectory, filePath)
      )
    }
    return null
  }

  /**
   * @param {string} filePath
   */
  const readJSON = (filePath) => JSON.parse(readString(filePath))

  /**
   * @param {string} filePath
   */
  const readImage = (filePath,bool) => {
    const fullPath = fm.joinPath(cacheDirectory, filePath)
    
    if (bool) return fullPath
    return fm.readImage(fullPath)
  }
  
    /**
   * @param {string} filePath
   * @returns {any}
   *
   */
    const readData = (filePath,bool) => {
      const fullPath = fm.joinPath(cacheDirectory, filePath)
    if (fm.fileExists(fullPath)) {
      if (bool) return fullPath
      return Data.fromFile(fullPath)
    }
    return null
    }
   
  
  return {
    fm,
    cacheDirectory,
    writeString,
    writeJSON,
    writeImage,
    writeData,
    readString,
    readJSON,
    readImage,
    readData,
  }
}

/** 规范使用文件缓存。每个脚本使用独立文件夹 */
const useCache = (name = 'cache', path = 'basePath') => useFileManager({[path]: name })

  

  
  
const photoCache = useCache("照片");
const getImage = async (url, countryName) => {
   let imgData = photoCache.readImage(countryName);
   if (!imgData) {
    const { body } = await http.get(url).image();
    imgData = body;
photoCache.writeImage(countryName,imgData)
   }

  return "data:image/png;base64," + Data.fromPNG(imgData).toBase64String();
}

const { body: DataJson } = await http.get("https://tiyu.baidu.com/al/major/home?page=home&match=2024%E5%B9%B4%E5%B7%B4%E9%BB%8E%E5%A5%A5%E8%BF%90%E4%BC%9A&tab=%E5%A5%96%E7%89%8C%E6%A6%9C&&tab_type=single&request__node__params=1").json();

let { subTitle, data } = DataJson.tplData.data.tabsList[0];
 subTitle = "更新: " + subTitle.split("日")[1].split("更新")[0];

const medalInfo = await Promise.all([
  {
    name: "金牌",
    url: "https://gips2.baidu.com/it/u=3413191421,724160537&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f18_18",
  },
  {
    name: "银牌",
    url: "https://gips1.baidu.com/it/u=1765394732,1830309336&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f18_18",
  },
  {
    name: "铜牌",
    url: "https://gips1.baidu.com/it/u=217993423,3836497028&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f18_18",
  }
].map(item => getImage(item.url,item.name)));


const tasks = data.medalList[0].filter((v,i) => i<=14).map(async (item) => {
  const top3 = item.rank <= 3 ? "top3" : "";
  const isChina = item.isChina ? `id = "China"` : "";
  
  const flag = await getImage(item.countryFlag,item.countryName)
  
  return `<div class="medal-row" ${isChina}>
                <div class="rank ${top3}">${item.rank}</div>
                <div class="country"><img
                        src="${flag}"
                        class="flag">${item.countryName}</div>
                <div class="medals">
                    <div class="medal"  style="color: #E2AE60; font-weight: 900;">${item.gold}</div>
                    <div class="medal" style="color: #D4D4D4; font-weight: 900;">${item.silver}</div>
                    <div class="medal" style="color: #EEC4B1; font-weight: 900;">${item.bronze}</div>
                    <div class="medal">${item.total}</div>
                </div>
            </div>`
})

const tableList = await Promise.all(tasks)
const medal_table = JSON.stringify(tableList);

const themeColor = (() => {
  const theme = {
   dark:{
    bg: "#1C1C1E",
    "title_header": "white",
    china: "linear-gradient(to right, #5C5C5C, #474747)",
   },
   light:{
    bg:"#fff",
    "title_header": "black",
    china: "linear-gradient(to right, #FCF1F8, white)",
   }
  }
  return theme[Device.isUsingDarkAppearance() ? "dark" : "light"]
})();

const html = `
  <!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <title>奖牌榜</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-size: 20px;
            margin: 0;
        }
        
        .container {
            background-color: ${themeColor.bg};
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            width: 60vmin;
        }
        
        .title {
         display: flex;
         justify-content: space-between;
        }

        .title>.header {
            font-size: 24px;
            color: ${themeColor["title_header"]};
        }

        .title>.updated-time {
            font-size: 20px;
            color: #666;
        }

        .medal-table {
            width: 100%;
        }

        .medal-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid #ddd;
             
        }

       #China {
         border-radius: 15px;
         background: ${themeColor.china};
       }

        .medal-row:first-child {
            color: #858790;
        }
        
        .medal-row:first-child img {
            margin-top: 5px
        }

        .medal-row:last-child {
            border-bottom: none;
        }

        .country {
            display: flex;
            align-items: center;
            flex-grow: 1;
        }

        .country img {
            margin-right: 0.5em;
        }

        .flag {
            width: 24px;
            height: 20px;
            margin-left: 8px;
        }

        .medals {
            display: flex;
            justify-content: space-between;
        }

        .medal {
            width: 3rem;
            text-align: center;
        }

        .medal-end {
            width: 6rem;
            text-align: center;
        }

        .rank {
            width: 3rem;
            text-align: center;
        }

        .rank.top3 {
            color: pink;
        }
    </style>
</head>

<body>
    <div class="container">
      <div class="title">
        <div class="header">2024年巴黎奥运会</div>
        <div class="updated-time">${subTitle}</div>
      </div>
    
        <div class="medal-table">

            <div class="medal-row">
                <div class="rank">排名</div>
                <div class="country"><img>国家/地区</div>
                <div class="medals">
                    <div class="medal">
                        <img src="${medalInfo[0]}">
                    </div>
                    <div class="medal">
                        <img src="${medalInfo[1]}"
                            alt="银牌">
                    </div>
                    <div class="medal">
                        <img src="${medalInfo[2]}" alt="铜牌">
                    </div>
                    <div class="medal">总计</div>
                </div>
            </div>


        </div>
    </div>
    <script>
     const table = document.querySelector('.medal-table');
     const fragment = document.createDocumentFragment();
    
     ${medal_table}.forEach(h => {
       const div = document.createElement('div');
          div.innerHTML = h;
          fragment.appendChild(div);
      })
    
     table.appendChild(fragment);
    </script>
    
    <script>
    function getImg(){
     const node = document.querySelector('.container');
     
     html2canvas(node)
       .then(canvas => {
      const dataUrl = canvas.toDataURL('png').split(",")[1];
       completion(dataUrl)
     })
    
    };
    </script>
</body>
</html>
  `
  
const getWidgetSize = (widgetFamily) => {
  const screen = Device.screenResolution()
  const size = phoneSize(screen.height)
  const scale = Device.screenScale()
  const widthPX = widgetFamily === 'large' ? size.medium : size[widgetFamily]
  const heightPX = widgetFamily === 'medium' ? size.small : size[widgetFamily];
  return [
   widthPX / scale,
   heightPX / scale,
  ]
}

const createWidget = async() => {
  const {widgetFamily: family} = config;
  const [width, height] = getWidgetSize(family)
  const w = new WebView();
 await w.loadHTML(html);
  const imgB64 = await w.evaluateJavaScript('getImg()',true);
  const bg =
Image.fromData(Data.fromBase64String(imgB64))
  const widget = new ListWidget();
  widget.backgroundColor = new Color(themeColor.bg);
widget.setPadding(family === "medium" ? 230 : 120,0,0,0);
  const stack = widget.addStack();
stack.size = new Size(width - 20,width + 100);
stack.backgroundImage = bg;
  return widget;
}

if (config.runsInWidget) {
  const widget = await createWidget();
  Script.setWidget(widget);
} else if (config.runsInApp) {
  config.widgetFamily = 'large';
  const widget = await createWidget()
  widget.presentLarge();
}




