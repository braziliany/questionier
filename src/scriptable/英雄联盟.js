// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color:  yellow; icon-glyph: grin-beam;
/**
 * S11 桌面小组件(大尺寸版）
 * Author  : BlueSky
 * Version : 3.1-211010
 * API     : https://tiyu.baidu.com/match/S14
 * Gist    : https://gist.github.com/BlueSky-07/70bcfedc4e5fe7fcf1b06db48124fffe
 * Readme  : https://sspai.com/post/62980
 */

const VERSION = '3.1-211010'

const README_URL = 'https://sspai.com/post/62980'

const GIST_URL = 'https://gist.github.com/BlueSky-07/70bcfedc4e5fe7fcf1b06db48124fffe'


/**
 * 日期偏移
 * -1: 今天晚上开始的比赛
 */
const _offset_ = -1

/**
 * 最多日期偏移量绝对值
 */
const MAX_ABS_OFFSET = 15


/**
 * 接口地址
 * {date_string} 表示替换日期字符串占位
 */
const base_api_url = 'https://tiyu.baidu.com/api/match/S14/live/date/{date_string}/direction/after'

/**
 * 百度专题页面，点击底部最近更新跳转到网页
 */
const page_url = 'https://tiyu.baidu.com/match/S14'

/**
 * 官方直播间，点击标题跳转到哔哩哔哩
 */
const live_url = 'https://live.bilibili.com/h5/6'

/**
 * 统计
 */
const statistics_url = 'https://api.ihint.me/statistics.php?site=scriptable_s14'

/**
 * 高亮队伍名称
 */
const highlight_team_names = ['BLG', 'TES', ' WBG', 'LNG']

/**
 * 标题
 */
const header_text = 'LoL S14'

/**
 * Logger 等级
 */
const allowed_logger_levels = [
  'warn',
  'error',
  'info',
  'debug',
// 'verbo',
]

/**
 * 简易 Logger
 */
const logger = {
  log(level = 'info', ...args) {
    if (allowed_logger_levels.includes(level)) {
      const fn = console[level] || console.log
      fn(`[${level.padStart(5)}] ` + args.map(this.stringify).join(' '))
    }
  },
  stringify(target) {
    if (target === null) {
      return '__null__'
    } else if (target === undefined) {
      return '__undefined__'
    } else if (typeof target === 'function') {
      return 'function:' + target.name
    } else if (typeof target === 'object') {
      return JSON.stringify(target)
    } else {
      return target.toString()
    }
  },
  warn(...args) {
    this.log('warn', ...args)
  },
  error(...args) {
    this.log('error', ...args)
  },
  info(...args) {
    this.log('info', ...args)
  },
  debug(...args) {
    this.log('debug', ...args)
  },
  verbose(...args) {
    this.log('verbo', ...args)
  },
}

/**
 * 构造日期字符串
 * @param {number} offset 日期偏移量，单位（天）
 * @return {string} dateString
 */
function getDateString(offset = 0) {
  const date = new Date(new Date().getTime() + offset * 60 * 60 * 24 * 1000)
  const dateFormatter = new DateFormatter()
  dateFormatter.dateFormat = 'yyyy-MM-dd'
  const string = dateFormatter.string(date)
  logger.verbose('date', string)
  return string
}

/**
 * 构造请求链接
 * @param {number} offset 日期偏移量，单位（天）
 * @return {string} url
 */
function getDataSourceUrl(offset = 0) {
  const url = base_api_url.replace('{date_string}', getDateString(offset))
  logger.debug('url', url)
  return url
}

/**
 * 请求缓存
 * Map<string, any>
 */
const request_cache = new Map()

/**
 * 带缓存的网络请求，用于减少重复请求
 * @param {string} url
 * @param {enum} 'json' / 'image' / 'string'
 * @return {Image} image / {JSON} json / {string} string
 */
async function getCachedDataFromUrl(url, type) {
  if (request_cache.has(url)) {
    logger.verbose('<cache>', '[read]', url)
    return request_cache.get(url)
  } else {
    const request = new Request(url)
    let data
    switch (type) {
      case 'json': {
        data = await request.loadJSON()
        break
      }
      case 'image': {
        data = await request.loadImage()
        break
      }
      case 'string':
      default: {
        data = await request.loadString()
        break
      }
    } 
    request_cache.set(url, data)
    logger.verbose('<cache>', '[write]', url)
    return data
  }
}



