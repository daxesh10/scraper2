let fs = require('fs')
var nightwatch = require('nightwatch');
let request = require('request')
let cheerio =require("cheerio")
let firebaseClient = require('../firebaseClient.js')
let global = require('../global.js')
var xmlserializer = require('xmlserializer')
var appliedUrl = [],scrapingUrls = [];

let selectors =  
{

expLevel : "form.search-s-facet-form button[aria-controls='experience-level-facet-values'] span:nth-child(2)",
datePosted : "select#sort-dropdown-select.jobs-search-results__select option[value='DD']",
entryLevelCbox:"form.search-s-facet-form fieldset ol#experience-level-facet-values li:nth-child(1) input"


}
function linkedinPage(browser)
{
    this.browser= browser;
}

linkedinPage.prototype = {


            page1:function(browser)
            {


                    let login=()=>{


                                  this.browser.url("https://www.linkedin.com/");
                                    this.browser.waitForElementPresent('body',3000);
                                    this.browser.pause(7000);
                                    this.browser.waitForElementPresent("#login-email",2000);
                                    this.browser.waitForElementPresent("#login-password",1000);
                                    
                                    this.browser.pause(2000)
                                    this.browser.setValue("input[id='login-email']",global.linkedinEmail);
                                    
                                    this.browser.pause(2000)
                                    this.browser.setValue("input[id='login-password']",global.linkedinPass);
                                
                                    this.browser.pause(2000)
                                    this.browser.waitForElementPresent("#login-submit",1000);
                                    this.browser.click("#login-submit",response=>{
                                        console.log(" checking credentials ")
                                    });
                                this.browser.maximizeWindow();







                    }

                    let searchFilter = 
                    {

                        dateFilter:()=>{

                                  this.browser.waitForElementPresent(selectors.datePosted,3000)
                                  this.browser.click(selectors.datePosted,function(response){

                                        console.log("clicked new date")
                                    })

                        },

                         entryLevelFilter:()=>{
                             //form.search-s-facet-form button[aria-controls='experience-level-facet-values'] 
                              this.browser.waitForElementPresent(selectors.expLevel,1000)
                              this.browser.element("css selector",selectors.expLevel,result=>{

                                  if(result.value && result.value.ELEMENT)
                                  {
                                      console.log("expere leve present")
                                      this.browser.click(selectors.expLevel,res=>{console.log(res.state)})
                                      this.browser.click(selectors.entryLevelCbox,res=>{console.log(res.state)})      
                                  }
                                  else
                                  {
                                      console.log("exp level not present")
                                  }
                              })

                         }           


                        



                    }


                    let search =()=>{

                                    this.browser.waitForElementPresent("a[data-link-to='jobs']",1000)
                                    this.browser.click("a[data-link-to='jobs']",res=>{
                                        console.log("logged in !! now searching for jobs ")
                                    })
                      this.browser.pause(1000)  
                      
                      this.browser.waitForElementPresent(".keyword-search-box input",1000)
                
                      this.browser.isVisible(".keyword-search-box input",re=>{
                      this.browser.pause(1000) 
                      this.browser.setValue(".keyword-search-box input",[global.searchJobTitle,this.browser.Keys.ENTER])                
                                })

                 this.browser.pause(1000)
                 this.browser.useCss()   
                 this.browser.isVisible(".location-search-box  input",result=>{
                     this.browser.pause(1000) 
                     this.browser.setValue(".location-search-box  input",[global.searchJobLocation])
                            })

                 this.browser.pause(1000)
                 this.browser.isVisible(".submit-button",btn=>{

                     this.browser.click(".submit-button",res=>{

                         console.log("search btn was clicked")
                                             })
                             })
                
                this.browser.waitForElementPresent("div.jobs-search-results",2000)
               //  this.browser.waitForElementPresent("a.job-card__link-wrapper",3000)
              //   this.browser.pause(2000)
                 this.browser.maximizeWindow()



                    }

                    login()
                    search()
                    searchFilter.dateFilter()
                    searchFilter.entryLevelFilter()

            },

            newApplyNow:function(browser)
            {
                let appliedUrl = firebaseClient.fbinitReturn('dex/appliedUrl')
                let toApply = firebaseClient.fbinitReturn('dex/toApplyUrl')     
                let fbPath = "linkedin/"+global.searchJobLocation+"/"+global.searchJobTitle+"/relevance/easyLinks/urls"
                
                let applyEach = (value)=>{


                         console.log(" EASY LINK BUTTON PRESENT")
                                                                                                

                                                                                                                 this.browser.pause(7777)  
                                                                                                                 this.browser.waitForElementPresent("div.jobs-s-apply--top-card button",2000)
                                                                                                                 this.browser.isVisible("div.jobs-s-apply--top-card button",result=>{

                                                                                                                                        this.browser.click("div.jobs-s-apply--top-card button",res=>{

                                                                                                                                                            this.browser.pause(3000)  
                                                                                                                                                         this.browser.waitForElementPresent("div.modal-content-wrapper",2000)
                                                                                                                                                         this.browser.waitForElementPresent("input[id='apply-form-phone-input']",1000)
                                                                                                                                                         this.browser.pause(2000)
                                                                                                                                                         this.browser.isVisible("input[id='apply-form-phone-input']",res=>{

                                                                                                                                                                         
                                                                                                                                                                         //phone
                                                                                                                                                                         this.browser.setValue("input[id='apply-form-phone-input']",global.linkedinPhone)       
                                                                                                                                                                         this.browser.pause(3000)
                                                                                                                                                                         
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
                                                                                                                                    })// EASY APPLY BTN visible
                                                                                                
                                                                                                
                                                                                                




                }//end each apply
                
                
                
                
                
                
                
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

               
                    let urls = []
                    urls.push("https://www.linkedin.com/jobs/view/390613744/?recommendedFlavor=HIDDEN_GEM&refId=5621683291499466055098&trk=d_flagship3_search_srp_jobs&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_jobs%3B%2F5CC2QeZTECGz1TChzllPQ%3D%3D&licu=urn%3Ali%3Acontrol%3Ad_flagship3_search_srp_jobs-A_jobssearch_job_result_click")
                 //   firebaseClient.getValue(fbPath,urls=>{

                            try {

                                        urls.forEach((value,index)=>{

                                                        this.browser.url(value)
                                                        this.browser.pause(2000)
                                                        this.browser.waitForElementPresent('body',1000)
                                                        this.browser.pause(9999)  
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




               //     })// FB CLIENT





                });//CEREDS SUBMIT END
               
             



            }




}

module.exports = linkedinPage