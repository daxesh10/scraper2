let global = require("./imageSpecs.js")
let path = require('path')
let imgPath = "F:/dax"



 
 let getImgDimensions= (img)=> {
               
                return {
                    top : img.offset().top,
                    left : img.offset().left,
                    width : img.width(),
                    height : img.height()
                    }
       }
 

 let getImgName = function(s)
 {
//let s = "https://bitconnectcoin.co/upload/press_release/035.jpg"
let sArr = s.split('/')
let name = sArr[sArr.length-1].toString()
//console.log(name)
return name

 }

//let img = "https://bitconnectcoin.co/upload/press_release/035.jpg"
//console.log("this is downloading",getImgDimensions(img))


let count = 1
let openPage = (s,global)=>{

let imgPath = global.pathToStore

if(s!=null)
{



//for screnshoot images 
var page2 = require("webpage").create({loadImages:true})

page2
.open(s,function(status){

    

    page2.viewportSize = { width:1024, height:768 }
    let name = getImgName(s)  
    
   page2.render(imgPath+"/"+"img"+count+++".png")
    console.log('\x1b[34m'+" loading...     "+s+" as "+"\n img_"+count)
})
.then(function(){

    let d = getImgDimensions(s)
    console.log("dimensions of image "+ d)
})

}
}

let st = (item)=>{


let fs = require('fs')
fs.createWriteStream('slimer_data.txt').write(JSON.stringify(item))


}
//load a page on slimer 1st
//url : https://bitconnectcoin.co/
//url : https://www.pexels.com/
//url : https://www.youtube.com/
//url : http://www.istockphoto.com/
//url : https://unsplash.com/
//url : https://stocksnap.io/view-photos/sort/trending/desc  http://www.lifeofpix.com/






var page = require("webpage").create()
page.open("http://www.istockphoto.com/", function (status) { 


 
     var someContent = page.evaluate(function () {
          return document.body.querySelectorAll("img[src]")
            

        })


    console.log('The introduction: '+someContent.length)
    let asp = []
    someContent.forEach((items,index)=>{

             //console.log(items.src)
             asp.push(items.src)
             //console.log(index)


        
    
})
 
let s = asp[3].toString()

asp.forEach((item)=>{


//to open each img for donwload sending urls
openPage(item.toString())

})



 })// sacpe page <ins></ins>





