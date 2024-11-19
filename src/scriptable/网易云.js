// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-brown; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: newspaper;

let items = await loadItems()

let widget = await createWidget(items)
// Check if the script is running in
// a widget. If not, show a preview of
// the widget to easier debug it.
if (!config.runsInWidget) {
  await widget.presentMedium()
}
// Tell the system to show the widget.
Script.setWidget(widget)
Script.complete()

async function createWidget(items) {
  let item = items
  log(item)
  let authors = item.data.nickname

  let gradient = new LinearGradient()
  gradient.locations = [0, 1]
  gradient.colors = [
    new Color("#b00a0fe6"),
    new Color("#b00a0fb3")
  ]
  let w = new ListWidget()
//   if (imgURL != null) {
    let imgReq = new Request(item.data.picurl)
    let img = await imgReq.loadImage()
    w.backgroundImage = img
//   }
  w.backgroundColor = new Color("#b00a0f")
  w.backgroundGradient = gradient
  
   
  
    let header = w.addStack()
    header.centerAlignContent()
    let title = header.addText("网易云热评 "+item.data.artistsname+"."+item.data.name)
    title.url = "orpheuswidget://"
    title.textColor = Color.white()
    title.textOpacity = 0.7
    title.font = Font.boldSystemFont(12)
    w.addSpacer(10)
  
  // Add spacer above content to center it vertically.
//   w.addSpacer()
  // Show article headline.
  let titleTxt = w.addText("『"+item.data.content+"』")
  titleTxt.font = Font.boldSystemFont(18)
  titleTxt.textColor = Color.white()
//   titleTxt.textOpacity = 0.88
//   titleTxt.url = 'orpheus://song/' + item.data.url
titleTxt.url = `orpheus://song/${item.data.url.split('?')[1].split('=')[1].split('.')[0]}`     
// titleTxt.url = item.data.url
  // Add spacing below headline.
  w.addSpacer(10)
  // Show authors.
  let authorsTxt = w.addText(" by " + authors)
  authorsTxt.font = Font.mediumSystemFont(12)
  authorsTxt.textColor = Color.white()
  authorsTxt.textOpacity = 0.9
  // Add spacing below authors.
  w.addSpacer(2)
  // Show date.
//   let dateTxt = w.addText(strDate)
//   dateTxt.font = Font.mediumSystemFont(12)
//   dateTxt.textColor = Color.white()
//   dateTxt.textOpacity = 0.9
  // Add spacing below content to center it vertically.
  w.addSpacer()
  return w
}
  
async function loadItems() {
//   let url = "https://www.avg.cx/api/music/163-api.php"
let url="https://api.uomg.com/api/comments.163"
  let req = new Request(url)
  let json = await req.loadJSON()
  return json
}

function extractImageURL(item) {
  let regex = /<img src="(.*)" yalt="/
  let html = item["content_html"]
  let matches = html.match(regex)
  if (matches && matches.length >= 2) {
    return matches[1]
  } else {
    return null
  }
}