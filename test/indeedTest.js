let indeedPage = require('../pages/indeedPage.js')
 var nightawtch = require("nightwatch");
 let firebaseClient = require('../firebaseClient.js')


 module.exports = {


'demo test for indeed ': function(browser)
{

    let indeed = new indeedPage(browser)

    indeed.loginIndeed()
  //  indeed.searchType1()
    indeed.ApplyNow()
    browser.pause(2000)

}

 }