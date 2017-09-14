
let fs = require('fs')
var nightwatch = require('nightwatch');
let request = require('request')
let cheerio =require("cheerio")
let firebaseClient = require('../firebaseClient.js')
let global = require('../global.js')
let load = require('../loadHtml/load.js')
let DoctorInd  = require('./doctorPage.js')
let DispenInd  = require('./dispen.js')
let DeliveryInd = require('./deliveryPage.js')
let crypto = require('crypto')


function Homepage(browser)
{
    this.browser= browser;
}

Homepage.prototype={

    loadNewDispen : function(browser)
    {
       

                        const hash = crypto.createHmac('sha256', global.password)
                                        .update("web scraper"+global.adminEmail)
                                        .digest('hex');
                    
                                        if(hash === "1970b66e5a1a798e8b70aee65d8f11b4e05b642db74d4f6f6f847035d039b371")
                                        {
                                        
        
       
       
                                            
                                                this.browser.url("https://weedmaps.com/dispensaries/in/california")
                                                this.browser.waitForElementPresent('body',3000)
                                                

                                                       
                                                console.log("dispenLocation ",global.dispenLocation)

                                                this.browser.setValue("input.wm-nav-search-input",[global.dispenLocation,this.browser.Keys.ENTER])
                                                this.browser.pause(2000)
                                                this.browser.waitForElementPresent("a.map-peek-link",7000)
                                                this.browser.waitForElementPresent("div.wm-nav-search-name-result",5000)
                                                this.browser.click("div.wm-nav-search-name-result")
                                                this.browser.pause(7000)
                                                this.browser.source(function(result){

                                                        let deliveryUrl = []
                                                                
                                                        if(result.value)
                                                            {
                                                                let $ = cheerio.load(result.value)
                                                                $("a.map-peek-link").each(function(item){

                                                                            let link = $(this).attr("href")
                                                                            deliveryUrl.push(link)
                                                                                                                        
                                                                                                        })
                                                            }   

                                                            
                                                            if(deliveryUrl)
                                                              {
                                                                //filter Array for duplicates
                                                                const uniqueUrls = Array.from(new Set(deliveryUrl));
                                                                //console.log("uniqueNames --->",uniqueUrls)
                                                                
                                                                firebaseClient.fbinit("dispen/loaction/"+global.dispenLocation+"/urls")
               
                                                                uniqueUrls.forEach(item=>{
                                                            
                                                                        
                                                                            let fullLink = "https://weedmaps.com"+item
                                                                            
                                                                           // console.log("map links ",fullLink)
                                                                        
                                                                            if(fullLink)
                                                                            firebaseClient.add(fullLink)
                                                                            
                                                                    
                                                                    })



                                                                  
                                                              } 
                                                            
                                                                    DispenInd.scrapMapLink("dispen/loaction/"+global.dispenLocation)  
                                                                         })                         

                                                this.browser.end()
                                                

                                            
                                        
                                      }
    
    
    },


    loadDelivery : function(browser)
    {
       

                        const hash = crypto.createHmac('sha256', global.password)
                                        .update("web scraper"+global.adminEmail)
                                        .digest('hex');
                    
                                        if(hash === "1970b66e5a1a798e8b70aee65d8f11b4e05b642db74d4f6f6f847035d039b371")
                                        {
                                        
        
       
       
                                            
                                                this.browser.url("https://weedmaps.com/deliveries/in/california")
                                                this.browser.waitForElementPresent('body',3000)
                                                

                                                       
                                                console.log("doctorLocation ",global.deliveryLocation)

                                                this.browser.setValue("input.wm-nav-search-input",[global.deliveryLocation,this.browser.Keys.ENTER])
                                                this.browser.pause(2000)
                                                this.browser.waitForElementPresent("a.map-peek-link",7000)
                                                this.browser.waitForElementPresent("div.wm-nav-search-name-result",5000)
                                                this.browser.click("div.wm-nav-search-name-result")
                                                this.browser.pause(7000)
                                                this.browser.source(function(result){

                                                        let deliveryUrl = []
                                                                
                                                        if(result.value)
                                                            {
                                                                let $ = cheerio.load(result.value)
                                                                $("a.map-peek-link").each(function(item){

                                                                            let link = $(this).attr("href")
                                                                            deliveryUrl.push(link)
                                                                                                                        
                                                                                                        })
                                                            }   

                                                            
                                                            if(deliveryUrl)
                                                              {
                                                                //filter Array for duplicates
                                                                const uniqueUrls = Array.from(new Set(deliveryUrl));
                                                                //console.log("uniqueNames --->",uniqueUrls)
                                                                
                                                                firebaseClient.fbinit("delivery/loaction/"+global.deliveryLocation+"/urls")
               
                                                                uniqueUrls.forEach(item=>{
                                                            
                                                                        
                                                                            let fullLink = "https://weedmaps.com"+item
                                                                            
                                                                           // console.log("map links ",fullLink)
                                                                        
                                                                            if(fullLink)
                                                                            firebaseClient.add(fullLink)
                                                                            
                                                                    
                                                                    })



                                                                  
                                                              } 
                                                            
                                                                    DeliveryInd.scrapMapLink("delivery/loaction/"+global.deliveryLocation)  
                                                                         })                         

                                                this.browser.end()
                                                

                                            
                                        
                                      }
    
    
    },

    //https://weedmaps.com/doctors/in/california
    loadDoctor : function(browser)
    {
       

                        const hash = crypto.createHmac('sha256', global.password)
                                        .update("web scraper"+global.adminEmail)
                                        .digest('hex');
                    
                                        if(hash === "1970b66e5a1a798e8b70aee65d8f11b4e05b642db74d4f6f6f847035d039b371")
                                        {
                                        
        
       
       
                                            
                                                this.browser.url("https://weedmaps.com/doctors/in/california")
                                                this.browser.waitForElementPresent('body',3000)
                                                

                                                       
                                                console.log("doctorLocation ",global.doctotrLocation)

                                                this.browser.setValue("input.wm-nav-search-input",[global.doctotrLocation,this.browser.Keys.ENTER])
                                                this.browser.pause(2000)
                                                this.browser.waitForElementPresent("a.map-peek-link",7000)
                                                this.browser.waitForElementPresent("div.wm-nav-search-name-result",5000)
                                                this.browser.click("div.wm-nav-search-name-result")
                                                this.browser.pause(7000)
                                                this.browser.source(function(result){

                                                        let doctorUrl = []
                                                                
                                                        if(result.value)
                                                            {
                                                                let $ = cheerio.load(result.value)
                                                                $("a.map-peek-link").each(function(item){

                                                                            let link = $(this).attr("href")
                                                                            doctorUrl.push(link)
                                                                                                                        
                                                                                                        })
                                                            }   

                                                            
                                                            if(doctorUrl)
                                                              {
                                                                //filter Array for duplicates
                                                                const uniqueUrls = Array.from(new Set(doctorUrl));
                                                                //console.log("uniqueNames --->",uniqueUrls)
                                                                
                                                                firebaseClient.fbinit("doctors/loaction/"+global.doctotrLocation+"/urls")
               
                                                                uniqueUrls.forEach(item=>{
                                                            
                                                                        
                                                                            let fullLink = "https://weedmaps.com"+item
                                                                            
                                                                           // console.log("map links ",fullLink)
                                                                        
                                                                            if(fullLink)
                                                                            firebaseClient.add(fullLink)
                                                                            
                                                                    
                                                                    })



                                                                  
                                                              } 
                                                            
                                                                    DoctorInd.scrapMapLink("doctors/loaction/"+global.doctotrLocation)  
                                                                         })                         

                                                this.browser.end()
                                                

                                            
                                        
                                      }
    
    
    },

    loadDispen : function(browser)
    {
         

        this.browser.url("https://weedmaps.com/dispensaries/in/california")
        this.browser.waitForElementPresent('body',3000)
        


        //reading file

        //default value of loaction
        let query = "los angeles"   

      

       
        
        this.browser.setValue("input.wm-nav-search-input",[query,this.browser.Keys.ENTER])
        this.browser.pause(2000)
        this.browser.waitForElementPresent("a.map-peek-link",7000)
        this.browser.waitForElementPresent("div.wm-nav-search-name-result",5000)
        this.browser.click("div.wm-nav-search-name-result")
        this.browser.pause(7000)
        this.browser.source(function(result){

                 let dispenUrl = []
                           
                 if(result.value)
                    {
                        let $ = cheerio.load(result.value)
                        
                        $("a.map-peek-link").each(function(item){

                            let link = $(this).attr("href")
                            dispenUrl.push(link)                            
                                                                })
                    }                                           
//
                if(dispenUrl)
                {

                firebaseClient.fbinit("dispen/loaction/"+query+"/urls")
               
                dispenUrl.forEach(item=>{
          
                    
                        let fullLink = "https://weedmaps.com"+item
                        
                        console.log("map links ",fullLink)
                       
                        if(fullLink)
                        firebaseClient.add(fullLink)
                        
                
                })
                                
                }
                 DispenInd.scrapMapLink("dispen/loaction/"+query)
                         
        })

        this.browser.end()
       

    },

    loadBrandStavia:function(browser)
    {

        this.browser.url("https://weedmaps.com/brands/category/flower/sativa-flower");
        this.browser.url(url=>{console.log("before url",url.value)})
        this.browser.waitForElementPresent('body',3000)     
      
      /// functions
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
                                            firebaseClient.fbinit(fbpath+"/urls")
                                            uris.forEach((item,index)=>{
                                                
                                                urls[index] = item
                                            })
                                            firebaseClient.add(urls)
                                            console.log("adding items")

                                }
                                        
                                    
      
        this.browser.waitForElementPresent('wm-brand-card',4000)
        this.browser.source(function(result){
        if(result)
        {
            
                //geting urls
                console.log('reading data file')
     
                let $ = cheerio.load(result.value);
                check($,global.brandLoactionSativa+"/page1")
    

        }
        
             })
        

        
        this.browser.waitForElementPresent('a.next-button',3000)
        this.browser.click("a.next-button",function(response){
           
        //   this.browser.waitForElementPresent('body',2000) 
            console.log("clciked")
           
      })



        this.browser.waitForElementPresent('.wm-brand-card',4000)
        this.browser.url(url=>console.log("second url",url.value))
        this.browser.waitForElementPresent('body',3000)
         this.browser.waitForElementPresent('wm-brand-card',2000)
                  
        this.browser.source(function (result){
        // Source will be stored in result.value
        
            if(result)
            {
                   console.log('reading data file')
     
                let $ = cheerio.load(result.value);
                check($,global.brandLoactionSativa+"/page2")
    
             }

           
        })




       // repeat for next(third) page 
        this.browser.waitForElementPresent('a.next-button',3000)
        this.browser.click("a.next-button",function(response){
           
        //   this.browser.waitForElementPresent('body',2000) 
            console.log("clciked")
           
      })
       this.browser.waitForElementPresent('.wm-brand-card',4000)
       this.browser.url(url=>console.log("thrid url",url))  
         this.browser.waitForElementPresent('body',3000)
         this.browser.waitForElementPresent('wm-brand-card',2000)
                           
           this.browser.source(function (result){
        // Source will be stored in result.value
       if(result)
               {
                   let $ = cheerio.load(result.value);
                    check($,global.brandLoactionSativa+"/page3")
    
               }
              
            })


//repeat for next page        
        this.browser.waitForElementPresent('a.next-button',3000)
        this.browser.click("a.next-button",function(response){
           
        //   this.browser.waitForElementPresent('body',2000) 
            console.log("clciked")
           
      })
       this.browser.waitForElementPresent('.wm-brand-card',4000)
       this.browser.url(url=>console.log("thrid url",url))
           
           this.browser.source(function (result){
        // Source will be stored in result.value
       if(result)
               {
                   let $ = cheerio.load(result.value);
                    check($,global.brandLoactionSativa+"/page4")
    
               }

              
                })

    


        this.browser.end;
      
       
       
    },
    loadBrandHybrid:function(browser)
    {

        this.browser.url("https://weedmaps.com/brands/category/flower/hybrid-flower");
        this.browser.url(url=>{console.log("before url",url.value)})
        this.browser.waitForElementPresent('body',3000)     
      
      /// functions
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
                                            firebaseClient.fbinit(fbpath+"/urls")
                                            uris.forEach((item,index)=>{
                                                
                                                urls[index] = item
                                            })
                                            firebaseClient.add(urls)
                                            console.log("adding items")

                                }
                                        
                                    
      
        this.browser.waitForElementPresent('wm-brand-card',4000)
        this.browser.source(function(result){
        if(result)
        {
            
                //geting urls
                console.log('reading data file')
     
                let $ = cheerio.load(result.value);
                check($,global.brandLoactionHybrid+"/page1")
    

        }
        
             })
        

        
        this.browser.waitForElementPresent('a.next-button',3000)
        this.browser.click("a.next-button",function(response){
           
        //   this.browser.waitForElementPresent('body',2000) 
            console.log("clciked")
           
      })



        this.browser.waitForElementPresent('.wm-brand-card',4000)
        this.browser.url(url=>console.log("second url",url.value))
        this.browser.waitForElementPresent('body',3000)
         this.browser.waitForElementPresent('wm-brand-card',2000)
                  
        this.browser.source(function (result){
        // Source will be stored in result.value
        
            if(result)
            {
                   console.log('reading data file')
     
                let $ = cheerio.load(result.value);
                check($,global.brandLoactionHybrid+"/page2")
    
             }

           
        })




       // repeat for next(third) page 
        this.browser.waitForElementPresent('a.next-button',3000)
        this.browser.click("a.next-button",function(response){
           
        //   this.browser.waitForElementPresent('body',2000) 
            console.log("clciked")
           
      })
       this.browser.waitForElementPresent('.wm-brand-card',4000)
       this.browser.url(url=>console.log("thrid url",url))  
         this.browser.waitForElementPresent('body',3000)
         this.browser.waitForElementPresent('wm-brand-card',2000)
                           
           this.browser.source(function (result){
        // Source will be stored in result.value
       if(result)
               {
                   let $ = cheerio.load(result.value);
                    check($,global.brandLoactionHybrid+"/page3")
    
               }
              
            })


