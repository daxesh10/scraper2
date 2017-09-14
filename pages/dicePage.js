let fs = require('fs')
var nightwatch = require('nightwatch');
let request = require('request')
let cheerio =require("cheerio")
let firebaseClient = require('../firebaseClient.js')
let global = require('../global.js')
var xmlserializer = require('xmlserializer')


let sel = {

    diceUrl:"https://www.dice.com/",
    loginDrop:"a#Login_1",
    diceEmail:"input#Email_1",
    dicePass:"input#Password_1",
    diceloginbtn:"button#LoginBtn_1[type='submit']"



}


function dicePage(browser)
{
    this.browser = browser
} 

dicePage.prototype={

    fillCreds:function(browser){

        console.log("filling creds")
                  //email
                this.browser.pause(3000)
                this.browser.waitForElementPresent(sel.diceEmail,2000)
                this.browser.setValue(sel.diceEmail,global.monsterEmail)
                
                 //password
                this.browser.pause(3000)
                this.browser.waitForElementPresent(selector.password,2000)
                this.browser.setValue(selector.password,global.monsterPassword)
        
                 //check rememberMe
                this.browser.pause(3000)
                this.browser.waitForElementPresent(selector.rememberMe,2000)
                this.browser.click(selector.rememberMe,res=>{console.log(res.state)})

                 //submit form
                this.browser.pause(3000)
                this.browser.waitForElementPresent(selector.submitBtn,2000)
                this.browser.click(selector.submitBtn,res=>console.log(" login form submit ",res.state))


    },
    page1:function(browser)
    {
        this.browser.url(sel.diceUrl)
        this.browser.pause(3000)
        this.browser.maximizeWindow()
        this.browser.click(sel.loginDrop,res=>{

            console.log(res.state)
        }
        
        
        
        

    }



}

module.exports = dicePage