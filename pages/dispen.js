var cheerio = require('cheerio')
var Nightmare = require('nightmare')
var nightmare = Nightmare()
var request = require('request')
var nightwatch = require('nightwatch');
var fs = require('fs');
let firebaseClient = require('../firebaseClient.js');
let vo = require('vo')

//let firebaseClient = require('../firebaseClient.js')





//initilaizing night mare
var nightmare = Nightmare({
  openDevTools: {
    mode: 'detach'
  },
  show: true
});





//downlaoding images
let download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
 //   console.log('content-type:', res.headers['content-type']);
 //   console.log('content-length:', res.headers['content-length']);

    let imgpath = './screenshots/dispen/'+filename+".jpg"
  
    request(uri).pipe(fs.createWriteStream(imgpath)).on('close', callback);
  });
}


let dispencery = (myUrls)=>{


console.log("no of calls ",myUrls.length)



if(myUrls.length)
    myUrls.forEach(function(myUrl){

   
      let item = {}
      nightmare
      .goto(myUrl)
      .wait(7000)
      .evaluate(function(){
          return document.body.innerHTML
      })
      .end()
      .then(function(results){

      //fs.createWriteStream("./scrapHtml/dispen.txt","utf8").write(results)
      let $ = cheerio.load(results)

         console.log("scraping for page url: "+myUrl)
         console.log("/n/n/n<------------------------------------------------------------>/n/n/n")



      item.image = $("img.listing-logo").attr('src')
      console.log("image ",item.image)


      item.name = $("h1[itemprop='name']").text()
      console.log("name ",item.name)


      item.priceRange = $("meta[itemprop='priceRange']").attr('content')
      console.log("priceRange ",item.priceRange)

      item.mapLink = $("a[target='_blank']").attr('href')
      console.log("mapLink ",item.mapLink)

      item.streetAddress = $("span[itemprop='streetAddress']").text()
      console.log("streetAddress ",item.streetAddress)

      item.addressLocality = $("span[itemprop='addressLocality']").text()
      console.log("addressLocality ",item.addressLocality)

      item.postalCode = $("span[itemprop='postalCode']").text()
      console.log("postalCode ",item.postalCode)

      item.telephone = $("a[itemprop='telephone']").text()
      console.log("telephone ",item.telephone)

      item.email = $("a[itemprop='email']").text()
      console.log("email ",item.email)

      item.menuDetails={}

      item.menuDetails.categories = $("#wm_globals").attr('data-menu-item-categories')
      item.menuDetails.categories.forEach(c=>console.log("menuDetails categories ",c))

      item.menuDetails.priceLabels = $("#wm_globals").attr('data-price-labels')
      console.log("menuDetails ",item.menuDetails.priceLabels)


      item.menuDetails.gramPrice = $("#wm_globals").attr('data-gram-priced')
      console.log("menuDetails ",item.menuDetails.gramPrice)


      




//downlaoding image

// try {
  
//   download(item.image,item.name,function(){
//     console.log("downlaoding ",item.name+".jpg")
//   })

// } catch (error) {
  
//   console.log(error)
// }




})


.catch(err=>{
    console.log("error: ",err)
})


    })

}    


var run = function * (fbPath) {
  
  var urlB = []

  var urls = ['https://weedmaps.com/dispensaries/anaheim-healing-center'];
  
  firebaseClient.getValue(fbPath+"/urls",urlA=>{
  //  console.log("returned ",urlA)
    
        for(let j=0;j<urlA.length;j++)
          {
           // console.log("urls ===> ",urlA[j])
            urls.push(urlA[j])
          }

           console.log("total scraping Links ",urls.length)
                                                    

  })
  
  
  
  


  
  
  var titles = [],item ={};
  for (var i = 0; i < urls.length; i++) {
    var title = yield nightmare.goto(urls[i])
      .wait('body')
      .title()
      .wait(7000)
      .evaluate(function(){
          return document.body.innerHTML
      })
      .then(function(results){

      //fs.createWriteStream("./scrapHtml/dispen.txt","utf8").write(results)
       let $ = cheerio.load(results)


                        
                    item.image = $("img.listing-logo").attr('src')
                //    console.log("image ",item.image)


                    item.name = $("h1[itemprop='name']").text()
              //      console.log("name ",item.name)


                                  
                    item.priceRange = $("meta[itemprop='priceRange']").attr('content')
             //       console.log("priceRange ",item.priceRange)


                    item.mapLink = $("a[target='_blank']").attr('href')
             //       console.log("mapLink ",item.mapLink)

                    item.streetAddress = $("span[itemprop='streetAddress']").text()
            //        console.log("streetAddress ",item.streetAddress)

                    item.addressLocality = $("span[itemprop='addressLocality']").text()
            //        console.log("addressLocality ",item.addressLocality)

                    item.postalCode = $("span[itemprop='postalCode']").text()
            //        console.log("postalCode ",item.postalCode)

                    item.telephone = $("a[itemprop='telephone']").text()
            //        console.log("telephone ",item.telephone)

                    item.email = $("a[itemprop='email']").text()
            //        console.log("email ",item.email)

                    
                    
                    item.menuDetails={}

                    item.menuDetails.categories = JSON.parse($("#wm_globals").attr('data-menu-item-categories'))
                //    console.log("menuDetails ",item.menuDetails.categories)

                    item.menuDetails.priceLabels = $("#wm_globals").attr('data-price-labels')
                //    console.log("menuDetails ",item.menuDetails.priceLabels)


                    item.menuDetails.gramPrice = JSON.parse($("#wm_globals").attr('data-gram-priced'))
                //    console.log("menuDetails ",item.menuDetails.gramPrice)


                    item.dayOfWeek = {}
                                    let dayOfWeek= ()=>{

                                        let days = {}
                                        for(let i=1;i<=7;i++)
                                        {
                                            let day = $(" div.details-card-items:nth-child(1) > div:nth-child("+i+") > div:nth-child(1)").text()
                                           // console.log("index ",i," day is",day)
                                            
                                           let open = $("div.details-card-items:nth-child(1) > div:nth-child("+i+") > div:nth-child(2) > span:nth-child(1)").text()
                                           // console.log(open)
                                            
                                           let close = $("div.details-card-items:nth-child(1) > div:nth-child("+i+") > div:nth-child(2) > span:nth-child(2)").text()
                                           // console.log(close)
                                            
                                           days[i] = {day:day,open:open,close:close}

                                    
                                        }

                                      item.dayOfWeek = days
                                    }

                                    

                                    //adding days
                                    dayOfWeek()


                                    var check = function(name)
                                                             {
                                                                    return name.replace(/[^a-zA-Z ]/g, "")
                                                              }

                                    item.name = check(item.name)


                  try {
                    
                    firebaseClient.fbinit(fbPath+"/"+item.name)
                    firebaseClient.add(item)

                  } catch (error) {
                      console.log(error)                    
                  }
                   
                    
                    



  
      })
  
  
    titles.push(item);
  }
  return titles;

      
}


let scrapMapLink = function(fbPath)
{

vo(run(fbPath))(function(err, titles) {
//  console.dir(titles);
});

}

//scrapMapLink("dispen/loaction/anahelm")


//exports.dispencery = dispencery
exports.download = download
exports.scrapMapLink = scrapMapLink