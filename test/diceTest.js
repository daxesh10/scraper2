let dicePage = require('../pages/dicePage.js')
 var nightawtch = require("nightwatch");
 let firebaseClient = require('../firebaseClient.js')


 module.exports = {


'demo test for dice ': function(browser)
{

    let dice = new dicePage(browser)

    dice.page1()
    browser.pause(2000)

}

 }