// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: image;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: headphones-alt;
// 
// iOS 桌面组件脚本 @「小件件」
// 开发说明：请从 Widget 类开始编写，注释请勿修改
// https://x.im3x.cn
// 

// 添加require，是为了vscode中可以正确引入包，以获得自动补全等功能
if (typeof require === 'undefined') require = importModule
const { Base } = require("./「小件件」开发环境")




// @组件代码开始
class Widget extends Base {
  /**
   * 传递给组件的参数，可以是桌面 Parameter 数据，也可以是外部如 URLScheme 等传递的数据
   * @param {string} arg 自定义参数
   */
  constructor (arg) {
    super(arg)
    this.getCharacterCount = async () => {
      let count = 826
      try {
        const res = await this.httpGet('https://rickandmortyapi.com/api/character')
        count = res.info.count
      } catch (e) {
        console.error(e)
      }
      return count
    }
    this.getCharacter = async (count) => {
      let id = Math.floor(Math.random() * (count + 1)) 
      try {
        const res = await this.httpGet(`https://rickandmortyapi.com/api/character/${id}`)
        console.log(res)
        return res
      } catch (e) {
        console.error(e)
      }
    }
  }


  /**
   * 渲染函数，函数名固定
   * 可以根据 this.widgetFamily 来判断小组件尺寸，以返回不同大小的内容
   */
  async render () {
    const count = await this.getCharacterCount()
    const character = await this.getCharacter(count)
    const bg = await this.getImageByUrl(character.image)
    return await this[`${this.widgetFamily}Widget`]({bg, url: character.url, name: character.name})
  }

  /**
   * 渲染小尺寸组件
   */
  async smallWidget ({bg, url, name}) {
    const w = new ListWidget()
    

    w.addSpacer();
   
    const nameText = w.addText(name)
    nameText.font = Font.boldSystemFont(12)
    nameText.textColor = Color.white()
    nameText.centerAlignText()
    nameText.textOpacity = 0.8
      
    // w.addSpacer()

    w.backgroundImage = bg
    w.url = url
    return w
  }
  /**
   * 渲染中尺寸组件
   */
  async mediumWidget (data) {}
  /**
   * 渲染大尺寸组件
   */
  async largeWidget (data) {
    
  }

  
  /**
   * 自定义注册点击事件，用 actionUrl 生成一个触发链接，点击后会执行下方对应的 action
   * @param {string} url 打开的链接
   */
  async actionOpenUrl (url) {
    Safari.openInApp(url, false)
    // Safari.open(`shortcuts://run-shortcut?name=${encodeURIComponent('下为壁纸')}&input=${encodeURIComponent(url)}`)
  }

}
// @组件代码结束

const { Testing } = require("./「小件件」开发环境")
await Testing(Widget)