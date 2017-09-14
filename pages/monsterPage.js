let fs = require('fs')
var nightwatch = require('nightwatch');
let request = require('request')
let cheerio =require("cheerio")
let firebaseClient = require('../firebaseClient.js')
let global = require('../global.js')
var xmlserializer = require('xmlserializer')


let selector = {

    accBtn:"button[aria-label*='Open Menu']:nth-child(3)",
    acBTn2:"#mobile-navbar-search > ul > li.dropdown > a > span.navbar-profile-icon.center-block",
    loginBtn:"#s-menu-d > li:nth-child(1) > a",
    email:"#EmailAddress",
    password:"#Password",
    rememberMe:"#PersistLogin",
    submitBtn:"#btn-login",
    jobSearchTitle:"#keywords2",
    jobSearchLocation:"#location",
    dateFilter:"#jsr > div > div > div > div:nth-child(2) > div.col-sm-4.col-lg-3.hidden-xs.jsr-left-rail > div:nth-child(8) > div:nth-child(4) > div > button:nth-child(2)",
    findJobSearch:"#main-nav-0 > a",
    advSearch:"#sub-nav-0 > a",
    advanceSearch:{

        jobSearchTitle:"#keyword0",
        jobSearchLocation:"#advLocation",
        dateSelect:"#ctl00_ctl00_ctl00_body_body_wacCenterStage_ddlDate",
        anyDate:"#ctl00_ctl00_ctl00_body_body_wacCenterStage_ddlDate option[value='-1']",
        today:"#ctl00_ctl00_ctl00_body_body_wacCenterStage_ddlDate option[value='0']",
        yesterday:"#ctl00_ctl00_ctl00_body_body_wacCenterStage_ddlDate option[value='1']",        
        sevenDays:"#ctl00_ctl00_ctl00_body_body_wacCenterStage_ddlDate option[value='7']",
        thrityDays:"#ctl00_ctl00_ctl00_body_body_wacCenterStage_ddlDate option[value='30']",
        fourteenDays:"#ctl00_ctl00_ctl00_body_body_wacCenterStage_ddlDate option[value='14']",
        submitBtn:"#submitButton",
        fulltime:"#rptJobTypes_checkbox_0[value='Full Time']",
        Contract:"#rptJobTypes_checkbox_1[value='Contract']",
        partTime:"#rptJobTypes_checkbox_2[value='Part Time']",
        internship:"#rptJobTypes_checkbox_3[value='Internship']",
        Temp:"#rptJobTypes_checkbox_4[value='Temp']",
        other:"#rptJobTypes_checkbox_5[value='Other']",
        dateFilter:"div.btn-group button:nth-child(2) "
    },
    result:"section#resultsWrapper",
    resultEach:"div.js_result_container",
    resultDetails:{

        jobTitle:"div.jobTitle",
        link:"div.jobTitle a",
        easyLinks:"div.jobTitle a[href*='http://jobview.monster']",
        companyName:"div.company",
        companyLocation:"div.job-specs.job-specs-location p"

    },
    nextPage:"div.paging > ul >li:last-child a",
    applyBtn:"#PrimaryJobApply",
    coverLetter:"#CoverLetter > div.m-toggle.shrink",
    coverLetterTextArea:"#CoverLetter_CoverLetterBody",
    saveLetter:"#CoverLetter_SaveCoverLetter",
    exsistingLetter:"#CoverLetter_CoverLetterId",
    selectLetter:"#CoverLetter_CoverLetterId > option:last-child",
    submitBtnApplyJob:"#applybtn"
}


function monsterPage(browser)
{
    this.browser = browser
} 

