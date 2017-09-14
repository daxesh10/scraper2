let fs = require('fs')
var nightwatch = require('nightwatch');
let request = require('request')
let cheerio =require("cheerio")
let firebaseClient = require('../firebaseClient.js')
let global = require('../global.js')
var Nightmare = require('nightmare')
var nightmare = Nightmare()
var iframe = require('nightmare-iframe')


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





function indeedPage (browser)
{
    this.browser = browser
}

indeedPage.prototype={


    loginIndeed : function(browser)
    {


            let enterCreds = ()=>
            {

                                    this.browser.element("css selector","#signin_email",result=>{
                                        if(result.value && result.value.ELEMENT)
                                        this.browser.setValue("#signin_email",global.linkedinEmail)
                                    })
                                    this.browser.element("css selector","#signin_password",result=>{
                                        if(result.value && result.value.ELEMENT)
                                        this.browser.setValue("#signin_password",global.linkedinPass)
                                    })
                                    this.browser.element("css selector","button[type='submit']",result=>{
                                        if(result.value && result.value.ELEMENT)
                                        this.browser.click("button[type='submit']")
                                    })

                                    this.browser.pause(2000)
                                    console.log("valid creds")

            }

                    this.browser.url("https://www.indeed.com/")
                    this.browser.pause(3000)
                    this.browser.waitForElementPresent('body',2000)
                    this.browser.element("css selector",".navBi #userOptionsLabel",result=>{

                                if(result.value && result.value.ELEMENT)
                                {
                                    this.browser.click(".navBi #userOptionsLabel")
                                    enterCreds()
                                
                                }
                                else
                                {
                                    console.log("no sigin presesnt")
                                }



                    })

    },

    searchType1: function(browser)
    {

            let SearchFilter = 
            {

                dateFilter : ()=>
                {

                         //date filter
                        this.browser.element("css selector","div span.no-wrap a",result=>{

                              console.log("date filter")

                                if(result.value && result.value.ELEMENT)
                                this.browser.click("div span.no-wrap a")

                                else
                                console.log("date not presesnt")
                                
                        })
                
                },

                closePopUp: ()=>
                {
                       

                         this.browser.element("css selector","#prime-popover-close-button",result=>{

                              console.log("pop up filter")

                                if(result.value && result.value.ELEMENT)
                                this.browser.click("#prime-popover-close-button")

                                else
                                console.log("pop up not presesnt")
                                
                        })

                },
                //div#EXP_LVL_rbo ul li a[href*='entry']

                entryLevel:()=>
                {

                          this.browser.element("css selector","div#EXP_LVL_rbo ul li a[href*='entry']",result=>{

                              console.log("ENTRY LEVEL filter")

                                if(result.value && result.value.ELEMENT)
                                this.browser.click("div#EXP_LVL_rbo ul li a[href*='entry']")

                                else
                                console.log("entry LEVEL LINK not presesnt")
                                
                        })

                },

                midLevel:()=>
                {
                         
                               this.browser.element("css selector","div#EXP_LVL_rbo ul li a[href*='mid']",result=>{

                              console.log("mid LEVEL filter")

                                if(result.value && result.value.ELEMENT)
                                this.browser.click("div#EXP_LVL_rbo ul li a[href*='mid']")

                                else
                                console.log("mid LEVEL LINK not presesnt")
                                
                        })
                },
                
                seniorLevel:()=>
                {

                           this.browser.element("css selector","div#EXP_LVL_rbo ul li a[href*='senior']",result=>{

                              console.log("ENTRY LEVEL filter")

                                if(result.value && result.value.ELEMENT)
                                this.browser.click("div#EXP_LVL_rbo ul li a[href*='senior']")

                                else
                                console.log("entry LEVEL LINK not presesnt")
                                
                        })



                }


            }



         let scrollDown = ()=>
           { 
                 let windowHeight = 2000
                 this.browser.windowHandle(result=>{

                     if(result)
                      this.browser.windowSize(result.value,function(size){

                            //        console.log("window size ",size)
                                    windowHeight = size.value.height

                                   // console.log("window spc height ",window.outerHeight())

                              })
                     })

              
              //  console.log("windowHeight ",windowHeight)
                 this.browser.execute(function(){
                     window.scrollBy(0, 2000)
               //      console.log("window size 708 * 2, scrollBy")
                     
                 },[])
                  this.browser.pause(1000)
                 this.browser.execute(function(){
                     window.scrollBy(0, 2000)
                //      console.log("window size 708*2, scrollBy")
                     
                 },[])
                 this.browser.pause(1000)
                 this.browser.execute(function(){
                     window.scrollBy(0, 5000)
                 //     console.log("window size 708*2 , scrollBy")
                     
                 },[])

                this.browser.pause(2000)
              
           }




            let resource = function(result)
            {

                let $ = cheerio.load(result.value)

                            let rel = firebaseClient.fbinitReturn("indeed/"+global.indeedSearchJobLocation+"/"+global.indeedSearchJobTitle+"/relevance/company")
                            let easyLinksUrls = firebaseClient.fbinitReturn("indeed/"+global.indeedSearchJobLocation+"/"+global.indeedSearchJobTitle+"/relevance/easyLinks/urls")
                            let easyLinksCompany = firebaseClient.fbinitReturn("indeed/"+global.indeedSearchJobLocation+"/"+global.indeedSearchJobTitle+"/relevance/easyLinks/company")



                $("div[class*='row']").each((index,element)=>{

                    let item = {}

                    let jobTitle = $(element).find("h2.jobtitle").text()
                    if(jobTitle)
                    item.jobTitle = jobTitle

                    let link = $(element).find("a[data-tn-element*='jobTitle']").attr("href")
                    if(link)
                    item.link = "https://www.indeed.com"+link

                    let companyName = $(element).find("span.company").text()
                    if(companyName)
                    item.companyName = companyName

                    let companyLink = $(element).find("span.company a").attr("href")
                    if(companyLink)
                    item.companyLink = companyLink

                    let companyLocation = $(element).find("span[itemprop*='addressLoc']").text()
                    if(companyLocation)
                    item.companyLocation = companyLocation
                     
                    // let companyLocation2 = $(element).find("span[class*='loc']").text()
                    // if(companyLocation2)
                    // item.companyLocation2 = companyLocation2

                    let companyDes = $(element).find("span[itemprop*='descrip']").text()
                    if(companyDes)
                    item.companyDes = companyDes


                    let companyEasyApply = $(element).find("div[class*='iaP']").text()
                  


                    
                   // console.log("index: ",index+" val "+JSON.stringify(item))

                             if(companyEasyApply)
                              {
                                  item['companyEasyApply'] = companyEasyApply
                                  firebaseClient.addWithRef(easyLinksCompany,item)
                                  firebaseClient.addWithRef(easyLinksUrls,item['link'])
                              }

                               // console.log("item ",index)

                                if(item)
                                firebaseClient.addWithRef(rel,item)


                })




            }


            
             let multiPages = ()=>
                {
                    for(let i=0;i<global.indeedNoPages;i++)
                    {
                        this.browser.pause(1000)
                        this.browser.waitForElementPresent('body',2000)
                        this.browser.element("css selector","div.pagination a:last-child",result=>{

                            if(result.value && result.value.ELEMENT)
                            {

                                                  this.browser.waitForElementPresent("div.pagination a:last-child",2000)
                                                            this.browser.click("div.pagination a:last-child",response=>{


                                                                                        console.log("next page ",response)
                                                                                        if(response)
                                                                                        {
                                                                                                    scrollDown() 
                                                                                                    this.browser.source(function(result){
                                                                                                            
                                                                                                                if(result.value)
                                                                                                                {
                                                                                                                    console.log("fetching resource for page no."+i)
                                                                                                                    resource(result)
                                                                                                                        
                                                                                                                }      
                                                                                                        })

                                                                                        }
                                                                                    })

                            }
                            else
                            {
                                    console.log("no more pages PRESENT")

                            }
                        })
                      


                    }



                }



            this.browser.pause(2000)
            this.browser.element("css selector","#what",result=>{

                    if(result.value && result.value.ELEMENT)
                    this.browser.setValue("#what",global.indeedSearchJobTitle)

            })
            this.browser.element("css selector","#where",result=>{
                    
                    if(result.value && result.value.ELEMENT)
                    this.browser.setValue("#where",[this.browser.Keys.CONTROL, "a"])
                    this.browser.setValue("#where",global.indeedSearchJobLocation)
                    
            })
            this.browser.element("css selector","input[type='submit']",result=>{
                    
                    if(result.value && result.value.ELEMENT)
                    this.browser.click("input[type='submit']")
                    
            })
            this.browser.pause(2000)
            
            //filters
            SearchFilter.closePopUp()
            SearchFilter.dateFilter()
            SearchFilter.entryLevel()

            this.browser.maximizeWindow();
            scrollDown()
            multiPages()
            // this.browser.source(function(result){

            //         if(result.value)
            //         {
            //         console.log("fetching resource for page no.")
            //         resource(result)
            //         }
                                                                                                                        
            // })



    },

    ApplyNow:function(browser)
            {
                let appliedUrl = firebaseClient.fbinitReturn('dex/indeed/appliedUrl')
              //  let toApply = firebaseClient.fbinitReturn('dex/toApplyUrl')     
                let fbPath = "indeed/"+global.indeedSearchJobLocation+"/"+global.indeedSearchJobTitle+"/relevance/easyLinks/urls"
                
                let scrollDown = ()=>
           { 
                 let windowHeight = 2000
                 this.browser.windowHandle(result=>{

                     if(result)
                      this.browser.windowSize(result.value,function(size){

                            //        console.log("window size ",size)
                                    windowHeight = size.value.height

                                   // console.log("window spc height ",window.outerHeight())

                              })
                     })

              
              //  console.log("windowHeight ",windowHeight)
                 this.browser.execute(function(){
                     window.scrollBy(0, 2000)
               //      console.log("window size 708 * 2, scrollBy")
                     
                 },[])
                  this.browser.pause(1000)
                 this.browser.execute(function(){
                     window.scrollBy(0, 2000)
                //      console.log("window size 708*2, scrollBy")
                     
                 },[])
                 this.browser.pause(1000)
                 this.browser.execute(function(){
                     window.scrollBy(0, 5000)
                 //     console.log("window size 708*2 , scrollBy")
                     
                 },[])

                this.browser.pause(2000)
              
           }
                
                 let fillForm = 
                        {
                            coverLetter:()=>{
                                            this.browser.pause(1000)
                                           // this.browser.waitForElementPresent("#applicant.applicationMessage",3000)
                                            this.browser.element("css selector","div textarea",result=>{

                                                    if(result.value && result.value.ELEMENT)
                                                    {
                                                        console.log("setting cover letter")
                                                        this.browser.setValue("div textarea",[this.browser.Keys.CONTROL, "v"])
                                                        this.browser.pause(1000)
                                                    }
                                                    else{
                                                        console.log("cover letter not PRESENT")
                                                    }

                                            })
                            },

                            clickContinue:()=>{

                                                this.browser.element("css selector","a.button_content.form-page-next",result=>{

                                                    if(result.value && result.value.ELEMENT)
                                                    {
                                                            this.browser.click("a.button_content.form-page-next",res=>{
                                                                            console.log("clicked continue")
                                                            })

                                                            
                                                            this.browser.pause(2000)
                                                    }else{
                                                        console.log("continue btn not PRESENT")
                                                    }
                                             })
                            },

                            loadAndRun:(result)=>
                            {
                                 let $ = cheerio.load(result.value)
                            
                                 $("a.button_content.form-page-next").each((index,element)=>{

                                     console.log(index)
                                 })
                            }


                        }//fill form

                
                
                
                
                             
                
                
                
                let applyEach = (value,result)=>{


                                    this.browser.pause(3000)               
                                    fillForm.coverLetter()
                                
                                
                                    this.browser.pause(3000)
                                    fillForm.clickContinue()

                                    this.browser.pause(1000)
                                    fillForm.loadAndRun(result)
                        
                         

                                        }//each applyEach

                let urls = []
                urls.push("https://www.indeed.com/pagead/clk?mo=r&ad=-6NYlbfkN0CX0KbZ_zVILHcZDc9iy9izLrOTAJvjt8yw58HQ1lXH1TC2UYBrlSsis_4yQyWfRhCxVuRIWZLe0F51R5F_w39v2UqetuKWfQ9i1ECbvroYHpIyeHKhkD96Z0kDQdBhUWjdWrfJw9vovBdMd_g_MloNJm13phsFOA0dm9BofeEF190cf-AmXaQKal_CmyKh5gDbr0Y_Jr-8BxLacE2PCj8z_gSGYaupCa1pWvH5t6UUe7UbyuxokovJ28ArXBJT68n0VdHqVsJPZNnY4PlhtjqKxM8eKWWd4Cv3PAez33yPUeiC2dLdjpyLveY0kXLC3EftysF9GvVpsNhUEHJxZdRAAYu1Pp6cE9cq_U3ZCyE8j1Fj6C-gY2rAvmVxjz2xaKrIHZvhca3hRS8kZoO-7G8EMFVhobT8ff-EyFC8FvFhrjjPSjMBqMK07pZU9mQYZBoikHexukx4wYVjBm-nsOKh4mgr2N2hDczEgvc4bOaUOw==&p=1&sk=&fvj=0")
          
            //    urls.push("https://www.indeed.com/rc/clk?jk=2939bdddb2829a7b&fccid=3a7a8934559b0c46")
            //    urls.push("https://www.indeed.com/pagead/clk?mo=r&ad=-6NYlbfkN0A16okWtYWD88-_BalVW0-XRCtPgZ2dWOpJEqJkdSfs6B8lKtqijgz0280NkmxNTNIynH9DKOjOAGQh482VqabO0-yHpOK6zBZZ-QFIJQl29KATb9tNBJvV_dO9YpLBX6RtlnwQPaEXmYVQuHlnA8-JWcDaE4B75P8Y9j8kJXpD8wqezi4Qc37r75VQHCDH_7BmZxswMHcaVEdybabQUMzwKG-EwL2chm9WVHJtYp5RGxGmXofB-KqY4-lsclC7frYV_RsBxF0H8Len1KEHNG2SS_LMNQAVQ_j103IyY5gpVPvvkBS7WWHGy9aRVBtoBFXeIQfJa3XedcSQJ63skY_umTIKyrfVlTHK_rso_1hA5usfmaJoewyJmq0HJMvDXhCMC6FCK_YMmwspaQNa9HaCqH6prFTIHFZ3gjwQMasz4_exURLMFG8C&p=4&sk=&fvj=1")
             


                this.browser.maximizeWindow()
                 firebaseClient.getValue(fbPath,urls=>{

                            try {

                                        urls.forEach((value,index)=>{

                                                        this.browser.url(value)
                                                        this.browser.pause(3000)
                                                        this.browser.waitForElementPresent('body',1000)
                                                        scrollDown()    
                                                        this.browser.element("css selector","a.indeed-apply-button",result=>{

                                                                    if(result.value && result.value.ELEMENT)
                                                                    {
                                                                        
                                                                            this.browser.pause(3000)

                                                                            this.browser.click("a.indeed-apply-button",res=>{
                                                                                            
                                                                                                console.log(" EASY LINK BUTTON PRESENT"+res.state)
                                                                                                // this.browser.source(function(resource)
                                                                                                // {
                                                                                                //     applyEach(value,resource)
                                                                                                // })
                                                                                       
                                                                                       this.browser.pause(1000)
                                                                                       scrollDown()
                                                                                       console.log("waiting...")
                                                                                        this.browser.pause(19000)
                                                                                     //  this.browser.waitForElementPresent("iframe#indeedapply-modal-preload-iframe",2000)
                                                                                     //  this.browser.element("css selector","iframe#indeedapply-modal-preload-iframe iframe",result=>{
                                                                                     //      this.browser.frame({ELEMENT:result.value.ELEMENT},res=>{
                                                                                                        // this.browser.source(sour=>{

                                                                                                        //     fs.createWriteStream("./scrapHtml/indeedForm.txt","utf8").write(JSON.stringify(sour))
                                                                                                        // })
                                                                                       //                  this.browser.waitForElementPresent("body",1000)
                                                                                       //                 this.browser.waitForElementPresent("form",3000)
                                                                                       //                 this.browser.pause(15000)
                                                                                                    //    this.browser.element("css selector","#applicant\2e applicationMessage",res=>{
                                                                                                    //        if(res.value && res.value.ELEMENT)
                                                                                                    //        console.log(res.value)

                                                                                                    //        else
                                                                                                    //        console.log("error ",res.value)
                                                                                                    //    })
                                                                                                        // this.browser.execute(function(data){
                                                                                                        //     return document.querySelector('iframe#indeedapply-modal-preload-iframe').contents().find("div.cover_letter div.input textarea").text('hello i am dex')
                                                                                                        //         },
                                                                                                        //     [],
                                                                                                        //     function(res){
                                                                                                        //     console.log(res.value)
                                                                                                        //     fs.createWriteStream("./scrapHtml/indeedForm.txt","utf8").write(JSON.stringify(res.value))
                                                                                                        // })                                                           

                                                                                                         //   let content = document.getElementById('iframe#indeedapply-modal-preload-iframe iframe').body.innerHTML
                                                                                                          //  console.log("content",content)
                                                                                                    
                                                                                                        
                                                                                                                                                                                                                
                                                                                                      
                                                                                       //    })
                                                                                     //  })
                                                                                                   

                                                                                       
                                                                                       
                                                                                       
                                                                                       //this.browser.waitForElementPresent("#page_frame",2000)
                                                                                       //this.browser.setValue("form[id='apply_form'] textarea[name*='applicant']",[this.browser.Keys.CONTROL, "v"])     
                                                                                                    
                                                                                })
                                                                       
                                                                    }
                                                                    else{
                                                                        console.log("easy apply button not presesnt")
                                                                        this.browser.pause(2000)
                                                                        this.browser.click("button:last-child",res=>{
                                                                            this.browser.pause(2000)
                                                                        })
                                                                        
                                                                    }
                                                        })

                                        })


                                } catch (error)
                                 {
                                    console.log("error",error)
                                 }


                 })//fb url

            }      




}


module.exports = indeedPage