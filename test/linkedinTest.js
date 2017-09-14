let linkedinPage = require('../pages/linkedinPage.js')
 var nightawtch = require("nightwatch");
 let firebaseClient = require('../firebaseClient.js')

 module.exports={

'demo test for lodding pages linkedin':function(browser)
{

    let linkedin = new linkedinPage(browser)
   linkedin.page1()
   browser.pause(2000)
  
}
// 'demo test for users from scaper coin':function(browser)
// {

//     let linkedin = new linkedinPage(browser)
//     linkedin.userPage1()
//     browser.pause(7000)
//     browser.end()

// }


// 'demo filter test for check For Applied or not ':function(browser)
// {
//     firebaseClient.delWithRef("dex","toApplyUrl")
//     let linkedin = new linkedinPage(browser)
//     linkedin.checkForApplied()
//    browser.pause(2000)
//  // browser.end()
//  },

// , 'demo test for applyNow easy links ':function(browser)
//  {
    
//      let linkedin = new linkedinPage(browser)
//       linkedin.newApplyNow()
//       browser.pause(4000)
//   //   browser.end()
//  }    
   
   
  

}
     

 