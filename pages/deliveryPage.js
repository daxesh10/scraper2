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


            var run = function * (fbPath) {
  
                        var urlB = []

                        var urls = ["https://weedmaps.com/deliveries/orange-county-s-patient-care"]
                            
                           // urls.push("https://weedmaps.com/deliveries/onestopoc-2-7")                                                
                         //geting values from firebaseClient
                                            firebaseClient.getValue(fbPath+"/urls",urlA=>{
                                                for(let j=0;j<urlA.length;j++)
                                                {
                                                // console.log("urls ===> ",urlA[j])
                                                    urls.push(urlA[j])
                                                }
                                                     console.log("total scraping Links ",urls.length)
                                                         })
             
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
                        let item = {}
                        let $ = cheerio.load(results)
                               
                               try {
                                   
                               
                                 item.logoImage = $("img[itemprop='logo']").attr('src')
                                 // if(logoImage)
                                  //      item.logoImage = logoImage ;
                                    console.log("image ",item.logoImage)


                                  item.name = $("h1[itemprop='name']").text()
                                  //  if(name)
                                    //    item.name = name ;
                               
                                  console.log("name ",item.name)
                      
                                   
                                     item.docAddress = $("#listing-profile > div > div > div > div.listing-details > h2").text()
                                     // if(docAddress)
                                      //  item.docAddress = docAddress ;
                               
                                    console.log("docAddress ",item.docAddress)
                      
                                        
                                       item.address = {}

                                       let street = $("span[itemprop='streetAddress']").text()
                                       if(street)
                                        item.address.street = street ;
                               
                                   console.log("street ",item.address.street)
                      
                                   
                                     let local = $("span[itemprop='addressLocality']").text()
                                         if(local)
                                        item.address.local = local ;
                                                                     
                            
                                    console.log("docAddress ",item.address.local)
                      
                                   

                                   let region = $("span[itemprop='addressRegion']").text()
                                         if(local)
                                        item.address.region = region ;

                                         console.log("docAddress ",item.address.region)
                      

                                         let zipcode = $("span[itemprop='postalCode']").text()
                                          if(zipcode)
                                        item.address.zipcode = zipcode ;
                                    console.log("docAddress ",item.address.zipcode)

                                
                                   let phone = $(".listing-contacts > a:nth-child(1)").text()
                                     if(phone)
                                        item.phone = phone ;
                                    console.log("phone ",item.phone)

                                    let email = $(".listing-contacts > a:nth-child(2)").text()
                                      if(email)
                                        item.email = email ;
                                    console.log("email ",item.email)
          
                                  
                                    let priceRange = $("meta[itemprop='priceRange']").attr('content')
                                    if(priceRange)
                                        item.priceRange = priceRange ;
                                    //       console.log("priceRange ",item.priceRange)


                                    let mapLink = $("a[target='_blank']").attr('href')
                                    if(mapLink)
                                        item.mapLink = mapLink ;
                                    
                                     let website = $("div.details-card-item-data > a[itemprop='url']").attr('href')
                                        if(website)
                                        item.website = website ; 
                                  //      console.log("website ",item.website)
                                     
                                        
                                     let facebook = $("#facebook > a[target='_blank'] ").attr('href')
                                     if(facebook)
                                        item.facebook = facebook ; 
                                  //      console.log("facebook ",item.facebook)

                                    let twitter = $("#twitter > a[target='_blank'] ").attr('href')
                                    if(twitter)
                                        item.twitter = twitter ; 
                                  //      console.log("twitter ",item.twitter)

                                    let instagram = $("#instagram > a[target='_blank'] ").attr('href')
                                     if(instagram)
                                        item.instagram = instagram ; 
                                   //     console.log("instagram ",item.instagram)

                                   
                                     //       console.log("mapLink ",item.mapLink)

                             //       sunday     div.details-card-items:nth-child(1) > div:nth-child(1) > div:nth-child(1)
                    //     div.details-card-items:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)
                    //     div.details-card-items:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(2)

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

//*[@class="wm-menu-itemd"]/div/div[1]/div[2]/div[1]/div[1]/div/div

//image 
////*[@class="wm-menu-item"]/div/div[1]/div[1]/div

 ////*[@id="wm-menu-item-moon-rocks-cbd"]/div/div[2]/wm-price-menu[1]                                   let menu = ()=>{

                                        let menu = ()=>{
                                        
                                        $("//*[@class='wm-menu-itemd']/div/div[1]/div[2]/div[1]/div[1]/div/div").each((index,ele)=>{

                                            console.log($(ele).text())
                                        })
                                        


                                    }

                                 //   menu()

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



                                   itemsProps.push(item)
                      
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



                   
                   //   scrapMapLink("deliveries/loaction/"+global.deliveryLocation)

exports.scrapMapLink =  scrapMapLink
     