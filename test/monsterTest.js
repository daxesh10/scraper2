let monsterPage = require('../pages/monsterPage')
 var nightawtch = require("nightwatch");
 let firebaseClient = require('../firebaseClient.js')

 module.exports={

'demo test for monster':function(browser)
{

    let monster = new monsterPage(browser)

    monster.page1()
    browser.pause(2000)


},
'demo test for monster applying now ':function(browser)
{

    let monster = new monsterPage(browser)

   
    monster.ApplyNow()  
    browser.pause(2000)


}



 }