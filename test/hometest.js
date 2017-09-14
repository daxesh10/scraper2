 var Homepage = require('../pages/Homepage.js')
 var nightawtch = require('nightwatch');



// module.exports= {

//     "default": function (browser) {
//         browser.windowMaximize();
//         browser.pause(2000);
//     },

//     "test for l": function (browser) {
//         home = new homepage(browser);
//         home.loadGoogle();
//     }


// } 


module.exports = {
  'Demo test Google' : function (browser) {
    
    home = new Homepage(browser)
   // home.loadPage2()
     home.loadDispen()
      browser.pause(1000)
      browser.end();
  }
}