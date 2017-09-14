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

                        var urls = ["https://weedmaps.com/doctors/online-medical-cards-84"]
                                                
                                         //geting values from firebaseClient
                                            firebaseClient.getValue(fbPath+"/urls",urlA=>{
                                                for(let j=0;j<urlA.length;j++)
                                                {
                                                // console.log("urls ===> ",urlA[j])
                                                    urls.push(urlA[j])
                                                }
                                                     console.log("total scraping Links ",urls.length)
             
                                                                                          })
                                                                                          

                                            //     urls = Array.from(new Set(urls));
                                            //     console.log("uniqueNames --->",urls)
                                                                        
                       
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
                                   
                               
                                 let logoImage = $("img[itemprop='logo']").attr('src')
                                  if(logoImage)
                                        item.logoImage = logoImage ;
                                //    console.log("image ",item.logoImage)


                                  let name = $("h1[itemprop='name']").text()
                                    if(name)
                                        item.name = name ;
                               
                              //    console.log("name ",item.name)
                      
                                   
                                     let docAddress = $("#listing-profile > div > div > div > div.listing-details > h2").text()
                                      if(docAddress)
                                        item.docAddress = docAddress ;
                               
                              //      console.log("docAddress ",item.docAddress)
                      
                                        
                                       item.address = {}

                                       let street = $(".listing-address > span:nth-child(1)").text()
                                       if(street)
                                        item.street = street ;
                               
                               //     console.log("street ",item.address.street)
                      
                                   
                                     let local = $(".listing-address > span:nth-child(2)").text()
                                         if(local)
                                        item.local = local ;
                               
                            
                              //      console.log("docAddress ",item.address.local)
                      
                                     let region = $(".listing-address > span:nth-child(3)").text()
                                     if(region)
                                        item.region = region ;
                             //       console.log("docAddress ",item.address.region)


                                         let zipcode = $(".listing-address > span:nth-child(4)").text()
                                          if(zipcode)
                                        item.zipcode = zipcode ;
                             //       console.log("docAddress ",item.address.zipcode)

                                
                                   let phone = $(".listing-contacts > a:nth-child(1)").text()
                                     if(phone)
                                        item.phone = phone ;
                             //       console.log("phone ",item.phone)

                                    let email = $(".listing-contacts > a:nth-child(2)").text()
                                      if(email)
                                        item.email = email ;
                              //      console.log("email ",item.email)

                                    let detailInfo = $("div.details-body").text()
                                         if(detailInfo)
                                        item.detailInfo = detailInfo ;
                              //      console.log("detailInfo ",item.detailInfo)
                                    
                     
                     
                     
                    //sunday     div.details-card-items:nth-child(1) > div:nth-child(1) > div:nth-child(1)
                    //     div.details-card-items:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)
                    //     div.details-card-items:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(2)

                    //     for(let )

                    //tuesday div.details-card-items:nth-child(1) > div:nth-child(3) > div:nth-child(1)
                    // div.details-card-items:nth-child(1) > div:nth-child(3) > div:nth-child(2) > span:nth-child(1)


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
                                   
                                    item.users = {}
                                    let users = $("p[itemprop='author'] > a[itemprop='url']").each((index,ele)=>{

                                        item.users[index] = {name:$(ele).text() , url: $(ele).attr('href')}
                                    })
                                  //  console.log("users ",item.users)
                                    

                                    item.priceRange = $("meta[itemprop='priceRange']").attr('content')
                                //       console.log("priceRange ",item.priceRange)


                                   item.mapLink = $("a[target='_blank']").attr('href')
                            //       console.log("mapLink ",item.mapLink)
                            
                            
                                    //social

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

               
                                  
                                                        // var check = function(name)
                                                        // {
                                                        //         var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/); //unacceptable chars
                                                        //         if (pattern.test(name)) {
                                                        //             console.log("Please only use standard alphanumerics names "+name);
                                                        //             return name.split(/[\s,-.]/)[0];
                                                        //         }
                                                        //         return name; //good user input
                                                            

                                                        // } 


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


                            //filter Array for duplicates
                                    // let names = ["https://weedmaps.com/doctors/mmjrecs-5#/details","https://weedmaps.com/doctors/online-medical-cards-84","https://weedmaps.com/doctors/mmjrecs-5#/details","https://weedmaps.com/doctors/online-medical-cards-84","https://weedmaps.com/doctors/mmjrecs-5#/alpha"]
                                    // const uniqueNames = Array.from(new Set(names));
                                    // console.log("uniqueNames --->",uniqueNames)
                                


                      scrapMapLink("doctors/loaction/"+global.doctotrLocation)

exports.scrapMapLink =  scrapMapLink