/**
 * 主组件
 * @param {number} offset 日期偏移量，单位（天）
 */
async function renderMainWidget(offset = default_offset) {
  const todayUrl = getDataSourceUrl(offset)
  const todayJson = await getCachedDataFromUrl(todayUrl, 'json')
  logger.verbose('today json', todayJson)

  const todayData = todayJson?.data ?? []
  if (!todayData) {
    throwError({
      message: '请求数据错误(1)',
      errorcode: 'FETCHED_INVALID_DATA(1)',
      description: todayUrl,
    })
  }

  const tommorowUrl = getDataSourceUrl(offset + 1)
  const tommorrowJson = await getCachedDataFromUrl(tommorowUrl, 'json')
  logger.verbose('tommorrow json', tommorrowJson)

  const tommorrowData = tommorrowJson?.data ?? []
  if (!tommorrowData) {
    throwError({
      message: '请求数据错误(2)',
      errorcode: 'FETCHED_INVALID_DATA(2)',
      description: tommorowUrl,
    })
  }

  const dateString = getDateString(offset + 1)

  const dateFormatter = new DateFormatter()
  dateFormatter.dateFormat = 'yyyy-MM-dd HH:mm:ss'

  let lastStartTime
  let reOrderedData = []

  const twoDaysData = [...todayData[0]?.list ?? [], ...tommorrowData[0]?.list ?? []].flat()

  const history = new Set()
  for (const item of twoDaysData) {
    if (history.has(item.startTime)) continue
    history.add(item.startTime)

    const thisStartTime = dateFormatter.date(item.startTime)
    if (lastStartTime && thisStartTime.getTime() - lastStartTime.getTime() > 12 * 60 * 60 * 1000) {
      if (item.startTime.startsWith(dateString)) {
        reOrderedData = []
      } else {
        break
      }
    }
    reOrderedData.push(item)
    lastStartTime = thisStartTime
  }
  
  if (reOrderedData[0] && !reOrderedData[0].startTime.startsWith(dateString)) {
    // 今天没有比赛
    reOrderedData = []
  }
  
  if (!reOrderedData.length) {
    if (Math.abs(offset) > MAX_ABS_OFFSET) {
      throwError({
        message: '请求网络超过上限',
        errorcode: 'OFFSET_OVER_LIMIT',
        description: `${offset} 超过界限 -${MAX_ABS_OFFSET} ~ ${MAX_ABS_OFFSET}`,
      })
    }
    return renderMainWidget(offset + 1)
  }

  logger.verbose('re-order', reOrderedData)

  const widget = new ListWidget()
  widget.backgroundColor = new Color('#555555')

  const header = widget.addText(header_text)
  header.rightAlignText()
  header.textColor = Color.gray()
  header.font = Font.mediumSystemFont(12)
  header.url = live_url

  const title = widget.addText(dateString)
  title.font = Font.heavySystemFont(14)
  title.textColor = 
    dateString === getDateString()
      ? Color.orange()
      : Color.white()

  widget.addSpacer(5)
  for (const item of reOrderedData) {
    const { time, leftLogo: l, rightLogo: r, status, statusText } = item
    logger.debug('render', time, statusText, l.name, l.score, r.name, r.score)
    let winner
    if (status === '2' || status === '3') {
      let l_score = Number.parseInt(l.score)
      let r_score = Number.parseInt(r.score)
      if (l_score > r_score) winner = 'l'
      if (r_score > l_score) winner = 'r'
      logger.verbose('winner', winner)
    }

    const stack = widget.addStack()

    function addText(string, color, url) {
      const text = stack.addText(string)
      text.textColor = color || Color.white()
      text.font = new Font('menlo', 12)
      if (url) {
        text.url = url
      }
      return text
    }

    function addImage(img) {
      const image = stack.addImage(img)
      image.imageSize = new Size(16, 16)
      return image
    }

    const l_logo = await getCachedDataFromUrl(l.logo, 'image')
    const r_logo = await getCachedDataFromUrl(r.logo, 'image')

    addText('      ')
    addImage(l_logo)
    addText('   ')
    addText(l.name.replace(/[^a-zA-Z0-9]/g, '').padStart(4), highlight_team_names.includes(l.name) && Color.red())

    if (status === '1') {
      addText(`  [进行中]  `, Color.yellow(), item?.vipLiveInfo?.link)
    } else if (status === '4') {
      addText(`  [${time}]  `, Color.white(), item?.vipLiveInfo?.link)
    } else {
      addText('   ')
      addText(l.score, winner === 'l' && Color.orange())
      addText(' - ')
      addText(r.score, winner === 'r' && Color.orange())
      addText('   ')
    }

    addImage(r_logo)
    addText('   ')
    addText(r.name.replace(/[^a-zA-Z0-9]/g, '').padEnd(4), highlight_team_names.includes(r.name) && Color.red())

    widget.addSpacer(3)
  }

  widget.addSpacer(12)
  const footer = widget.addText('最后更新：' + new Date().toLocaleString())
  footer.rightAlignText()
  footer.textColor = Color.gray()
  footer.font = Font.mediumSystemFont(10)
  footer.url = page_url

  render(widget)
}

