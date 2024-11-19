// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: spinner;

// 用正则匹配名称
const nameRegExp = /搬瓦工.*CMI/i

// 设置上方要显示的监控点
const monitorNames = ['liantong', 'dianxin', 'yidong']
// 设置下方图表用的监控点
const monitorChart = 'liantong'
// 监控点名称对应关系(用于显示)
const monitorNameMap = {
  liantong: '联通',
  yidong: '移动',
  dianxin: '电信',
  xinjiapo: '新加坡',
  deguo: '德国',
  meiguo: '美国',
}

// 设置你要的监控项
const field = 'delay'
// 健康险名称对应关系(用于显示)
const fieldNameMap = {
  delay: '延迟',
  loss: '丢包',
}
// 缓存过期时间(分钟)
const cacheExpiredMinutes = 60

let title = '';
let subTitle = '';
let monitor = '';
let data = [];
class Cache {
  constructor(name, expirationMinutes) {
    this.fm = FileManager.iCloud();
    this.cachePath = this.fm.joinPath(this.fm.documentsDirectory(), name);
    this.expirationMinutes = expirationMinutes;

    if (!this.fm.fileExists(this.cachePath)) {
      this.fm.createDirectory(this.cachePath)
    }
  }

  async read(key, expirationMinutes) {
    try {
      const path = this.fm.joinPath(this.cachePath, key);
      await this.fm.downloadFileFromiCloud(path);
      const createdAt = this.fm.creationDate(path);
      
      if (this.expirationMinutes || expirationMinutes) {
        if ((new Date()) - createdAt > ((this.expirationMinutes || expirationMinutes) * 60000)) {
          this.fm.remove(path);
          return null;
        }
      }
      
      const value = this.fm.readString(path);
    
      try {
        return JSON.parse(value);
      } catch(error) {
        return value;
      }
    } catch(error) {
      return null;
    }
  };

  write(key, value) {
    const path = this.fm.joinPath(this.cachePath, key.replace('/', '-'));
    console.log(`Caching to ${path}...`);

    if (typeof value === 'string' || value instanceof String) {
      this.fm.writeString(path, value);
    } else {
      this.fm.writeString(path, JSON.stringify(value));
    }
  }
}
const cache = new Cache('ping0')
try {
  let res
  const cached = await cache.read('res', cacheExpiredMinutes);
  if (cached && `${nameRegExp}` === cached.nameRegExp) {
    res = cached.res
    console.log('使用缓存')
  } else {
    console.log('获取实时数据')
    const req = new Request('https://ping0.cc/data.php?act=get&time=24hour')
    res = await req.loadJSON()
    if(!res?.[0]?.info?.name) throw new Error('未获取到数据')
  }

  console.log(`名称列表:\n${res.map(i => i.info?.name).filter(i => i).join('\n')}`)
  const item = res.find(i => nameRegExp.test(i.info?.name))
  if(!item) throw new Error(`未找到符合 ${args.widgetParameter} 正则的名称`)
  cache.write('res', { res: [item], nameRegExp: `${nameRegExp}` })
  console.log(`使用正则 ${nameRegExp} 匹配: ${item.info.name}`)
  title = item.info.name
  subTitle = `IP: ${item.info.ip}\n${fieldNameMap[field]}: 平均 / 最大`
  data = Object.values(item[monitorChart]).map(i => i[field])
  monitor = monitorNames.map(i => {
    const arr = Object.values(item[i]).map(j => j[field])
    return field === 'delay' ? `${monitorNameMap[i]}: ${getRound(getAvg(arr), 0)} / ${getRound(Math.max(...arr), 0)}` : `${monitorNameMap[i]}: ${getRound(getAvg(arr) * 100, 2)}% / ${getRound(Math.max(...arr) * 100, 2)}%`
  }).join('\n')
  console.log(`数据: ${data}`)
} catch (e) {
  console.log(e)
}
function getRound (num, decimal = 2) {
  return Math.round(num * Math.pow(10, decimal)) / Math.pow(10, decimal)
}
function getAvg (arr) {
  return arr.reduce((acc, cur) => acc + cur, 0) / arr.length
}

class LineChart {
  // LineChart by https://kevinkub.de/

  constructor(width, height, values) {
    this.ctx = new DrawContext()
    this.ctx.size = new Size(width, height)
    this.values = values
  }

  _calculatePath() {
    let maxValue = Math.max(...this.values)
    let minValue = Math.min(...this.values)
    let difference = maxValue - minValue
    let count = this.values.length
    let step = this.ctx.size.width / (count - 1)
    let points = this.values.map((current, index, all) => {
      let x = step * index
      let y = this.ctx.size.height - ((current - minValue) / difference) * this.ctx.size.height
      return new Point(x, y)
    })
    return this._getSmoothPath(points)
  }

  _getSmoothPath(points) {
    let path = new Path()
    path.move(new Point(0, this.ctx.size.height))
    path.addLine(points[0])
    for (let i = 0; i < points.length - 1; i++) {
      let xAvg = (points[i].x + points[i + 1].x) / 2
      let yAvg = (points[i].y + points[i + 1].y) / 2
      let avg = new Point(xAvg, yAvg)
      let cp1 = new Point((xAvg + points[i].x) / 2, points[i].y)
      let next = new Point(points[i + 1].x, points[i + 1].y)
      let cp2 = new Point((xAvg + points[i + 1].x) / 2, points[i + 1].y)
      path.addQuadCurve(avg, cp1)
      path.addQuadCurve(next, cp2)
    }
    path.addLine(new Point(this.ctx.size.width, this.ctx.size.height))
    path.closeSubpath()
    return path
  }

  configure(fn) {
    let path = this._calculatePath()
    if (fn) {
      fn(this.ctx, path)
    } else {
      this.ctx.addPath(path)
      this.ctx.fillPath(path)
    }
    return this.ctx
  }
}
let widget = new ListWidget()
let chart = new LineChart(400, 200, data)
  .configure((ctx, path) => {
    ctx.opaque = false
    ctx.setFillColor(new Color('888888', 0.5))
    ctx.addPath(path)
    ctx.fillPath(path)
  })
  .getImage()
const t = widget.addText(title)
t.font = Font.boldSystemFont(12);
const s = widget.addText(subTitle)
s.font = Font.lightSystemFont(12)
const m = widget.addText(monitor)
m.font = Font.lightSystemFont(12)
widget.addSpacer()
let image = widget.addImage(chart)

Script.setWidget(widget)
if (!config.runsInWidget) {
  await widget.presentSmall()
}
Script.complete()
