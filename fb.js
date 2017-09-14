
let path = require('path')
let imgPath = path.dirname + '/fb/images'
var page = require("webpage").create()
page.viewportSize={ width:1024, height:768 }
page.openUrl('https://www.facebook.com/')
.then(function(status){

        console.log("status : ---->",status)
        console.log(document.title);

//getting cookies
let getCookies = page.cookies

let addCookie = page.addCookie({name:'cookie1',value:"this is my COOKIE",domain:".facebook.com",path:"/",httponly:false})
console.log("addCookie "+addCookie)
let someContent = page.evaluate(function () {

          return document.body.querySelectorAll("img[src]")
            

        })


let page1Info =  page.evaluate(function(){



      document.querySelector("#email").value = 'daxeshmehra30@gmail.com'
      document.querySelector("#pass").value = "strangerbhavans"

      

        var ev = document.createEvent("MouseEvents");
        ev.initEvent("click", true, true);
        document.querySelector("#u_0_q").dispatchEvent(ev) 


        return document.body.querySelectorAll("img[src]")
    
 
   }) 


    let asp = []
    var page2 = require("webpage").create({loadImages:true})

    page1Info.forEach((items,index)=>{

      console.log("src : "+items.src)

      if(items.src != null)
      {
        let s = items.src.toString()
        page2.open(s,function(status){

            console.log(status," loading...     "+s)
            page2.viewportSize = { width:1024, height:768 }
            page2.render(imgPath+"/"+"img_"+index+".png")

                })

      }


    })

    let cook = []
    getCookies.forEach((item,index)=>{
      console.log('\x1b[32m'+"COOKIE @ INDEX:"+index+" are : "+JSON.stringify(item))
    })




})              