//repeat for next page        
        this.browser.waitForElementPresent('a.next-button',3000)
        this.browser.click("a.next-button",function(response){
           
        //   this.browser.waitForElementPresent('body',2000) 
            console.log("clciked")
           
      })
       this.browser.waitForElementPresent('.wm-brand-card',4000)
       this.browser.url(url=>console.log("thrid url",url))
           
           this.browser.source(function (result){
        // Source will be stored in result.value
       if(result)
               {
                   let $ = cheerio.load(result.value);
                    check($,global.brandLoactionHybrid+"/page4")
    
               }

              
                })

    


        this.browser.end;
      
       
       
    },

    loadBrandSeed: function(browser)
    {

        this.browser.url("https://weedmaps.com/brands/category/flower/seeds-clones");
        this.browser.url(url=>{console.log("before url",url.value)})
        this.browser.waitForElementPresent('body',3000)     
      
      /// functions
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
                                            firebaseClient.fbinit(fbpath+"/urls")
                                            uris.forEach((item,index)=>{
                                                
                                                urls[index] = item
                                            })
                                            firebaseClient.add(urls)
                                            console.log("adding items")

                                }
                                        
                                    
      
        this.browser.waitForElementPresent('wm-brand-card',4000)
        this.browser.source(function(result){
        if(result)
        {
            
                //geting urls
                console.log('reading data file')
     
                let $ = cheerio.load(result.value);
                check($,global.brandLoactionSeed+"/page1")
    

        }
        
             })
        

       

        this.browser.end;
      
       
       
    },

    loadBrandIndica:function(browser)
    {

        this.browser.url("https://weedmaps.com/brands/category/flower/indica-flower");
        this.browser.url(url=>{console.log("before url",url.value)})
        this.browser.waitForElementPresent('body',3000)     
      
      /// functions
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
                                            firebaseClient.fbinit(fbpath+"/urls")
                                            uris.forEach((item,index)=>{
                                                
                                                urls[index] = item
                                            })
                                            firebaseClient.add(urls)
                                            console.log("adding items")

                                }
                                        
                                    
      
        this.browser.waitForElementPresent('wm-brand-card',4000)
        this.browser.source(function(result){
        if(result)
        {
            
                //geting urls
                console.log('reading data file')
     
                let $ = cheerio.load(result.value);
                check($,global.brandLoactionInf+"/page1")
    

        }
        
             })
        

        
        this.browser.waitForElementPresent('a.next-button',3000)
        this.browser.click("a.next-button",function(response){
           
        //   this.browser.waitForElementPresent('body',2000) 
            console.log("clciked")
           
      })



        this.browser.waitForElementPresent('.wm-brand-card',4000)
        this.browser.url(url=>console.log("second url",url.value))
        this.browser.waitForElementPresent('body',3000)
         this.browser.waitForElementPresent('wm-brand-card',2000)
                  
        this.browser.source(function (result){
        // Source will be stored in result.value
        
            if(result)
            {
                   console.log('reading data file')
     
                let $ = cheerio.load(result.value);
                check($,global.brandLoactionInf+"/page2")
    
             }

           
        })




       // repeat for next(third) page 
        this.browser.waitForElementPresent('a.next-button',3000)
        this.browser.click("a.next-button",function(response){
           
        //   this.browser.waitForElementPresent('body',2000) 
            console.log("clciked")
           
      })
       this.browser.waitForElementPresent('.wm-brand-card',4000)
       this.browser.url(url=>console.log("thrid url",url))  
         this.browser.waitForElementPresent('body',3000)
         this.browser.waitForElementPresent('wm-brand-card',2000)
                           
           this.browser.source(function (result){
        // Source will be stored in result.value
       if(result)
               {
                   let $ = cheerio.load(result.value);
                    check($,global.brandLoactionInf+"/page3")
    
               }
              
            })


