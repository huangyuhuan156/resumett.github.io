
//把code写到#code标签展示和style标签里
function writeCss(prefix, code, fn) {
    let domCode = document.querySelector('#code')
    let n = 0
    let id = setInterval( ()=> {
        n += 1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n),Prism.languages.css)
        styleTag.innerHTML = prefix + code.substring(0 ,n)
        domCode.scrollTop =domCode.scrollHeight
        if (n >= code.length){
            window.clearInterval(id)
            fn && fn.call()
        }
    },15)
}
//写markdown
function writeMarkdowm(markdown, fn) {
    let domPaper = document.querySelector('#paper>.content')
    let n = 0
    let id = setInterval( ()=> {
        n += 1
        domPaper.innerHTML = markdown.substring(0,n)

        domPaper.scrollTop =domPaper.scrollHeight
        if (n >= markdown.length){
            window.clearInterval(id)
            fn && fn.call()
        }
    },20)
}

var css1 = `/*
 *面试官你好，我是黄玉欢
 */
 
 *{
    transition: all 0.5s;
 }
 html{
    background: #eee;
 }
 #code{
    border: 1px solid #aaa;
    padding: 16px;
 }
 
 .token.selector{ color: #690;}
 .token.property{ color: #905;}
 #code{
    animation: breath 1s infinite alternate-reverse; 
 }
 
 #code-wrapper{
    width: 50%;left: 0; position: fixed;
    height: 100;
 }
 
 #paper > .content {
    display: block;
 }
 
`

var css2 = `
 /
`
var md =`
# 自我介绍

-我叫黄玉欢
-年龄21
-西北民族大学
-信息与计算科学专业
-求职前端开发岗位

# 技能介绍
熟悉各种前端知识


# 联系方式
- QQ 2195766230
- Email huangyuhuan156@163.com
- 手机 18294416053

`

var css3 = `
/*
 * 谢谢观看
 */
`

// 重点

writeCss('',css1,()=>{
    createPaper(()=>{
        writeMarkdowm(md,()=>{
            writeCss(css1,css2,()=>{
                convertMarkdownToHtml(()=>{
                    writeCss(css1 + css2, css3, ()=>{
                        console.log('完成')
                    })
                })
            })
        })
    })
})

function createPaper(fn) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn && fn.call()
}

function convertMarkdownToHtml(fn) {
    var div = document.createElement('div')
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper >.content')
    markdownContainer.replaceWith(div)
    fn && fn.call()
}