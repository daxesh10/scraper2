var request = require('request');
var cheerio = require('cheerio');

request('https://weedmaps.com/brands/category/flower/indica-flower', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    //console.log(html);
 var $ = cheerio.load(html);
let urls = []   
 $('div.card-content').each((index,el)=>{
    
    console.log(index)

 })


  }
});