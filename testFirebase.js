
//TEST TO SEE IF JS CONNECTED
// window.alert("OKAY");
//TEST WORKED

//Bindings
var mainText= document.getElementById("mainText");
var submitBtn = document.getElementById("submitBtn");
var fireHeading = document.getElementById("fireHeading");

//retrieving data in REAL TIME start by creating new reference in Firebase
// Changing the data in HTML with the info in the database
// var firebaseHeadingRef = firebase.database().ref().child("Heading");

//retrieving data step 2

firebaseHeadingRef.on('value', function(datasnapshot) {
    fireHeading.innerHTML = datasnapshot.val();
});



//SAVING THE DATA IN FIREBASE
function submitClick(){
    //test button-worked
    // window.alert("Working");

    var firebaseRef = firebase.database().ref();
    // firebaseRef.set("");
// get main value from main text here

    var messageText = mainText.value;
//   can not set value to the main object so created a key

    //data will be overwritten replacing the information with every click using the child method
    // firebaseRef.child("Text").set(messageText);
    //push method will create a n unique ID that it stores each time
    firebaseRef.push().set(messageText);
}
