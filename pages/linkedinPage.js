let fs = require('fs')
var nightwatch = require('nightwatch');
let request = require('request')
let cheerio =require("cheerio")
let firebaseClient = require('../firebaseClient.js')
//let global = require('../global.js')
var xmlserializer = require('xmlserializer')
let userGlobal = require('../userGlobal.js')
var appliedUrl = [],scrapingUrls = [];


let searchQuery = {}
    // let s = ()=>
    // {
    
     
    //    return searchQuery
    
    
    



//console.log(JSON.stringify(global))





let selectors={


    applybtn:"button.jobs-s-apply__button.js-apply-button",
    "divJobsConatiner":"div.jobs-search-results",
    "divEachJob":"div.card-list__item",
    "jobLink":"a.job-card__link-wrapper",
    "logoImage":"img.job-card__logo-image",
    "jobTitle":"div.job-card-search__title-line",
    "companyName":"div.job-card-search__company-location-wrapper .job-card__company-name",
    "companyLocation":"div.job-card-search__company-location-wrapper .job-card__location",
    "companyDesc":".job-card__description-snippet",
    "easyApplyCheck":".job-card__easy-apply-icon"

    }

function linkedinPage(browser)
{
    this.browser= browser;
}

linkedinPage.prototype = {


            userPage1:function(browser)
            {

                              
                   
                   firebaseClient.firebaseGetRecentSearch((global)=>{
                    
                
                this.browser.url("https://www.linkedin.com/");
                this.browser.waitForElementPresent('body',5000);
                this.browser.pause(7000);
                this.browser.waitForElementPresent("#login-email",2000);
                this.browser.waitForElementPresent("#login-password",1000);
                this.browser.setValue("input[id='login-email']",global.linkedinEmail);
                this.browser.setValue("input[id='login-password']",global.linkedinPass);
               
                this.browser.waitForElementPresent("#login-submit",1000);
                this.browser.click("#login-submit",response=>{
                    console.log(" checking credentials ")
                });
               this.browser.maximizeWindow();





                   })// firebaseClient user details 


            },

            page1:function(browser)
            {
            
 
                firebaseClient.firebaseGetRecentSearch((global)=>{

                let resource = function(result)
                {


                           let $ = cheerio.load(result.value)
                              
                            $("a.job-card__link-wrapper").each((index,ele)=>{

                                    console.log(" index  "+index+" link for jobs "+$(ele).attr('href'))
                                    
                            })
                            
                            let rel = firebaseClient.fbinitReturn("linkedin/"+global.searchJobLocation+"/"+global.searchJobTitle+"/relevance/company")
                            let easyLinksUrls = firebaseClient.fbinitReturn("linkedin/"+global.searchJobLocation+"/"+global.searchJobTitle+"/relevance/easyLinks/urls")
                            let easyLinksCompany = firebaseClient.fbinitReturn("linkedin/"+global.searchJobLocation+"/"+global.searchJobTitle+"/relevance/easyLinks/company")


                            $(selectors.divJobsConatiner).find(selectors.divEachJob).each((index,ele)=>{

                                 let item = {}

                               
                               let alink = $(ele).find(selectors.jobLink).attr("href")
                               if(alink)                               
                               item['link'] = "https://www.linkedin.com"+alink  


                               let companyLogo = $(ele).find(selectors.logoImage).attr("src")  
                               if(companyLogo)                             
                               item['companyLogo'] = companyLogo
                             //  console.log("companyLogo ", item['companyLogo'])

                               let companyLink =  $(ele).find(selectors.jobLink).attr('href')
                               if(companyLink)
                               item['companyLink'] = companyLink
                              // console.log("companyLink ", item['companyLink'])


                               let companyTitle = $(ele).find(selectors.jobTitle).text()
                               if(companyTitle)
                               item['companyTitle'] = companyTitle

                            //   console.log("companyTitle ",companyTitle)

                               let companyName = $(ele).find(selectors.companyName).text()
                               //.replace("\n","").replace(/' '/g,"")
                               if(companyName)
                               item['companyName'] = companyName

                             //  console.log("companyName ",companyName)


                                let companyLocation = $(ele).find(selectors.companyLocation).text()
                                //.replace(" ",",")
                               if(companyLocation)
                               item['companyLocation'] = companyLocation

                             //  console.log("companyLocation ",companyLocation)


                                      let companyDes = ''
                                      companyDes += $(ele).find(selectors.companyDesc).text()
                                      //.replace(" ","")
                               if(companyDes)
                               item['companyDes'] = companyDes

                            //   console.log("companyDes ",companyDes)

                               let companyPostDate = $(ele).find(".job-card__time-badge").text()
                               if(companyPostDate)
                               item['companyPostDate'] = companyPostDate

                            //   console.log("companyPostDate ",companyPostDate)

                                let companyEasyApply = $(ele).find(selectors.easyApplyCheck).length
                              
                               

                              if(companyEasyApply > 0)
                              {
                                  item['companyEasyApply'] = companyEasyApply
                                  firebaseClient.addWithRef(easyLinksCompany,item)
                                  firebaseClient.addWithRef(easyLinksUrls,item['link'])
                              }

                               console.log("item ",item)

                                
                                firebaseClient.addWithRef(rel,item)



                            })



                }


                this.browser.url("https://www.linkedin.com/");
                this.browser.waitForElementPresent('body',3000);
                this.browser.pause(7000);
                this.browser.waitForElementPresent("#login-email",2000);
                this.browser.waitForElementPresent("#login-password",1000);
                this.browser.setValue("input[id='login-email']",global.linkedinEmail);
                this.browser.setValue("input[id='login-password']",global.linkedinPass);
               
                this.browser.waitForElementPresent("#login-submit",1000);
                this.browser.click("#login-submit",response=>{
                    console.log(" checking credentials ")
                });
               this.browser.maximizeWindow();


                //      first try 

                // this.browser.waitForElementPresent("div.links:nth-child(3) > ul:nth-child(2) > li:nth-child(2) > a:nth-child(1)",2000);
                // //this.browser.expect.element("div.links links-browse a").containsText("Jobs")
                // this.browser.click("div.links:nth-child(3) > ul:nth-child(2) > li:nth-child(2) > a:nth-child(1)",response=>{
                //     console.log("JOBS IS clicked")
                // });
                // this.browser.waitForElementPresent(".sign-in-link",2000)
                // this.browser.click(".sign-in-link",response=>{
                //     console.log("now sign in")
                // });
                // this.browser.waitForElementPresent("input[type='text']",2000);
                // this.browser.waitForElementPresent("input[type='password']",1000);
                // this.browser.setValue("input[type='text']",global.linkedinEmail);
                // this.browser.setValue("input[type='password']",global.linkedinPass);
               
                // this.browser.waitForElementPresent("#btn-primary",1000);
                // this.browser.click("#btn-primary",response=>{
                //     console.log(" checking credentials ")
                // });
               // this.browser.maximizeWindow();
               this.browser.pause(7000)
              //  this.browser.isVisible("#jobs-nav-item",result=>{
                    //console.log("jobs is visible")
              //  })
                
               this.browser.waitForElementPresent("a[data-link-to='jobs']",1000)
               this.browser.click("a[data-link-to='jobs']",res=>{
                   console.log("logged in !! now searching for jobs ")
               })
                      this.browser.pause(7000)  
                      
                this.browser.waitForElementPresent(".keyword-search-box input",7000)
              //  this.browser.useXpath()      
                this.browser.isVisible(".keyword-search-box input",re=>{
                this.browser.setValue(".keyword-search-box input",[global.searchJobTitle,this.browser.Keys.ENTER])
           //         this.browser.setValue("//input[contains(@placeholder,'city')]",[global.searchJobLocation,this.browser.Keys.ENTER])
            
                   
                                })

                 this.browser.pause(5000)
                 this.browser.useCss()   
                 this.browser.isVisible(".location-search-box  input",result=>{

                     this.browser.setValue(".location-search-box  input",[global.searchJobLocation])
                            })

                 this.browser.pause(5000)
                 this.browser.isVisible(".submit-button",btn=>{

                     this.browser.click(".submit-button",res=>{

                         console.log("search btn was clicked")
                                             })
                             })
                
                this.browser.waitForElementPresent("div.jobs-search-results",7000)
               //  this.browser.waitForElementPresent("a.job-card__link-wrapper",3000)
              //   this.browser.pause(2000)
                 this.browser.maximizeWindow()
                 
                 
                 
                 
                 this.browser.waitForElementPresent("select#sort-dropdown-select.jobs-search-results__select option[value='DD']",7000)
                 this.browser.click("select#sort-dropdown-select.jobs-search-results__select option[value='DD']",function(response){

                    console.log("clicked new date")
               
            
        
                 })

                 this.browser.pause(5000)
                 this.browser.source(result=>{

                     resource(result)
                 })


         let scrollDown = ()=>
           { 
                 let windowHeight = 2000
                 this.browser.windowHandle(result=>{

                     if(result)
                      this.browser.windowSize(result.value,function(size){

//                                    console.log("window size ",size)
                                    windowHeight = size.value.height

                                   // console.log("window spc height ",window.outerHeight())

                              })
                     })

              
                console.log("windowHeight ",windowHeight)
                 this.browser.execute(function(){
                     window.scrollBy(0, 2000)
  //                   console.log("window size 708 * 2, scrollBy")
                     
                 },[])
                  this.browser.pause(1000)
                 this.browser.execute(function(){
                     window.scrollBy(0, 2000)
    //                  console.log("window size 708*2, scrollBy")
                     
                 },[])
                 this.browser.pause(1000)
                 this.browser.execute(function(){
                     window.scrollBy(0, 5000)
      //                console.log("window size 708*2 , scrollBy")
                     
                 },[])

                this.browser.pause(2000)
              
           }
               
              let multiPages = ()=>
                {
                    for(let i=0;i<global.linkedinNoPages;i++)
                    {
                        this.browser.pause(7000)
                        this.browser.waitForElementPresent('body',7000)
                        this.browser.element("css selector","button.next",result=>{

                            if(result.value && result.value.ELEMENT)
                            {
                                                  this.browser.pause(7000)  
                                                  this.browser.waitForElementPresent("button.next",2000)
                                                         
                                                            this.browser.click("button.next",response=>{
                                                                this.browser.pause(4000)

                                                                                        console.log("next page ",response.state)
                                                                                        if(response)
                                                                                        {
                                                                                    
                                                                                                    scrollDown() 
                                                                                                    this.browser.pause(7000)
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
               
                 scrollDown()   
                multiPages()
               
                


                //  this.browser.useXpath()
                // this.browser.isVisible("//*input[contains(@placeholder,'city')]",re=>{

                //     this.browser.useXpath()
                //     this.browser.setValue("//*input[contains(@placeholder,'state')]",global.searchJobLocation)

                // })
                // this.browser.waitForElementPresent("button.submit-button",1000)
                // this.browser.isVisible(".submit-button",res=>{
                //     this.browser.click(".submit-button",result=>{
                //         console.log("searching...",result)
                //     })
                // })                  
               

                // this.browser.waitForElementPresent("#jserp-sort-select option[value='DD']",3000)
                // this.browser.click("#jserp-sort-select option[value='DD']",function(response){

                //     console.log("clicked new date")
                // })
                // this.browser.waitForElementPresent("#location-search-box",3000)
                // this.browser.click("#location-clear-button",function(response){
                //     if(response)
                //     console.log(" location search box cleared ")
                // })
                // this.browser.pause(1000)
                // this.browser.setValue("#location-search-box",[global.searchJobLocation,this.browser.Keys.ENTER])
                // this.browser.source(function(result){

                //             if(result.value)
                //             {
                //                 console.log("data restrived")
                //             }
                //         })


                         
                })                          
            },

            easyLinkPage:function(browser)
            {

                     
                     let fbPath = "linkedin/"+global.searchJobLocation+"/"+global.searchJobTitle+"/relevance/easyLinks" 
                     
                      let applied = firebaseClient.fbinitReturn("dex/applied/urls")
                      firebaseClient.addWithRef(applied,"https://www.linkedin.com/jobs/view/339317065/?refId=5621683291498697960161&trk=d_flagship3_search_srp_jobs")
                       firebaseClient.addWithRef(applied,"https://www.linkedin.com/jobs/view/312429421/?refId=5621683291498697960161&trk=d_flagship3_search_srp_jobs")
                      // firebaseClient.addWithRef(applied,"https://www.linkedin.com/jobs/view/312429421/?refId=5621683291498684456780&trk=d_flagship3_search_srp_jobs"                      
               
             


                    //sign in linkedin
                this.browser.url("https://www.linkedin.com/");
                this.browser.waitForElementPresent('body',3000);
                this.browser.pause(7000);
                this.browser.waitForElementPresent("#login-email",2000);
                this.browser.waitForElementPresent("#login-password",1000);
                this.browser.setValue("input[id='login-email']",global.linkedinEmail);
                this.browser.setValue("input[id='login-password']",global.linkedinPass);
               
                this.browser.waitForElementPresent("#login-submit",1000);
                this.browser.click("#login-submit",response=>{
                    console.log(" checking credentials ")
                });
               this.browser.maximizeWindow();

              
               var array3
              
               firebaseClient.getValue("dex/applied/urls",urlA=>{
                                                for(let j=0;j<urlA.length;j++)
                                                {
                                                // console.log("urls ===> ",urlA[j])
                                                    appliedUrl.push(urlA[j])
                                                }
                                                     console.log("total scraping Links ",appliedUrl.length)
                                                         
                                                        
               firebaseClient.getValue(fbPath+"/urls",urlA=>{
                                        for(let j=0;j<urlA.length;j++)
                                                {
                                                // console.log("urls ===> ",urlA[j])
                                                    scrapingUrls.push(urlA[j])
                                                }
                                                     console.log("total scraping Links ",scrapingUrls.length)
                                           
                                        
                                    
                                
                        array3 = scrapingUrls.filter(function(obj) { return appliedUrl.indexOf(obj) == -1; }) 
                         if(array3.length>0)
                         console.log("array3 ",array3)      
                         
                        
                    
                
                            
                        
              // console.log("appliedUrl length",appliedUrl.length)

               
                                          

               


               //geting values from firebaseClient
                                            
                                                
                                                    // console.log("total apllying linkedin Links ",urlA.length)
                                                    // urls = urlA
                                                                                          
               
                for(let i=0 ;i<array3.length;i++)
                {
                   try{
                        
                   
                            this.browser.url(array3[i]);
                            this.browser.waitForElementPresent('body',3000);
                            this.browser.pause(5000);
                            this.browser.waitForElementPresent("div.jobs-s-apply--top-card button",10000)
                            this.browser.isVisible("div.jobs-s-apply--top-card button",result=>{

                                 this.browser.click("div.jobs-s-apply--top-card button",res=>{


                                            this.browser.elementPresent("div.modal-content-wrapper")
                                            this.browser.elementPresent("input[id='apply-form-phone-input']")
                                            this.browser.pause(2000)
                                            this.browser.isVisible("input[id='apply-form-phone-input']",res=>{

                                                             this.browser.setValue("input[id='apply-form-phone-input']",global.linkedinPhone)       
                                                             this.browser.pause(5000)
                                                             this.browser.waitForElementPresent("button.jobs-apply-form__submit-button",6000)
                                                             this.browser.isVisible("button.jobs-apply-form__submit-button",res=>{

                                                                                    this.browser.click("button.jobs-apply-form__submit-button",response=>{

                                                                                                 console.log("clicked submit button")   
                                                                                                 console.log(response.state)
                                                                                                 this.browser.pause(3000)

                                                                                                 firebaseClient.addWithRef(applied,array3[i])

                                                                                            })
                                                                            })
                                                             })
                                                  })
                                        })


                          } catch (error) {
                        
                    }               
                }//for loop

                })//fb 1
                                                    
                                                
                                            
                })// fb 2
            },//test end

            checkForApplied:function(browser)
            {
                let fbPath = "linkedin/"+global.searchJobLocation+"/"+global.searchJobTitle+"/relevance/easyLinks" 
                let appliedUrl = firebaseClient.fbinitReturn('dex/appliedUrl')
                let toApply = firebaseClient.fbinitReturn('dex/toApplyUrl')     

                this.browser.url("https://www.linkedin.com/");
                this.browser.waitForElementPresent('body',3000);
                this.browser.pause(7000);
                this.browser.waitForElementPresent("#login-email",2000);
                this.browser.waitForElementPresent("#login-password",1000);
                this.browser.setValue("input[id='login-email']",global.linkedinEmail);
                this.browser.setValue("input[id='login-password']",global.linkedinPass);
               
                this.browser.waitForElementPresent("#login-submit",1000);
                this.browser.click("#login-submit",response=>{
                    console.log(" checking credentials ")
                });
               this.browser.maximizeWindow();
            //   this.browser.waitForElementPresent('body',5000);
               let urls  = []
           //    urls.push("https://www.linkedin.com/jobs/view/331275023/?refId=5621683291498970329592&trk=d_flagship3_search_srp_jobs")    
           //    urls.push("https://www.linkedin.com/jobs/view/331260423/?refId=5621683291498970329592&trk=d_flagship3_search_srp_jobs")
           //    urls.push("https://www.linkedin.com/jobs/view/380846368/?recommendedFlavor=SCHOOL_RECRUIT&refId=5621683291498970329592&trk=d_flagship3_search_srp_jobs")
            //  console.log("total scraping Links ",urls)

           
           firebaseClient.getValue(fbPath+"/urls",easyUrls=>{

                easyUrls.forEach((value,index)=>{


                                this.browser.url(value)
                                this.browser.waitForElementPresent('body',3000);
                                this.browser.pause(1000)

                                this.browser.element('css selector','button.jobs-s-apply__button.js-apply-button', function(result){
                                                        if (result.value && result.value.ELEMENT) {
                                                            // Element is present, do the appropriate tests
                                                           console.log("yes ELEMENT is present "+value)
                                                           firebaseClient.addWithRef(toApply,value)

                                                        } else {
                                                            console.log("Element is not present.")
                                                            firebaseClient.addWithRef(appliedUrl,value)
                                                        }
                     });
               
            
        
                    
                 })



           })
               
                
            




                             
            },

            newApplyNow:function(browser)
            {
                let appliedUrl = firebaseClient.fbinitReturn('dex/appliedUrl')
                let toApply = firebaseClient.fbinitReturn('dex/toApplyUrl')     
                let fbPath = "linkedin/"+global.searchJobLocation+"/"+global.searchJobTitle+"/relevance/easyLinks/urls"
                
                let applyEach = (value)=>{


                         console.log(" EASY LINK BUTTON PRESENT")
                                                                                                

                                                                                                                 this.browser.pause(9999)  
                                                                                                                 //this.browser.waitForElementPresent(selectors.applybtn,2000)
                                                                                                                 this.browser.element("css selector",selectors.applybtn,result=>{

                                                                                                                                      if(result.value && result.value.ELEMENT)
                                                                                                                                      {
                                                                                                                                        this.browser.click(selectors.applybtn,res=>{


                                                                                                                                                       //  this.browser.waitForElementPresent("div.modal-content-wrapper",12000)
                                                                                                                                                       //  this.browser.waitForElementPresent("input[id='apply-form-phone-input']",11000)
                                                                                                                                                        console.log("apply btn was clicked")
                                                                                                                                                         this.browser.pause(6444)
                                                                                                                                                         this.browser.isVisible("input[id='apply-form-phone-input']",res=>{

                                                                                                                                                                         //phone
                                                                                                                                                                         this.browser.setValue("input[id='apply-form-phone-input']",global.linkedinPhone)       
                                                                                                                                                                         this.browser.pause(5000)

                                                                                                                                                                         //upload resumePath
                                                                                                                                                                         this.browser.setValue("input[id='file-browse-input']",require('path').resolve(global.resumePath))
                                                                                                                                                                         this.browser.pause(3000)       
                                                                             
 



                                                                                                                                                                         //submit
                                                                                                                                                                         this.browser.pause(3000)
                                                                                                                                                                         this.browser.waitForElementPresent("button.jobs-apply-form__submit-button",2000)
                                                                                                                                                                         this.browser.isVisible("button.jobs-apply-form__submit-button",res=>{

                                                                                                                                                                                 this.browser.click("button.jobs-apply-form__submit-button",response=>{

                                                                                                                                                                                            
                                                                                                                                                                                            this.browser.pause(3000)

                                                                                                                                                                                            firebaseClient.addWithRef(appliedUrl,value)
                                                                                                                                                                                            console.log("JOB APPLIED")   
                                                                                                                                                                                            console.log(response.state)
                                                                                                                                                                                        })//submit BTN
                                                                                                                                                                        })//submit visible
                                                                                                                                                        })//INPUT PHONE visible
                                                                                                                                            })//EASY APPLY BTN click
                                                                                                                                    
                                                                                                                 }else{console.log("selected btn not present")}
                                                                                                                })// EASY APPLY BTN visible
                                                                                                
                                                                                                
                                                                                                




                }//end each apply


                  let scrollDown = ()=>
           { 
                 let windowHeight = 2000
                 this.browser.windowHandle(result=>{

                     if(result)
                      this.browser.windowSize(result.value,function(size){

                                    console.log("window size ",size)
                                    windowHeight = size.value.height

                                   // console.log("window spc height ",window.outerHeight())

                              })
                     })

               this.browser.pause(3000)
                console.log("windowHeight ",windowHeight)
                 this.browser.execute(function(){
                     window.scrollBy(0, 2000)
                     console.log("window size 708 * 2, scrollBy")
                     
                 },[])
                  this.browser.pause(3000)
                 this.browser.execute(function(){
                     window.scrollBy(0, 2000)
                      console.log("window size 708*2, scrollBy")
                     
                 },[])
                 this.browser.pause(3000)
                 this.browser.execute(function(){
                     window.scrollBy(0, 5000)
                      console.log("window size 708*2 , scrollBy")
                     
                 },[])

                this.browser.pause(2000)
              
           }
            
                
                
                
                
                
                
                
                this.browser.url("https://www.linkedin.com/");
                this.browser.waitForElementPresent('body',3000);
                this.browser.pause(7000);
                this.browser.waitForElementPresent("#login-email",2000);
                this.browser.waitForElementPresent("#login-password",1000);
                this.browser.setValue("input[id='login-email']",global.linkedinEmail);
                this.browser.setValue("input[id='login-password']",global.linkedinPass);
               
                this.browser.waitForElementPresent("#login-submit",1000);
                this.browser.click("#login-submit",response=>{
                    console.log(" checking credentials ")
                    this.browser.maximizeWindow();

                    firebaseClient.getValue(fbPath,urls=>{

                            try {

                                        urls.forEach((value,index)=>{

                                                          
                                                        this.browser.url(value)
                                                         this.browser.pause(16000); 
                                                         scrollDown()
                                                        this.browser.waitForElementPresent('body',1000)
                                                        this.browser.element("css selector",'button.jobs-s-apply__button.js-apply-button', function(result){
                                                                                                if (result.value && result.value.ELEMENT)
                                                                                                {
                                                                                                   
                                                                                                   
                                                                                                    applyEach(value)
                                                                                                
                                                                                                
                                                                                                }
                                                                                                else
                                                                                                {
                                                                                                    console.log(" ALREADY APPLIED OR NOT VALID ANY MORE")
                                                                                                }

                                                                                })//IF OF ELEMENT

                                                                    })// END FOR each                                                                       


                                } catch (error) {
                                    console.log("error occured"+error)
                                }




                    })// FB CLIENT





                });//CEREDS SUBMIT END
               
             



            },
            applyNow:function(browser)
            {

                let appliedUrl = firebaseClient.fbinitReturn('dex/appliedUrl')
                let toApply = firebaseClient.fbinitReturn('dex/toApplyUrl')     
                let fbPath = "linkedin/"+global.searchJobLocation+"/"+global.searchJobTitle+"/relevance/easyLinks"
                this.browser.url("https://www.linkedin.com/");
                this.browser.waitForElementPresent('body',3000);
                this.browser.pause(7000);
                this.browser.waitForElementPresent("#login-email",2000);
                this.browser.waitForElementPresent("#login-password",1000);
                this.browser.setValue("input[id='login-email']",global.linkedinEmail);
                this.browser.setValue("input[id='login-password']",global.linkedinPass);
               
                this.browser.waitForElementPresent("#login-submit",1000);
                this.browser.click("#login-submit",response=>{
                    console.log(" checking credentials ")
                });
               this.browser.maximizeWindow();


       //       firebaseClient.getKeys("dex/toApplyUrl")

               firebaseClient.getValue("dex/toApplyUrl",urlA=>{

                                for(let j=0;j<urlA.length;j++)
                                {

                                    
                                    try 
                                    {

                                                        console.log(urlA[j])
                                                                    this.browser.url(urlA[j])   
                                                                    this.browser.pause(2000) 
                                                                    this.browser.waitForElementPresent('body',3000);
                                                                    this.browser.pause(5000);
                                                                   
                                                                    this.browser.element('css selector','button.jobs-s-apply__button.js-apply-button', function(result){
                                                                                                if (result.value && result.value.ELEMENT)
                                                                                                {

                                                                                                
                                                                                                                 this.browser.waitForElementPresent("div.jobs-s-apply--top-card button",2000)
                                                                                                                 this.browser.isVisible("div.jobs-s-apply--top-card button",result=>{

                                                                                                                 this.browser.click("div.jobs-s-apply--top-card button",res=>{


                                                                                                                                        this.browser.waitForElementPresent("div.modal-content-wrapper",12000)
                                                                                                                                        this.browser.waitForElementPresent("input[id='apply-form-phone-input']",11000)
                                                                                                                                        this.browser.pause(2000)
                                                                                                                                        this.browser.isVisible("input[id='apply-form-phone-input']",res=>{

                                                                                                                                                        this.browser.setValue("input[id='apply-form-phone-input']",global.linkedinPhone)       
                                                                                                                                                        this.browser.pause(5000)
                                                                                                                                                        this.browser.waitForElementPresent("button.jobs-apply-form__submit-button",2000)
                                                                                                                                                        this.browser.isVisible("button.jobs-apply-form__submit-button",res=>{

                                                                                                                                                                                this.browser.click("button.jobs-apply-form__submit-button",response=>{

                                                                                                                                                                                            console.log("clicked submit button")   
                                                                                                                                                                                            console.log(response.state)
                                                                                                                                                                                            this.browser.pause(3000)

                                                                                                                                                                                            firebaseClient.addWithRef(appliedUrl,urlA[j])
                                                                                                                                                                                            firebaseClient.getKeys("dex/toApplyUrl",keys=>{
                                                                                                                                                                                                try 
                                                                                                                                                                                                {
                                                                                                                                                                                                    firebaseClient.delWithRef("dex/toApplyUrl",keys[j])
                                                                                                                                                                                                
                                                                                                                                                                                                } catch (error) 
                                                                                                                                                                                                {
                                                                                                                                                                                                    firebaseClient.delWithRef("dex","toApplyUrl")
                                                                                                                                                                                                }
                                                                                                                                                                                                
                                                                                                                                                                                            
                                                                                                                                                                                                
                                                                                                                                                                                            })
                                                                                                                                                                                        })
                                                                                                                                                                        })
                                                                                                                                                        })
                                                                                                                                            })
                                                                                                                                    })                                                                                                                           
                                                                                        
                                                                                                   
                                                                                                
                                                                                            
                                                                                        
                                                                                    
                                                                                
                                                                            
                                                                                                 }
                                                                                                else
                                                                                                {
                                                                                                    console.log("aready applied")
                                                                                                    firebaseClient.addWithRef(appliedUrl,urlA[j])
                                                                                                }


                                                                    })//functional if       
                                                                                                        
                                                                    
                                                                                



                                    
                                    } catch (error) {
                                        
                                    }




                                }




               })

                
            }

        }


       module.exports = linkedinPage 