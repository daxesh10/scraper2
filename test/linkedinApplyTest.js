let linkedinPage = require('../pages/linkedinApplyPage')
 var nightawtch = require("nightwatch");
 let firebaseClient = require('../firebaseClient.js')

 module.exports={

'demo test for lodding pages linkedin':function(browser)
{

    let linkedin = new linkedinPage(browser)
   linkedin.ApplyLinkedin()
   browser.pause(2000)
  
}

}