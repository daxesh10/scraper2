const request = require('request')







//Daxesh Mehra


const cheerio = require('cheerio')
const fs = require('fs')
const pretty = require('pretty')
const html = require("html");
const chalk = require('chalk')


let urls = []
  
const service = (url)=>{
    request.get(url,function(err,response,body){

    console.log(chalk.bgGreen('loding html response: cheerioResponse.txt'))
    fs.createWriteStream('cheerioResponse.txt').write(JSON.stringify(response.headers,null,4))    
        if(body)
        {
    
                     
            $ = cheerio.load(body)
           
        
           let str= $('img[src*="https"]')
         

         // console.log(str) 
          let arr = str.toString().split("img").map(function(current,index){

              let srcs = current.toString().split("src")

              srcs.forEach((item)=>{

                  if(item.toString().match('https:'))
                  {
                     // console.log(item)
                      let far = item.toString().split("\"")
                      //console.log('far',far)

                      far.forEach((items,index)=>{
                          if(items.toString().match('https'))
                          {
                              let objs = { url:items}
                              urls.push(objs)

                              
                          }

                         
                      })
                      //let far = Array.from(item.toString())
                  }
              
            })

                 

              let obj = {index:srcs}
              //console.log(obj)
              
       //       console.log("*************")
          })
           
           

           
          //  arr.push($)
           fs.createWriteStream('cheerioBody.txt').write(pretty(body))
            console.log(chalk.bgGreen('loding cheerio content cheerioBody.txt'))
        }

                                             
                                fs.createWriteStream('urls.txt').write(JSON.stringify(urls))
                                console.log(chalk.blue("writting o/p urls... ")) 
    })



}

const url = "https://bitconnectcoin.co/"

service(url)
console.log(chalk.yellow('scrapping img urls'))