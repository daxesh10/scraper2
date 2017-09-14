let fs = require('fs')
var nightwatch = require('nightwatch');
let request = require('request')
let cheerio =require("cheerio")
let firebaseClient = require('../firebaseClient.js')
//let global = require('../global.js')
var xmlserializer = require('xmlserializer')
let userGlobal = require('../userGlobal.js')
var appliedUrl = [],scrapingUrls = [];


function linkedinApplyPage (browser)
{
    this.browser = browser
}


let selectors = {


    "applyBtn":"button.jobs-s-apply__button",
    "phone":"#apply-form-phone-input",
    "resume":"#file-browse-input",
    "submitBtn":"button[type='submit'].jobs-apply-form__submit-button"


}







linkedinApplyPage.prototype={



ApplyLinkedin:function(browser)
{

    let loginWithCreds = (global)=>
    {

             
                this.browser.url("https://www.linkedin.com/");
                this.browser.waitForElementPresent('body',3000);
                this.browser.pause(7000);
                this.browser.waitForElementPresent("#login-email",2000);
                this.browser.waitForElementPresent("#login-password",1000);
                this.browser.setValue("input[id='login-email']",global.linkedinEmail);
                this.browser.setValue("input[id='login-password']",global.linkedinPass);
               
                this.browser.waitForElementPresent("#login-submit",1000);
                this.browser.click("#login-submit",response=>{
                    console.log(" checking credentials "+response.state)
                    this.browser.maximizeWindow();

                })


    }

   let fillForm = (global)=>{

      
      //initializing global for applying
       global['linkedinPhone']="6196067338"
       global['resumePath'] = "F:/daxesh_mehra_Resume_final.docx"



       this.browser.pause(7000)
       this.browser.waitForElementPresent('body',11000)
       this.browser.element("css selector",selectors.applyBtn,res=>{

           if(res.value && res.value.ELEMENT)
           {
               // clicking apply btn
               this.browser.click(selectors.applyBtn,res=>{
                   if(res.state)
                   {
                             this.browser.pause(4000)
                                  
                                    //phone 
                                    this.browser.element("css selector",selectors.phone,result=>{
                                        if(result.value && result.value.ELEMENT)
                                        {
                                            this.browser.pause(3000)
                                            this.browser.setValue(selectors.phone,global.linkedinPhone)
                                        }
                                    })
                                    
                                    //resume
                                    this.browser.element("css selector",selectors.resume,result=>{
                                        if(result.value && result.value.ELEMENT)
                                        {
                                            this.browser.pause(3000)
                                            this.browser.setValue(selectors.resume,require('path').resolve(global.resumePath))
                                        }
                                    })

                                    //form submit
                                    this.browser.element("css selector",selectors.submitBtn,result=>{
                                        if(result.value && result.value.ELEMENT)
                                        {
                                            this.browser.pause(3000)
                                            this.browser.click(selectors.submitBtn,res=>console.log(' job submited'+res.state))  
                                        }  
                                    })



                   }
               })
                

           }
           else
           {
               console.log("already applied or expired")
           }//end of if else for apply btn presrnt
       })// end of apply btn element


   }//end of fiil form


firebaseClient.firebaseGetRecentSearch(global=>{

                let appliedUrl = firebaseClient.fbinitReturn('dex/appliedUrl')
                let fbPath = "linkedin/"+global.searchJobLocation+"/"+global.searchJobTitle+"/relevance/easyLinks/urls"
               
               //login first
               loginWithCreds(global)

                 firebaseClient.getValue(fbPath,urls=>{

                            try {
                                
                           

                                        urls.forEach((value,index)=>{

                                                          
                                                        this.browser.url(value)
                                                         this.browser.pause(4000); 
                                                        
                                                        //filling the form for applying job
                                                         fillForm(global)

                                        })// for each urls          

                               } catch (error) {
                                
                            }//end of try catch                         
            
            })// end of firebaseClient get value


})// end of firebaseClient global

}//end of test ApplyLinkedin

}// end of prototype


module.exports = linkedinApplyPage