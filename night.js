var cheerio = require('cheerio')
var Nightmare = require('nightmare')
var nightmare = Nightmare()
var request = require('request')
var nightwatch = require('nightwatch');
var fs = require('fs');
var stream = fs.createWriteStream("my_file.txt");
var resultStream = fs.createWriteStream("./results/brand2.json",JSON,'utf8')
//var resultReadStream = fs.createReadStream("./results/.txt")
//var imageStream = fs.createWriteStream(__dirname+"/screenshots")
var imgpath = __dirname+"/screenshots/"
let rJson = {}
const finalArr=[]

var nightmare = Nightmare({
  openDevTools: {
    mode: 'detach'
  },
  show: true
});


let myUrl ="https://weedmaps.com/brands/category/flower/indica-flower?page=2"
let myUrl2= "https://weedmaps.com/brands/category/flower/indica-flower/page/2"


//downlaoding images
let download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
 //   console.log('content-type:', res.headers['content-type']);
 //   console.log('content-length:', res.headers['content-length']);

    let imgpath = __dirname+'/screenshots/'+filename+".jpg"
  
    request(uri).pipe(fs.createWriteStream(imgpath)).on('close', callback);
  });
}




let forBrands = (myUrl)=>{


let resutlArray = []
nightmare
.goto(myUrl)
.wait(210000)
.evaluate(function(){

let gigs = []


   // return  document.querySelectorAll("div.card-content a[href]").text()
    
    return document.body.innerHTML
  })
// document.querySelectorAll("div.card-content a").each(function(){

// let item = {}

// item['title']=$(this).text()
// item['link'] = $(this).attr('href')
// gigs.push(item)

// })

// return gigs

.end()
.then(function(results){

    // for(gig in results)
    // {
    //     console.log("title ",gig['title'])
    //     console.log("href ",gig['link'])
    // }

    
stream.write(results)
stream.end()

let $ = cheerio.load(results);
let brandArr=[] 
let q = ''
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
console.log(link)   
console.log(image)

item.brandName = brandName
item.link = link
item.image = image

//push item
brandArr.push(item)
finalArr.push(item)
}
})  
  
//console.log(brandArr)
console.log("finalArr",finalArr)

resultStream.write(JSON.stringify(finalArr))

finalArr.forEach(function(val){
//    console.log(val)

download(val['image'],val['brandName'], function(){
console.log('done downLaoding !!' + val['brandName']+".jpg");
});



})



})//then end
  




}

//forBrands(myUrl)

let detailBrand = function(brandUrl)
{

nightmare
.goto(myUrl)
.wait(3000)
.evaluate(function(){
    return document.body.innerHTML
})
.then(function(results){

console.log("html for page2"+myUrl)
//console.log(resuylts)
let a = $("a[href='/brands/category/flower/indica-flower?page=2']")

})

}


let brandpage2=()=>{

 
nightmare
.goto("https://weedmaps.com/brands/category/flower/indica-flower?page=1")
.wait(3000)
.wait("a.next-button")
.exists("a.next-button")
.wait(3000)
.visible("a.large-page-button next-button", function (visible) {
                
                                console.log('before clicking',visible);
            })
.evaluate(function(){
    
    var element = document.querySelector("a.next-button");
    var event = document.createEvent('MouseEvent');
    event.initEvent('click', true, true);
    element.dispatchEvent(event)
    
})
.then(function(results){
   // console.log(results)
  //  fs.createWriteStream('brandPage2.txt','utf8').write(results)
})
.catch(err=>{
    console.log("error "+err)
})
   
}

   const realMouse = require('nightmare-real-mouse');
// add the plugin
realMouse(Nightmare);
brandpage2()
//brandpage2("https://weedmaps.com/brands/category/flower/indica-flower?page=2")


  //  rJson['img']=$(this).attr('image')

//let brandName = rJson['link'].toString().split('/')[2]
//console.log(brandName)
//rJson['brandName'] = brandName

    //console.log($(this).attr('href'))
    //console.log($(this).attr('image'))
//q += JSON.stringify(rJson)


//resultStream.write(JSON.stringify(rJson))


//resultStream.write(q)

//console.log("results in result1.txt"+JSON.stringify(finalArr))
//resultStream.write(JSON.stringify(finalArr))





   // console.log(finalArr[index]['img'])
  //  console.log(finalArr[index]['brandName'])












