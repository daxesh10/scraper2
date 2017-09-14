var Homepage = require('../pages/Homepage.js')
 var nightawtch = require('nightwatch');



 module.exports = {
  'Doctors brand Indica ' : function (browser) {
    
    home = new Homepage(browser)
   // home.loadPage2()
     home.loadBrandIndica()
      browser.pause(1000)
      browser.end();
  }
}