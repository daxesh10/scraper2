var page = require('webpage').create();
page.open("https://weedmaps.com/brands/category/flower/indica-flower", function (status) {
    let urls=[]
        var mainTitle = page.evaluate(function () {
        console.log('message from the web page');
       
    
        return document.querySelectorAll("//div[@class='card-content']//a")
   
});
   console.log(mainTitle.length)
 
    slimer.exit()
});