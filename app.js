// Initialize Firebase
 
   //let auth = firebase.auth()
   var config = {
    apiKey: "AIzaSyA_ECTvmFcCLgJdgWVflcRtMkEszNmloOQ",
    authDomain: "mydata-d5748.firebaseapp.com",
    databaseURL: "https://mydata-d5748.firebaseio.com",
    projectId: "mydata-d5748",
    storageBucket: "mydata-d5748.appspot.com",
    messagingSenderId: "1097794308491"
  };
 firebase.initializeApp(config);
 
angular.module("fbApp", ['firebase','ngRoute'])
.config($routeProvider=>{

    $routeProvider
    .when("/",{

        templateUrl : "/api/views/jobHome.html"
        
    })
        .when("/plans",{

        templateUrl : "../api/views/plans.html"
        
        })
        .when("/home",{

        templateUrl : "../api/views/howToUse.html"
        })
        .when("/linkedin",{

        templateUrl : "../api/views/linkedinJob.html"
        
        })
        .when("/job",{
            templateUrl : "../api/views/jobs.html"
        })
        .when("/imgdownload",{
            templateUrl : "../api/views/imgDownload.html"
        })

        // .when("/linkedin/:linkedinJobTitle/:linkedinJobLocation",{

        // templateUrl : "../api/views/linkedinJob.html"
    

        // })
        .when("/dispen",{

        templateUrl : "../api/views/dispen.html"
        })
        .when("/dispen/:dispenLoc",{

        templateUrl : "../api/views/dispenDetail.html"
        
        })
        .when("/brands",{

        templateUrl : "../api/views/brands.html"
        })
        .when("/brands/:brandLoc",{

        templateUrl : "../api/views/brandDetail.html"
        
        })
        
        

})
.controller("SyncController", ['$routeParams','$scope','$firebaseObject','$firebaseArray','$log','$http',
($routeParams,$scope, $firebaseObject,$firebaseArray,$log,$http)=>{

$scope.author ="Dexter"

$scope.linkedinSearch = (linkedinEmail,linkedinPass,linkedinJobTitle,linkedinJobLocation,linkedinPages)=>{


// $scope.linkedinJobTitle = linkedinJobTitle
// $scope.linkedinJobTitle = $routeParams.linkedinJobTitle;

// $scope.linkedinJobLocation = linkedinJobLocation
// $scope.linkedinJobLocation = $routeParams.linkedinJobLocation

// $log.info($scope.linkedinJobTitle)
// $log.info($scope.linkedinJobLocation)

$log.info(linkedinJobTitle)
$log.info(linkedinJobLocation)

$http({
    url: '/linkedinJob', 
    method: "GET",
    params:{
        "linkedinEmail":linkedinEmail,
        "linkedinPass":linkedinPass,
        "linkedinJobTitle":linkedinJobTitle,
        "linkedinJobLocation":linkedinJobLocation,
        "linkedinPages":linkedinPages
        }
 }).then(function suc(response){

     $scope.data = response.data

 },function err (error){

     $scope.error = error
 });



}

$scope.linkedinSearchAndApply = (linkedinEmail,linkedinPass,linkedinJobTitle,linkedinJobLocation,linkedinPages,linkedinPhone,resumePath)=>{


// $scope.linkedinJobTitle = linkedinJobTitle
// $scope.linkedinJobTitle = $routeParams.linkedinJobTitle;

// $scope.linkedinJobLocation = linkedinJobLocation
// $scope.linkedinJobLocation = $routeParams.linkedinJobLocation

// $log.info($scope.linkedinJobTitle)
// $log.info($scope.linkedinJobLocation)

$log.info(linkedinJobTitle)
$log.info(linkedinJobLocation)

$http({
    url: '/linkedinJob/search/apply', 
    method: "GET",
    params:{
        "linkedinEmail":linkedinEmail,
        "linkedinPass":linkedinPass,
        "linkedinJobTitle":linkedinJobTitle,
        "linkedinJobLocation":linkedinJobLocation,
        "linkedinPages":linkedinPages,
         "linkedinPhone":linkedinPhone,
         "resumePath": resumePath
        }
 }).then(function suc(response){

     $scope.data = response.data

 },function err (error){

     $scope.error = error
 });



}

$scope.imageDownload=(webUrl,pathToStore)=>{

$http({
    
    url:"imageDownloader",
    method:"GET",
    params:{
        "webUrl":webUrl,
        "pathToStore":pathToStore,
    }
})
.then(function suc(response){

     $scope.imgData = response.data

 },function err (error){

     $scope.error = error
 });



}




}])
.controller("userCtrl",['$scope','$log','$rootScope','$timeout',function($scope,$log,$rootScope,$timeout){

    let cu = ()=>{

        var user = firebase.auth().currentUser

            if (user) {
            
            console.log("currentuser is ",user)

            } else {
            // No user is signed in.
            }

    }

    let sendEmailVerify = ()=>{


        var user = firebase.auth().currentUser;

            user.sendEmailVerification().then(function() {
            
                console.log("email verification send")
                $scope.userMsg = "email verification send"
                $timeout(function(){
                            $scope.userMsg = ""
                        },7000)

            }, function(error) {
            // An error happened.
            });
    }

    $scope.getProfile = ()=>{

            var user = firebase.auth().currentUser;
            var name, email, photoUrl, uid, emailVerified;

            let currentProfile = {}
            if (user != null) {
            currentProfile.name = user.displayName;
            currentProfile.email = user.email;
            currentProfile.photoUrl = user.photoURL;
            currentProfile.emailVerified = user.emailVerified;
            currentProfile.uid = user.uid; 
            
            
             // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
}
    }

    $scope.signupWithEmail = function()
            {
                console.log($scope.email)
                console.log($scope.password)

                firebase.auth().createUserWithEmailAndPassword($scope.email, $scope.password)
                .catch(function(error) {
                    // Handle Errors here.
                  //  var errorCode = error.code;
                  //  var errorMessage = error.message;
                    
                        console.log(" error "+JSON.stringify(error))
                        $scope.error = JSON.stringify(error)
                    
                        // $timeout(function(){
                        //     $scope.signUpError = ""
                        // },7000) 
                    // ...
                    });


                    try 
                    {           
                                let currentuser = {};
                    
                                firebase.auth().onAuthStateChanged(firebaseUser=>{
                                    // Currentuser.name = firebaseUser.email
                                        // currentuser.email = firebaseUser.email;
                                        // currentuser.uid = firebaseUser.uid;
                                        // currentuser.auth = firebaseUser.emailVerified;

                                        console.log("signed in user ",JSON.stringify(firebaseUser))

                                     

                                        $scope.loginToggle = false;
                                        $scope.profileToggle = true;
                                        $scope.currentUser = firebaseUser
                                        $rootScope.cUser = firebaseUser

                                      console.log(($rootScope.cUser)?" email "+$rootScope.cUser.email:"email not present")
                                }) 
                        

                                sendEmailVerify()
                                cu()


                    } catch (error) 
                    {
                        console.log("sign up error ",error) 
                        $scope.error = error
                       
                    }
                    

                                if(!$scope.error)
                                $scope.showR = false

            }

            $scope.signinWithEmail = ()=>{

                console.log("singim email",$scope.email)
                console.log("singim password",$scope.password)

                
                const promise = firebase.auth().signInWithEmailAndPassword($scope.email,$scope.password)
                promise.catch(function(error) {
                    // Handle Errors here.


                    
                    console.log("error",error.message)
                    var errorCode = error.code;
                    var errorMessage = error.message;
 
                    if(error)
                    {
                           
                        $scope.error = error.message

                        $timeout(function(){
                            $scope.error = ""
                        },7000) 
                    }
                    
                    });
                    // ...
                  
                    
                    try 
                    {

                                   let currentuser = {}
                    
                                    firebase.auth().onAuthStateChanged(firebaseUser=>{
                                        
                                        currentuser.email = firebaseUser.email,
                                        currentuser.uid = firebaseUser.uid;

                                        console.log("signed in user ",firebaseUser)

                                        if(currentuser.email != null)
                                       // loginToast(" user "+currentuser.email +" logged in")

                                        // $scope.loginToggle = false;
                                        // $scope.profileToggle = true;
                                        $scope.currentUser = firebaseUser
                                        $rootScope.cUser = firebaseUser

                                        console.log(($rootScope.cUser)?" email "+$rootScope.cUser.email:"email not present")
                                })



                    } catch (error)
                    {
                        console.log(error)
                         $scope.error = error
                    }

                  
                    

                   

            }





}])
.directive("plans",function(){
    return{
        restrict:"ACE",
        templateUrl : "../api/views/plans.html"
    }
})
.directive("login",function(){
    return{
        restrict:"ACE",
        templateUrl : "../api/views/login.html"
    }
})
.directive("signup",function(){
    return{
        restrict:"ACE",
        templateUrl : "../api/views/signUp.html",
        controller:"userCtrl"
    }
})



