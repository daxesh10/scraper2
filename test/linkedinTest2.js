let linkedinPage2 = require('../pages/linkedinPage2.js')
 var nightawtch = require("nightwatch");
 let firebaseClient = require('../firebaseClient.js')


 module.exports = {


' demo test for linkedin seach criteria  ': function(browser)
{

    let linkedin = new linkedinPage2(browser)

    //linkedin.page1()
    linkedin.newApplyNow()
    browser.pause(2000)

}

 }