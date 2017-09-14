const
    express = require('express'),
    path = require('path'),
    app = express();

let firebaseClient = require('./firebaseClient.js');
let cmd = require('./sendTocmd.js')
let vo = require('vo')
let userGlobal = require('./userGlobal.js')


   
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

let port = process.env.PORT || 8081
app.use(express.static(path.join(__dirname)))
//app.use(require('./client/routes')())

app.get('/',(request,response)=>{

    console.log(request.id)
    response.sendFile("/index.html")
})

app.get('/linkedinJob',(req,res)=>{

    let linkedinJobTitle = req.param("linkedinJobTitle");
    let linkedinJobLocation = req.param("linkedinJobLocation");
    let linkedinEmail = req.param("linkedinEmail");
    let linkedinPass = req.param("linkedinPass");
    let linkedinPages = req.param("linkedinPages")

    if(!linkedinPages)
    {
        linkedinPages = "21"
    }
  
    
    // userGlobal.linkedinEmail= "daxshmehra10@gmail.com"
    // userGlobal.linkedinPass= "thankyouUniverse"
    // userGlobal.JobTile = linkedinJobTitle
    // userGlobal.JobLocation= linkedinJobLocation
  
  let global = {

       "searchJobTitle" : linkedinJobTitle,
       "searchJobLocation" : linkedinJobLocation,
       "linkedinEmail":linkedinEmail,
       "linkedinPass":linkedinPass,
       //linkedinPhone:"6196067338",
       "linkedinNoPages":linkedinPages,
       
  }
    
  //  console.log(userGlobal.User)    

    firebaseClient.firebaseSetSearch(global)
    
  //  cmd.runSelenium()
    cmd.runLinkedin()
   
    res.send("scarpping with email "+linkedinEmail+" Job Title "+linkedinJobTitle+"  Job location "+linkedinJobLocation)

  //res.send(global)

})


app.get('/linkedinJob/search/apply',(req,res)=>{

    let linkedinJobTitle = req.param("linkedinJobTitle");
    let linkedinJobLocation = req.param("linkedinJobLocation");
    let linkedinEmail = req.param("linkedinEmail");
    let linkedinPass = req.param("linkedinPass");
    let linkedinPages = req.param("linkedinPages")
    let linkedinPhone = req.param("linkedinPhone")
    let resumePath = req.param("resumePath")

    if(!linkedinPages)
    {
        linkedinPages = "21"
    }
  
    
    // userGlobal.linkedinEmail= "daxshmehra10@gmail.com"
    // userGlobal.linkedinPass= "thankyouUniverse"
    // userGlobal.JobTile = linkedinJobTitle
    // userGlobal.JobLocation= linkedinJobLocation
  
  let global = {

       "searchJobTitle" : linkedinJobTitle,
       "searchJobLocation" : linkedinJobLocation,
       "linkedinEmail":linkedinEmail,
       "linkedinPass":linkedinPass,
       //linkedinPhone:"6196067338",
       "linkedinNoPages":linkedinPages,
       
  }
    
  //  console.log(userGlobal.User)    

    firebaseClient.firebaseSetSearch(global)
    
  //  cmd.runSelenium()
    cmd.searchAndApply()
   
    res.send("scarpping with email "+linkedinEmail+" Job Title "+linkedinJobTitle+"  Job location "+linkedinJobLocation)

  //res.send(global)

})




app.get("/imageDownloader",(req,res)=>{

let webUrl = req.param("webUrl")
let pathToStore = req.param("pathToStore")

let imgDownObj = {
  "webUrl":webUrl,
  "pathToStore":pathToStore
}

firebaseClient.firebaseSetImageDownload(imgDownObj)
cmd.runImgDownload()



})












app.listen(port,()=>{

    console.log('server running on. \n localhost:',port)
})