var Homepage = require('../pages/Homepage.js')
 var nightawtch = require('nightwatch');



 module.exports = {
  'Doctors Map test ' : function (browser) {
    
    home = new Homepage(browser)
   // home.loadPage2()
     home.loadDelivery()
      browser.pause(1000)
      browser.end();
  }
}