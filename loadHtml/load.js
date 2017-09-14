let cheerio = require('cheerio')
let fs = require('fs')
let firebaseClient = require('../firebaseClient.js'),
request = require('request')




//downlaoding images
let download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
 //   console.log('content-type:', res.headers['content-type']);
 //   console.log('content-length:', res.headers['content-length']);

    let imgpath = './screenshots/'+filename+".jpg"
  
    request(uri).pipe(fs.createWriteStream(imgpath)).on('close', callback);
  });
}





let check = function($,fbpath)
{
 let brandArr = [],uris = []
  
// let $ = cheerio.load(result.value)

 let urls = $('.wm-brand-card')
 let keys = Object.keys(urls)
//console.log(keys)

keys.forEach(function(val){

if(!isNaN(val))
{

//console.log(urls[val])
let item = {}
let link = urls[val]['attribs']['href']
let brandName = link.toString().split('/')[2] 
let image = urls[val]['attribs']['image']
console.log(brandName)
//console.log(link)   
//console.log(image)

item.brandName = brandName
item.link = link
item.image = image


//downlaoding images 

// if(item.image)
// download(item['image'],item['brandName'], function(){
// console.log('done downLaoding !!' + val['brandName']+".jpg");
// });

//push item
brandArr.push(item)

uris.push("https://weedmaps.com/"+item.link)

}
})  

//console.log("brandArr is ",brandArr)

//save in firebaseClient

loadFirebase(brandArr,uris,fbpath)

}

let loadFirebase = (brandArr,uris,fbpath)=>
{

if(brandArr,fbpath)
{
    //setting path to firebaseClient

    firebaseClient.fbinit(fbpath)
    let items = {}
       
    brandArr.forEach((item,index)=>{
         firebaseClient.add(item)
    })

}
    let urls ={}
    firebaseClient.fbinit(fbpath+"/uris")
    uris.forEach((item,index)=>{
        
        urls[index] = item
    })
    firebaseClient.add(urls)
    console.log("adding items")

}


let loadHtml = function(data,fbpath)
{

//let results = ''
//fs.readFile("./scrapHtml/brandpage4.txt","utf8",(err,data)=>{


 if(data)
  {
     console.log('reading data file')
     
    let $ = cheerio.load(data);
    check($,fbpath)
 } 

//})   
   
   



}

//loadHtml("brands/indica")


exports.loadHtml = loadHtml
exports.loadFirebase = loadFirebase
exports.check = check