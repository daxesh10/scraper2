let firebase = require('firebase-admin')
,serviceAcc = require('./serviceAccount.json')


firebase.initializeApp({
    credential: firebase.credential.cert(serviceAcc),
    databaseURL: "https://mydata-d5748.firebaseio.com"

});

//console.log(firebase)

let ref = firebase.database().ref('mydata')
let msgref = ref

let returnBaseFirebaseRef = (callback)=>
{
    callback(firebase)
} 

let signInWithGoogle = ()=>{

      //var provider = firebase.auth().GoogleAuthProvider();
            firebase.auth().signInWithPopup("google").then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user)
        // ...
        }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        });


}

let fbinit = (fbpath)=>
{

msgref = ref.child(fbpath)

}

let firebaseSetSearch = (obj)=>
{
let ref = firebase.database().ref('mydata/jobScrap/user1/searches').push()

ref.push(obj)

}


/// image downloadewr 
let firebaseSetImageDownload = (obj)=>
{
let ref = firebase.database().ref('mydata/imageDownload/user1/searches').push()

ref.push(obj)

}
let firebaseGetRecentImageDownload = (callback)=>{

let ref = firebase.database().ref('mydata/imageDownload/user1/searches')

let results = []
ref.on('value',function(snapshot){

//console.log(snapshot.val())
let searches = snapshot.val()
Object.keys(searches).forEach((sval,index)=>{

    Object.keys(searches[sval]).forEach((val,index)=>{

        //console.log(searches[sval][val])
        results.push(searches[sval][val])
    })
})

    return callback(results.pop())
//console.log(results.pop())
})//on value

}



let firebaseGetSearch = ()=>{

let ref = firebase.database().ref('mydata/jobScrap/user1/searches')

let results = []
ref.on('value',function(snapshot){

//console.log(snapshot.val())
let searches = snapshot.val()
Object.keys(searches).forEach((sval,index)=>{

    Object.keys(searches[sval]).forEach((val,index)=>{

        //console.log(searches[sval][val])
        results.push(searches[sval][val])
    })
})

console.log(results)
})//on value

}


let firebaseGetRecentSearch = (callback)=>{

let ref = firebase.database().ref('mydata/jobScrap/user1/searches')

let results = []
ref.on('value',function(snapshot){

//console.log(snapshot.val())
let searches = snapshot.val()
Object.keys(searches).forEach((sval,index)=>{

    Object.keys(searches[sval]).forEach((val,index)=>{

        //console.log(searches[sval][val])
        results.push(searches[sval][val])
    })
})

    return callback(results.pop())
//console.log(results.pop())
})//on value

}


//firebaseGetRecentSearch()



// firebaseArraySearch({ searchJobTitle: 'java',
//   searchJobLocation: 'texas',
//   userEmail: 'daxshmehra10@gmail.com',
//   userPassword: 'thankyouUniverse' })

// firebaseArraySearch({ searchJobTitle: 'node',
//   searchJobLocation: 'florida',
//   userEmail: 'daxshmehra10@gmail.com',
//   userPassword: 'thankyouUniverse' })
  


let fbinitReturn = (fbpath)=>
{
msgref = ref.child(fbpath)
return msgref
}

let addWithRef = (msgref,obj)=>
{
    msgref.push(obj)
    status()
}

let getKeys = (loc,callback)=>
{
    let myurl = {},keys=[]
let urls = firebase.database().ref('mydata/'+loc)
urls.once("value",function(snapshot){

 myurl = snapshot.val() 
 Object.keys(myurl).forEach(item=>{

     console.log("inside",item)
     keys.push(item)
 })


console.log("outside",keys)
callback(keys)
})



}

let myurl = {}
let getValue = function(loc,callback)
{


let urls = firebase.database().ref('mydata/'+loc)
let urlA = []
urls.once("value",function(snapshot){
 
        
  //      if(snapshot.exists())
 //       {
        myurl = snapshot.val()
        //console.log("myurl ",myurl)
        
        Object.keys(myurl).forEach(item=>{

           // console.log(myurl[item])
            urlA.push(myurl[item])
        })


        //console.log("returning ",urlA)
        callback(urlA)
       // }

}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
})

 

}



//info for firebase updates
let status = ()=>{

msgref.orderByKey().limitToLast(1).on('child_changed',function(snap){

    console.log('changed: '+ JSON.stringify(snap.val()))
})

msgref.orderByKey().limitToLast(1).on('child_removed',function(snap){
    console.log('deleted : '+ JSON.stringify(snap.val()))
})

msgref.orderByKey().limitToLast(1).on('child_added',function(snap){
       console.log('added new entry')//+ JSON.stringify(snap.val()))
})

}

let addEntry = (obj)=>{

  msgref.push(obj)
 // console.log('msg key', msgref.push().key)
  status()      

}

let delEntry = (key)=>{

msgref.on("value",(snapshot)=>{

    if(snapshot.exists())
    {
        msgref.child(key).remove()
        status()
    }
})

// msgref.orderByKey().limitToLast(1).on('value',function(snap){
//     console.log(snap.val())
// })

//console.log(msgref.child(key))

 
}

let delWithRef = (fbpath,key)=>{

msgref.child("/"+fbpath).child(key).remove()
status()

}

// msgref.once('value').then(function(snapshot){

//     console.log('key: '+snapshot.key+'\n')
//     console.log('values: '+JSON.stringify(snapshot.val())+'\n')
//     console.log('refence'+snapshot.ref.toString()+'\n')
// })

// msgref.child("-KhUBFg7FiX3brk3BHhW").set({name:"hello guys !!",count:3})
// ref.child("-KhUBFg7FiX3brk3BHhW").remove()

let getall = (callback)=>{

let values = {}
msgref.on('value',function(snapshot){

//console.log(snapshot.val())
let v = snapshot.val()
Object.keys(v).forEach((key)=>{

    values[key] = v[key]
})
//console.log("return from fb values: ",values)
callback(values)
})

}
//return values



// msgref.once('value').then(function(snapshot){

// console.log('getting all')
// let values = snapshot.val()
// let newObj = {}    
   
//     Object.keys(values).forEach(function(key,index){

//         newObj[key] = values[key]
//         //console.log(key+" : "+val.name+" : "+val.email+" :"+val.msg)

//     })
    
// return newObj
//     // values.forEach((item,index)=>{

//     //     console.log(item.name)
//     //     console.log(item.email)
//     // })

// })




module.exports = {

add:addEntry,
deleted:delEntry,
getall:getall,
getValue:getValue,
fbinit:fbinit,
fbinitReturn:fbinitReturn,
addWithRef:addWithRef,
getKeys:getKeys,
delWithRef:delWithRef,
firebaseGetRecentSearch:firebaseGetRecentSearch,
firebaseSetSearch:firebaseSetSearch,
returnBaseFirebaseRef:returnBaseFirebaseRef,
signInWithGoogle:signInWithGoogle,
firebaseSetImageDownload:firebaseSetImageDownload,
firebaseGetRecentImageDownload:firebaseGetRecentImageDownload


}




 //delEntry('KhUBFgIOnDACzbBNXA6')