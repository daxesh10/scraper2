var Nightmare = require('nightmare')
var nightmare = Nightmare()
var iframe = require('nightmare-iframe')
let firebaseClient = require('../firebaseClient.js')
let cheerio =require("cheerio")
var request = require('request')
var fs = require('fs');


//initilaizing night mare
            var nightmare = Nightmare({
            openDevTools: {
                mode: 'detach'
            },
            webPreferences: {
                            webSecurity:false
            },
              show: true
            });


firebaseClient.firebaseGetRecentImageDownload(global=>{





 let getImgName = function(s)
 {
//let s = "https://bitconnectcoin.co/upload/press_release/035.jpg"
let sArr = s.split('/')
let name = sArr[sArr.length-1].toString()
//console.log(name)
return name

 }

//downlaoding images
let download = function(uri,pathToStore,filename,callback){
  request.head(uri, function(err, res, body){
 //   console.log('content-type:', res.headers['content-type']);
 //   console.log('content-length:', res.headers['content-length']);

    
    if (!fs.existsSync(pathToStore)){
    fs.mkdirSync(pathToStore);
        }
    
   

    let imgpath = pathToStore+'/'+filename+".jpg"
  
    request(uri).pipe(fs.createWriteStream(imgpath)).on('close', callback);
  });
}



let resource = (result,global)=>{

 let $ = cheerio.load(result)

$("img").each((index,ele)=>{

    let uri = $(ele).attr('src')

    if(uri && !uri.match(new RegExp('^' + "http", 'i')))
    {
        uri = global.webUrl+"/"+uri
    }


    download(uri,global.pathToStore,index,()=>console.log("downlaoding image :   "+uri))
})


}













 nightmare
         .goto(global.webUrl)
         .wait('body')
         .title()
         .wait(7000)
         .evaluate(()=>{
             return document.body.innerHTML
         })
         .end()
         .then(result=>{

            resource(result,global)
           //done();
         })
         .catch(function (error) {
                    console.error('Search failed:', error);
                });






})