monsterPage.prototype={


    page1:function(browser)
    {

            //filling creds
            let fillcreds = ()=>{

                //email
                this.browser.pause(3000)
                this.browser.waitForElementPresent(selector.email,2000)
                this.browser.setValue(selector.email,global.monsterEmail)
                
                 //password
                this.browser.pause(3000)
                this.browser.waitForElementPresent(selector.password,2000)
                this.browser.setValue(selector.password,global.monsterPassword)
        
                 //check rememberMe
                this.browser.pause(3000)
                this.browser.waitForElementPresent(selector.rememberMe,2000)
                this.browser.click(selector.rememberMe,res=>{console.log(res.state)})

                 //submit form
                this.browser.pause(3000)
                this.browser.waitForElementPresent(selector.submitBtn,2000)
                this.browser.click(selector.submitBtn,res=>console.log(" login form submit ",res.state))
    

          }

          let fillSearchDetails = ()=>{

              this.browser.pause(3000)

              //seach title
                this.browser.pause(3000)
                this.browser.waitForElementPresent(selector.advanceSearch.jobSearchTitle,2000)
                this.browser.setValue(selector.advanceSearch.jobSearchTitle,global.monsterSearchJobTitle)

             //search location
                this.browser.pause(3000)
                this.browser.waitForElementPresent(selector.advanceSearch.jobSearchLocation,2000)
                this.browser.setValue(selector.advanceSearch.jobSearchLocation,global.monsterSearchJobLocation)

                //date select form
                this.browser.pause(3000)
                this.browser.waitForElementPresent(selector.advanceSearch.dateSelect,2000)
                this.browser.click(selector.advanceSearch.dateSelect,res=>{
                console.log(" date select ",res.state)
                        this.browser.click(selector.advanceSearch.thrityDays,res=>console.log("7 days was selected",res.state))
                        //this.browser.click(selector.advanceSearch.anyDate,res=>console.log("any days was selected",res.state))
                        //this.browser.click(selector.advanceSearch.today,res=>console.log("todays was selected",res.state))

                })

                //fulltime
                this.browser.pause(3000)
                this.browser.waitForElementPresent(selector.advanceSearch.fulltime,2000)
                this.browser.click(selector.advanceSearch.fulltime,res=>console.log(" fulltime ",res.state))
    
                //Internship
                this.browser.pause(3000)
                this.browser.waitForElementPresent(selector.advanceSearch.internship,2000)
                this.browser.click(selector.advanceSearch.internship,res=>console.log(" Internship ",res.state))
                
                 //part time
                this.browser.pause(3000)
                this.browser.waitForElementPresent(selector.advanceSearch.partTime,2000)
                this.browser.click(selector.advanceSearch.partTime,res=>console.log(" partTime ",res.state))
    

                //search from submit
                this.browser.pause(3000)
                this.browser.waitForElementPresent(selector.advanceSearch.submitBtn,2000)
                this.browser.click(selector.advanceSearch.submitBtn,res=>console.log(" search form submit ",res.state))
    
                //filter with date
                this.browser.pause(3000)
                this.browser.waitForElementPresent(selector.advanceSearch.dateFilter,2000)
                this.browser.click(selector.advanceSearch.dateFilter,res=>console.log("sort by date filer ",res.state))
    
        
          }

           let scrollDown = ()=>{ 

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
                 this.browser.pause(1000)   
                 this.browser.execute(function(){
                     window.scrollBy(0, 2000)
               //      console.log("window size 708 * 2, scrollBy")
                     
                 },[])
                  this.browser.pause(3000)
                 this.browser.execute(function(){
                     window.scrollBy(0, 2000)
                //      console.log("window size 708*2, scrollBy")
                     
                 },[])
                 this.browser.pause(3000)
                 this.browser.execute(function(){
                     window.scrollBy(0, 5000)
                 //     console.log("window size 708*2 , scrollBy")
                     
                 },[])

                this.browser.pause(2000)
              
           }


          let resource = (result)=>
          {

                            let $ = cheerio.load(result.value)

                            let rel = firebaseClient.fbinitReturn("monster/"+global.monsterSearchJobLocation+"/"+global.monsterSearchJobTitle+"/relevance/company")
                            let easyLinksUrls = firebaseClient.fbinitReturn("monster/"+global.monsterSearchJobLocation+"/"+global.monsterSearchJobTitle+"/relevance/easyLinks/urls")
                            let easyLinksCompany = firebaseClient.fbinitReturn("monster/"+global.monsterSearchJobLocation+"/"+global.monsterSearchJobTitle+"/relevance/easyLinks/company")


                            $(selector.result).find(selector.resultEach).each((index,element)=>{

                                 let item = {}

                                let jobTitle = $(element).find(selector.resultDetails.jobTitle).text()
                                if(jobTitle)
                                item.jobTitle = jobTitle

                                let link = $(element).find(selector.resultDetails.link).attr("href")
                                if(link)
                                item.link = link

                                let companyName = $(element).find(selector.resultDetails.companyName).text()
                                if(companyName)
                                item.companyName = companyName

                                let companyLocation = $(element).find(selector.resultDetails.companyLocation).text()
                                if(companyLocation)
                                item.companyLocation = companyLocation

                                let easyLinks = $(element).find(selector.resultDetails.easyLinks).attr("href")
                                if(easyLinks)
                                item.easyLinks = "https://www.monster.com"+link

                            
                                 if(easyLinks)
                                    {
                                        item['easyLinks'] = easyLinks
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
                    for(let i=0;i<global.monsterNoPages;i++)
                    {
                        this.browser.pause(3000)
                        this.browser.element("css selector",selector.nextPage,result=>{

                            if(result.value && result.value.ELEMENT)
                            {
                                                  this.browser.pause(2000)  
                                                  this.browser.waitForElementPresent(selector.nextPage,2000)
                                                            this.browser.click(selector.nextPage,response=>{


                                                                                        console.log("next page ",response)
                                                                                        if(response)
                                                                                        {           
                                                                                                    this.browser.pause(4000)    
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
                                    console.log("no more pages PRESENT"+i)

                            }
                        })//end of element PRESENT
                      


                    }//end of for loop



                }//end of multiPages





        this.browser.url("https://www.monster.com/")
        this.browser.pause(1000)
        this.browser.maximizeWindow()
        this.browser.element("css selector",selector.acBTn2,res=>{
            if(res.value && res.value.ELEMENT)
                 this.browser.click(selector.acBTn2,res=>{
            console.log(res.state)
            if(res.state)
            this.browser.click(selector.loginBtn,res=>{
                if(res.state)
                fillcreds()
            })
      })

            else
            console.log("button for login not PRESENT")
        })
   
        this.browser.pause(4000)
        this.browser.waitForElementPresent(selector.findJobSearch,2000)
        this.browser.click(selector.findJobSearch,res=>{
            if(res.state)
            this.browser.waitForElementPresent(selector.advSearch,2000)
            this.browser.click(selector.advSearch,res=>console.log("advance sreach clickded",res.state))
            fillSearchDetails()
            })  

            scrollDown()
            multiPages()

    },
    //end of page1 test

     ApplyNow:function(browser)
            {
                let appliedUrl = firebaseClient.fbinitReturn('dex/monster/appliedUrl')
                let fbPath = "monster/"+global.monsterSearchJobLocation+"/"+global.monsterSearchJobTitle+"/relevance/easyLinks/urls"
            
            
                     let scrollDown = ()=>{ 


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
                    
                }// end of scrollDown


                   //filling creds
                    let fillcreds = ()=>{

                        //email
                        this.browser.pause(3000)
                        this.browser.waitForElementPresent(selector.email,2000)
                        this.browser.setValue(selector.email,global.monsterEmail)
                        
                        //password
                        this.browser.pause(3000)
                        this.browser.waitForElementPresent(selector.password,2000)
                        this.browser.setValue(selector.password,global.monsterPassword)
                
                        //check rememberMe
                        this.browser.pause(3000)
                        this.browser.waitForElementPresent(selector.rememberMe,2000)
                        this.browser.click(selector.rememberMe,res=>{console.log(res.state)})

                        //submit form
                        this.browser.pause(3000)
                        this.browser.waitForElementPresent(selector.submitBtn,2000)
                        this.browser.click(selector.submitBtn,res=>console.log(" login form submit ",res.state))
            

                }

                //login first
                let login = ()=>{

                            this.browser.url("https://www.monster.com/")
                                this.browser.pause(1000)
                                this.browser.maximizeWindow()
                                this.browser.waitForElementPresent(selector.acBTn2,2000)
                                this.browser.click(selector.acBTn2,res=>{
                                    console.log(res.state)
                                    if(res.state)
                                    this.browser.click(selector.loginBtn,res=>{
                                        if(res.state)
                                        fillcreds()
                                    })
                            })


                }

                let fillCoverLetter =(value)=>{

                    this.browser.click(selector.coverLetter,res=>{

                        this.browser.click(selector.exsistingLetter,res=>{console.log("coverLetter adding ")})
                        this.browser.pause(4000)
                        this.browser.click(selector.selectLetter,res=>console.log("saving letter ",res.state))
                        this.browser.pause(4000)
                        this.browser.click(selector.submitBtnApplyJob,res=>{
                        console.log(" job is applied "+res.state)
                            firebaseClient.addWithRef(appliedUrl,value)

                           })//job is applied
                    })//end of select coverLetter
                
                }

                let clickAndApply = (value)=>{

                        this.browser.pause(3000)
                        this.browser.waitForElementPresent(selector.applyBtn,4000)
                        this.browser.click(selector.applyBtn,res=>{
                                    if(res.state)
                                    {

                                        this.browser.pause(7000)
                                        scrollDown()
                                        this.browser.element("css selector",selector.coverLetter,res=>{
                                                if(res.value)
                                                {
                                                    fillCoverLetter(value)

                                                }
                                                else
                                                {
                                                    console.log(" cover leter not open")
                                                }
                                        })
                                        console.log(" apply button click "+res.state)

                                    }
                        })



                }


                let gotoEasyLinks = ()=>{

                            //   let urls = []
                            //     urls.push("http://jobview.monster.com/mid-senior-front-end-engineer-ember-js-ruby-on-rails-css3-job-santa-monica-ca-us-185989394.aspx?mescoid=1500127001001&jobPosition=2")
                            //     urls.push("http://jobview.monster.com/c-unity-developer-vr-ar-ai-big-data-startup-in-pasadena!-job-pasadena-ca-us-185990283.aspx?mescoid=1500127001001&jobPosition=2")
                            //     urls.push("http://jobview.monster.com/lead-software-engineer-c-object-oriented-multi-threaded-job-firestone-park-ca-us-185989220.aspx?mescoid=1500127001001&jobPosition=2")


                            firebaseClient.getValue(fbPath,urls=>{

                                try {
                                    

                                        urls.forEach((value,index)=>{

                                                        this.browser.url(value)
                                                        this.browser.maximizeWindow()
                                                        
                                                        //wait afte each url
                                                        this.browser.pause(4000)
                                                    
                                                    //scroling page
                                                        scrollDown()

                                                        this.browser.element("css selector",selector.applyBtn,res=>{

                                                                if(res.value && res.value.ELEMENT)
                                                                {
                                                                    console.log(" applyBtn PRESENT "+index)
                                                                    clickAndApply(value)
                                                                }
                                                                else
                                                                {
                                                                    console.log(" button not PRESENT "+index)
                                                                }

                                                        })//end of apply element PRESENT
                                                

                                        })//end of for each



                                } catch (error) {
                                    console.log(" firebaseClient error "+error)
                                }



                            })//end of firebaseClient getValue


                      


                }//end of gotoEasyLinks 

                
                
                login()
                this.browser.pause(4000)
                gotoEasyLinks()


                



          

            }//end of ApplyNow  




}

module.exports = monsterPage