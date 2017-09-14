var cheerio = require('cheerio')
var Nightmare = require('nightmare')
var nightmare = Nightmare()
var request = require('request')
var nightwatch = require('nightwatch');
var fs = require('fs');
let firebaseClient = require('../firebaseClient.js');
let vo = require('vo')
let global = require('../global.js')



            //initilaizing night mare
            var nightmare = Nightmare({
            openDevTools: {
                mode: 'detach'
            },
            show: true
            });



            var run2  = function *(fbPath)
            {
                var urls = ["https://weedmaps.com/brands/chongs-choice/products/chongs-choice-hybrid-pre-roll-5-pack/near-me"]

                     var itemsProps = []
               for (let i = 0; i < urls.length; i++) {
                     
                        console.log("scraping scrapMapLink ",urls[i])
                        var itemdes = yield nightmare.goto(urls[i])
                        .wait('body')
                        .title()
                        .wait(7000)
                        .evaluate(function(){
                            return document.body.innerHTML
                        })
                        .then(function(results){

                        //fs.createWriteStream("./scrapHtml/dispen.txt","utf8").write(results)
                        let items = {}
                        let $ = cheerio.load(results)
                               
                               try {
                               
                                   let item={}
                                   let name = $("h1[itemprop='name']").text()
                                   if(name)
                                   item.name = name

                                   let ratingValue = $("h1[itemprop='ratingValue']").text()
                                   if(ratingValue)
                                   item.ratingValue = ratingValue


                                    let logoImage = $("img[itemprop='contentUrl url']").attr('src')
                                      if(logoImage)
                                        item.logoImage = logoImage ;
                                        console.log("image ",item.logoImage)


                                   let names = $("span[itemprop='name']").map((i,e)=>{
                                      item.names[i] = {name: $(this).text() }
                                   })
                                   if(names)
                                   item.name = name


                                }catch(error)
                               {
                                   console.log(error)
                               }
                               
                        })

               }
            }   

            var run = function * (fbPath) {
  
                        var urlB = []

                        let urls = ["https://weedmaps.com/brands/dr-zodiaks-moonrock/products"]
                                //    urls.push("https://weedmaps.com/brands/space-monkey-meds/products")

                                         //geting values from firebaseClient
                                            firebaseClient.getValue(fbPath+'/urls',urlA=>{
                                                
                                                urlA.map(function(val,index){

                                                    urls = val
                                                    console.log("it  ",urls[index])
                                                })
                                                  console.log("total scraping Links ",urls.length)
             
                                                                                         })
                                                                                          

                                            //     urls = Array.from(new Set(urls));
                                                 console.log("uniqueNames --->",urls)
                                                                        
                       
              var itemsProps = []
               for (let i = 0; i < urls.length; i++) {
                     
                     //   console.log("scraping scrapMapLink ",urls[i])
                        var itemdes = yield nightmare.goto(urls[i])
                        .wait('body')
                        .title()
                        .wait(7000)
                        .evaluate(function(){
                            return document.body.innerHTML
                        })
                        .then(function(results){

                        //fs.createWriteStream("./scrapHtml/dispen.txt","utf8").write(results)
                        let item = {}
                        let $ = cheerio.load(results)
                               
                               try {
                                   
                               
                                 let logoImage = $("img[itemprop='contentUrl url']").attr('src')
                                  if(logoImage)
                                        item.logoImage = logoImage ;
                                    console.log("image ",item.logoImage)


                                  let name = $("h1[itemprop='name']").text()
                                    if(name)
                                        item.name = name ;
                               
                             
                             
                                   item.mapLink = $("a[target='_blank']").attr('href')
                            //       console.log("mapLink ",item.mapLink)
                            



                               let length = $("div.item-row").find("wm-product-card").length

                               item.contentLength=length

                               item.cards = {}
                              let cr =  $("div.item-row").find("wm-product-card").map(function(i,e){

                                    let card = {}
                                     let cardImgUrl = $(this).attr('image')
                                     console.log("cardImgUrl",cardImgUrl)
                                     card.cardImgUrl= cardImgUrl

                                    let href =  $(this).children("a.card-wrapper").attr("href")
                                    card.cardLink = href

                                    let des = $(this, 'a').text()
                                    card.cardTitle = des

                                    console.log(" cardImgUr href",href)
                                    console.log("cardImgUr des",des)

                                    item.cards[i] = card

                                })

                                let cardUrls = {}
                                let Urls = $("a.card-wrapper").each(function(i,e){

                                    cardUrls[i] = $(this).attr("href")

                                })
                              
                              item.cardUrls = cardUrls

                            // $(".scroll-rows > section:nth-child(1) > wm-scroll-row:nth-child(1) > div:nth-child(1) > div:nth-child(2) > ion-scroll:nth-child(1) > div:nth-child(1) > div:nth-child(1) > wm-scroll-row-content > wm-product-card").each(ele=>{


                            // body > ion-nav-view > ion-side-menus > ion-side-menu-content > ion-nav-view > ion-view > ion-nav-view > wm-brand-detail > ion-content > div > div > div > main > wm-brand-products > div > section:nth-child(2) > wm-scroll-row > div > div.scroll-wrapper > ion-scroll > div > div > wm-scroll-row-content

                            // body > ion-nav-view > ion-side-menus > ion-side-menu-content > ion-nav-view > ion-view > ion-nav-view > wm-brand-detail > ion-content > div > div > div > main > wm-brand-products > div > section:nth-child(2) > wm-scroll-row > div > div.scroll-wrapper > ion-scroll > div > div > wm-scroll-row-content > wm-product-card:nth-child(1)

                            // body > ion-nav-view > ion-side-menus > ion-side-menu-content > ion-nav-view > ion-view > ion-nav-view > wm-brand-detail > ion-content > div > div > div > main > wm-brand-products > div > section:nth-child(2) > wm-scroll-row > div > div.scroll-wrapper > ion-scroll > div > div > wm-scroll-row-content > wm-product-card:nth-child(2)

                                   //social


                                                        var check = function(name)
                                                        {
                                                            return name.replace(/[^a-zA-Z ]/g, "")
                                                        }

                                                        item.name = check(item.name)

                                                    try {
                                                          firebaseClient.fbinit(fbPath+"/"+item.name)
                                                    } catch (error) {
                                                          firebaseClient.fbinit(fbPath+"/docName")
                                                    }
                                                      
                                                        firebaseClient.add(item)


                                                        console.log("index  "+i," \n\n<<--------------------------------xxx---------------------------------->> \n\n")
   

                                    itemsProps.push(itemdes)
                      
                                    } catch (error) {
                                   console.log("error",error)
                               }
                               
                })

                      
            }
            
            return itemsProps

        }

                        let scrapMapLink = function(fbPath)
                        {

                        vo(run(fbPath))(function(err, titles) {
                     //   console.dir("scrap datas --> ",titles);
                        });

                        }        


                            //filter Array for duplicates
                                    // let names = ["https://weedmaps.com/doctors/mmjrecs-5#/details","https://weedmaps.com/doctors/online-medical-cards-84","https://weedmaps.com/doctors/mmjrecs-5#/details","https://weedmaps.com/doctors/online-medical-cards-84","https://weedmaps.com/doctors/mmjrecs-5#/alpha"]
                                    // const uniqueNames = Array.from(new Set(names));
                                    // console.log("uniqueNames --->",uniqueNames)
                                


                      scrapMapLink(global.brandlocation)

exports.scrapMapLink =  scrapMapLink
