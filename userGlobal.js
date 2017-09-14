
var person = {
    firstName: 'Jimmy',
    lastName: 'Smith',
    get fullName() {
        return this.firstName + ' ' + this.lastName;
    },
    set fullName (name) {
        var words = name.toString().split(' ');
        this.firstName = words[0] || '';
        this.lastName = words[1] || '';
    }
}

// person.fullName = 'dex m';
// console.log(person.firstName); // Jack
// console.log(person.lastName) // Franklin

















let userGlobal = {

 "searchJobTitle":"",
 "searchJobLocation":"",
 "linkedinEmail":"",
 "linkedinPass":"",
"linkedinPhone":"",
  "linkedinNoPages":"",

//job tittle
set JobTile (jobTitle){

    this.searchJobTitle = jobTitle
},


get JobTile (){
    return  this.searchJobTitle

},

//job location
set JobLocation(jobLocation){

     this.searchJobLocation = jobLocation
},


get JobLocation(){
    return   this.searchJobLocation

},




// user email
set linkedinEmail(email){

     this.linkedinEmail = email
},


get linkedinEmail() {
    return   this.linkedinEmail

},

// user password
set UserPass(pass){

     this.linkedinPass = pass
},


get UserPass(){
    return   this.linkedinPass

},



//return user obj
get User(){

    return{
        "searchJobTitle": this.searchJobTitle,
        "searchJobLocation": this.searchJobLocation,
        "linkedinEmail": this.linkedinEmail,
        "linkedinPass": this.linkedinPass,
        "linkedinNoPages" : '21'
     }
},

set User(user){

     this.searchJobTitle = user.searchJobTitle
     this.searchJobLocation = user.searchJobLocation
     this.linkedinEmail = user.linkedinEmail
     this.linkedinPass = user.linkedinPass
     this.linkedinNoPages = '21'
},



}



module.exports = userGlobal