/**
 * 错误信息组件
 * @param {object} payload
 * @param {string} payload.message 错误信息
 * @param {string} payload.errorcode 错误代码
 * @param {string} payload.description 描述信息
 */
function renderErrorWidget(payload = {}) {
  const widget = new ListWidget()

  const backgroundGradient = new LinearGradient()
  backgroundGradient.colors = [
    new Color('#f5222d'),
    new Color('#cf1322'),
    new Color('#a8071a'),
    new Color('#820014'),
    new Color('#5c0011'),
  ]
  backgroundGradient.locations = [
    0.0, 0.25, 0.5, 0.75, 1.0,
  ]
  widget.backgroundGradient = backgroundGradient

  const message = payload.message || '出现错误'
  const error = widget.addText(message)
  error.centerAlignText()
  error.textColor = Color.white()
  error.font = Font.heavySystemFont(18)

  if (payload.errorcode) {
    widget.addSpacer(5)
    const errorcode = widget.addText(payload.errorcode)
    errorcode.centerAlignText()
    errorcode.textColor = Color.yellow()
    errorcode.font = Font.lightSystemFont(14)
  }
    
  if (payload.description) {
    widget.addSpacer(5)
    const description = widget.addText(payload.description)
    description.centerAlignText()
    description.textColor = Color.white()
    description.font = Font.lightSystemFont(12)
  }
  
  widget.addSpacer(20)
  const version = widget.addText(VERSION)
  version.centerAlignText()
  version.textColor = Color.white()
  version.font = Font.boldSystemFont(10)
  version.url = GIST_URL

  widget.addSpacer(5)
  const readme = widget.addText(README_URL)
  readme.centerAlignText()
  readme.textColor = Color.white()
  readme.font = Font.italicSystemFont(10)
  readme.url = README_URL

  render(widget)
}

/**
 * 渲染
 * @param {Widget} widget
 */
function render(widget) {
  if (!widget) {
    throwError({ message: 'widget is required' })
  } else {
    Script.setWidget(widget)
    widget.presentLarge()
    // widget.presentMedium()
    // widget.presentSmall()
  }
}

/**
 * 统一 Error
 * @param {object} payload
 * @param {string} payload.message 错误信息
 * @param {string} payload.errorcode 错误代码
 * @param {string} payload.description 描述信息
 */
function throwError(payload = {}) {
  const error = new Error(payload.message || '出现错误')
  Object.assign(error, payload)
  logger.error(payload.message ?? '', payload.errorcode ?? '', payload.description ?? '')
  throw error
}

async function statistics() {
  const url = statistics_url
  const request = new Request(url)
  const res = await request.loadString()
  logger.debug('statistics', res)
}

/**
 * Main
 */
async function main() {
  logger.info('bootstrap')
  const widgetArgs = args.widgetParameter
  logger.info('widget args', widgetArgs)
  let offset = _offset_
  if (widgetArgs) {
    try {
      offset = Number.parseInt(widgetArgs)
      if (Number.isNaN(offset)) {
        throwError({
          message: '解析参数错误',
          errorcode: 'INVALID_ARGS',
          description: `"${widgetArgs}" 不是合法数字`,
        })
      }
    } catch (e) {
      logger.info('parse args error')
      renderErrorWidget(e)
      throw e
    }
  }
  try {
    await renderMainWidget(offset)
    logger.info('render done')
    await statistics()
    Script.complete()
  } catch (e) {
    console.error(e)
    renderErrorWidget(e)
    throw e
  }
  logger.info('done')
}

main()