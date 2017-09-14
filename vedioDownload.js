var request = require('request')
var nightwatch = require('nightwatch');
var fs = require('fs');
let dir = "./vedio/folder1"

//downlaoding images
let download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
 //   console.log('content-type:', res.headers['content-type']);
 //   console.log('content-length:', res.headers['content-length']);

    let imgpath = './screenshots/dispen/'+filename+".mp4"
  
    request(uri).pipe(fs.createWriteStream(imgpath)).on('close', callback);
  });
}

// download("url",
// "vi1.mp4",()=>console.log("downlaoding.."))