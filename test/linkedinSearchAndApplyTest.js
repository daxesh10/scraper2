let linkedinPage = require('../pages/linkedinPage.js')
let linkedinPage2 = require('../pages/linkedinApplyPage.js')
 var nightawtch = require("nightwatch");
 let firebaseClient = require('../firebaseClient.js')

 module.exports={

'demo test for scraping pages linkedin':function(browser)
{

    let linkedin1 = new linkedinPage(browser)
   linkedin1.page1()
   browser.pause(2000)
  
},
'demo test for lodding pages linkedin':function(browser)
{

    let linkedin2 = new linkedinPage2(browser)
   linkedin2.ApplyLinkedin()
   browser.pause(2000)
  
}



 }