//     .controller("SyncController", ['$routeParams','$scope','$firebaseObject','$firebaseArray','$log',
//     ,($routeParams,$scope, $firebaseObject,$firebaseArray,$log)=>{

       
//          let getVal = (obj)=>{


            
//              let det = []
//            // console.log(data)
           
//             obj.$loaded().then(function() {
            
//                     angular.forEach(obj,function(value,lkey){

//                         let name = lkey
//                         let v = obj[lkey]
//                     //  console.log("key = "+lkey+"  vals= ",obj[key][lkey])
                        
           
//                                         Object.keys(obj[lkey]).forEach((value,index)=>{
                                            
//                                            console.log("urls",obj[lkey][value]['email'])
//                                             det.push(obj[lkey][value])
                                            
//                                         })


//                                 //  shops.push(obj[lkey])
//                                     // shops.push(v)
//                                 })

//                         $scope.det = det
//         //   console.log($scope.det)
           
      
//                      })

//             }

// let getBrandVal = (obj)=>{


            
//              let det = []
//            // console.log(data)
           
//             obj.$loaded().then(function() {
            
//                     angular.forEach(obj,function(value,lkey){

                                            
//                                 //           console.log("urls",obj[lkey][value]['email'])
//                                             det.push(obj[lkey])
                                            
                                        