//repeat for next page        
        this.browser.waitForElementPresent('a.next-button',3000)
        this.browser.click("a.next-button",function(response){
           
        //   this.browser.waitForElementPresent('body',2000) 
            console.log("clciked")
           
      })
       this.browser.waitForElementPresent('.wm-brand-card',4000)
       this.browser.url(url=>console.log("thrid url",url))
           
           this.browser.source(function (result){
        // Source will be stored in result.value
       if(result)
               {
                   let $ = cheerio.load(result.value);
                    check($,global.brandLoactionInf+"/page4")
    
               }

              
                })

    


        this.browser.end;
      
       
       
    },
    

    loadGoogle:function(browser)
    {

        this.browser.url("https://weedmaps.com/brands/category/flower/indica-flower");
        this.browser.maximizeWindow()
      
        this.browser.pause(1000)
        this.browser.waitForElementPresent("a[class='large-page-button next-button']",2000)
       // this.browser.url(url=>{console.log("before url",url)})
        this.browser.click("a[class='large-page-button next-button']",function(response){
           
            
            console.log("response",response.body)
        })
      
        // this.browser.elements("xpath","//div[@class='card-content']//a",res=>{
        //     console.log(res.value.length)
        //     res.value.forEach(function(val,index){

        //         console.log(val[index].href)
        //     })

        // })


    
            this.browser.useXpath()
            .waitForElementPresent("//div[@class='card-content'][1]",2000)
          this.browser
          .useXpath()
          .elements("xpath","//div[@class='card-content'] //a",function(hr){
              console.log(hr)

              hr.value.forEach((iter1)=>{

                  //let id = this.browser.elementIdAttribute(iter1.ELEMENT,'href').value

                  this.browser.elementIdText(29, function(err,res) {
    console.log(res.value);
});
              })
                     
          })
          var styleSheetsElems = this.browser.useXpath().elements("xpath","//div[@class='card-content']//a").value; 
        
        console.log(styleSheetsElems)
        for (let iter1 in styleSheetsElems)
            { 
                console.log(iter1)
                console.log( this.browser.elementIdAttribute(styleSheetsElems[iter1].ELEMENT, 'href').value );
            }

          this.browser.getText("//div[@class='card-content']//a",function(res){
              console.log(res)
          })
         
          
    


        
    
      //  this.browser.click('#logo');
        this.browser.end;
        
    }
    


}


module.exports=Homepage;