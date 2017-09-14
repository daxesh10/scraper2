  
   var cmd=require('node-cmd');

 let sendPwd = ()=>
 {  
  cmd.get(
        'pwd',
        function(data){
            console.log('the current working dir is : ',data)
        }
    );
 }

 let sendCreateFile=()=>{
     cmd.run('touch example.created.file');
 }

 let runLinkedin = ()=>{
     cmd.run('nightwatch test/linkedinTest.js')
 }
    
let searchAndApply = ()=>{
 cmd.run('nightwatch test/linkedinSearchAndApplyTest.js')
    
}

 let runSelenium = ()=>{
     cmd.run('selenium-standalone start')
 }   

let runImgDownload = ()=>{

    cmd.run("node pages/imageDownloadNm.js")
}

 //sendPwd()
 //sendCreateFile()   
 //runLinkedin()


module.exports=
{
    runLinkedin:runLinkedin,
    runSelenium:runSelenium,
    searchAndApply:searchAndApply,
    runImgDownload:runImgDownload
}