//                                 //  shops.push(obj[lkey])
//                                     // shops.push(v)
//                                 })

//                         $scope.det = det
//         //   console.log($scope.det)
           
      
//                      })

//             }


//        $scope.getDispenLoc = (dispenLoc)=>
//       {

//             $scope.dispenLoc = dispenLoc
//             $scope.dispenLoc = $routeParams.dispenLoc;
//             let ref = firebase.database().ref('mydata')
//             let docs = ref.child("dispen").child("loaction").child(dispenLoc)
//             let obj = $firebaseObject(docs)
//             console.log("dispenCtrl ",dispenLoc)
        
//             getVal(obj)  




//       }      

//              $scope.getBrandLoc = (brandLoc)=>
//       {

//             $scope.brandLoc = brandLoc
//             $scope.brandLoc = $routeParams.brandLoc;
//             let ref = firebase.database().ref('mydata')
//             let docs = ref.child("brands").child("flower").child("indica").child("page1").child(brandLoc)
//             let obj = $firebaseObject(docs)
//             console.log("dispenCtrl ",brandLoc)
        
//             getBrandVal(obj)  




//       }      


  
//       $scope.getDocLoc = (docLoc)=>
//       {

//             $scope.docLoc = docLoc
//             $scope.docLoc = $routeParams.docLoc;
//             let ref = firebase.database().ref('mydata')
//             let docs = ref.child("doctors").child("loaction").child(docLoc)
//             let obj = $firebaseObject(docs)
//             console.log("doc ctrl",docLoc)
        
//             getVal(obj)  




//       }
//         $scope.getLoc = (x)=>
//         {
//             $scope.x = x
//             $scope.x = $routeParams.x;
//             let ref = firebase.database().ref('mydata')
//             let los = ref.child("delivery").child("loaction").child(x)
//             let obj = $firebaseObject(los)
//             console.log(x)
        
//             getVal(obj)   
//         }
        
           
//          //  $scope.data = data
//          //  $scope.shops = shops
          
        

//     }])
//     .controller("DeliveryCtrl",['$scope', '$firebaseObject','$firebaseArray','$log'
//     ,($scope, $firebaseObject,$firebaseArray,$log)=>{

     
 
//         let ref = firebase.database().ref('mydata')   
//         let los = ref.child("delivery").child("loaction")
//         let links = []
//         let obj = $firebaseObject(los)


//         //load obj

//          obj.$loaded().then(function() {

//                 angular.forEach(obj, function(value, key) {
//                 console.log("first",obj[key],"key "+key)
//             links.push(key)
                
//                       })

//                                         })
//       $scope.dloc = links
//         console.log("DeliveryCtrl",$scope.dloc)
//     }])

//  .controller("DoctorCtrl",['$scope', '$firebaseObject','$firebaseArray','$log'
//     ,($scope, $firebaseObject,$firebaseArray,$log)=>{

//               let ref = firebase.database().ref('mydata')   
//          let los = ref.child("doctors").child("loaction")
//         let links = []
//         let obj = $firebaseObject(los)


//         //load obj

//          obj.$loaded().then(function() {

//                 angular.forEach(obj, function(value, key) {
//                 console.log("first",obj[key],"key "+key)
//             links.push(key)
                
//                       })

//                                         })
//       $scope.docloc = links
//         console.log("doctors",$scope.docloc)

//  }])
//  .controller("DispenCtrl",['$scope', '$firebaseObject','$firebaseArray','$log'
//     ,($scope, $firebaseObject,$firebaseArray,$log)=>{

//               let ref = firebase.database().ref('mydata')   
//          let los = ref.child("dispen").child("loaction")
//         let links = []
//         let obj = $firebaseObject(los)


//         //load obj

//          obj.$loaded().then(function() {

//                 angular.forEach(obj, function(value, key) {
//                 console.log("first",obj[key],"key "+key)
//             links.push(key)
                
//                       })

//                                         })
//       $scope.disloc = links
//         console.log("doctors",$scope.disloc)

//  }])
//   .controller("BrandCtrl",['$scope', '$firebaseObject','$firebaseArray','$log'
//     ,($scope, $firebaseObject,$firebaseArray,$log)=>{

//               let ref = firebase.database().ref('mydata')   
//          let los = ref.child("brands").child("flower").child("indica").child("page1")
//         let links = []
//         let obj = $firebaseObject(los)


//         //load obj

//          obj.$loaded().then(function() {

//                 angular.forEach(obj, function(value, key) {
//                 console.log("first",obj[key],"key "+key)
//             links.push(key)
                
//                       })

//                                         })
//       $scope.brandloc = links
//         console.log("doctors",$scope.disloc)

//  }])