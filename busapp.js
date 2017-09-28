// Initialize Firebase
var config = {
    apiKey: "AIzaSyB5FHhh6zfNwiU8ZFtphPOYfvsX3WzWddE",
    authDomain: "trainscheduler-b16a5.firebaseapp.com",
    databaseURL: "https://trainscheduler-b16a5.firebaseio.com",
    projectId: "trainscheduler-b16a5",
    storageBucket: "trainscheduler-b16a5.appspot.com",
    messagingSenderId: "513747344997"
};
firebase.initializeApp(config);

var database = firebase.database();

// Initial Values
var bus_name = "";
var destination = "";
var first-bus-time = "";
var frequency = 0;
var currentTime = moment();
var index = 0;
var busIDs = [];

// Show current time
var datetime = null,
    date = null;

var update = function () {
    date = moment(new Date())
    datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
};

$(document).ready(function(){
    datetime = $('#current-status')
    update();
    setInterval(update, 1000);
});



$("#add-bus").on("click", function() {


    bus_name = $("#bus-name").val().trim();
    destination = $("#destination").val().trim();
    ffirst-bus-time = $("#bus-time").val().trim();
    frequency = $("#frequency").val().trim();


    var firstTimeConverted = moment(first-bus-time, "hh:mm").subtract(1, "years");



    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");



    var tRemainder = diffTime % frequency;
    //console.log(tRemainder);


    var minutesAway = frequency - tRemainder;
    //console.log("Minutes away: " + minutesAway);


    var nextBus = moment().add(minutesAway, "minutes");
    //console.log("Arrival time: " + moment(nextBus).format("hh:mm"));


    var nextArrival = moment(nextBus).format("hh:mm a");

    var nextArrivalUpdate = function() {
        date = moment(new Date())
        datetime.html(date.format('hh:mm a'));
    }

    // Code for  push
    database.ref().push({
        bus_name: busName,
        destination: destination,
        first-bus-time: firstBusTime,
        frequency: frequency,
        minutesAway: minutesAway,
        nextArrival: nextArrival,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    alert("Form submitted!");


    $("#bus-name").val("");
    $("#destination").val("");
    $("#bus-time").val("");
    $("#frequency").val("");


    return false;
});


database.ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function(snapshot) {


    console.log("Bus name: " + snapshot.val().busName);
    console.log("Destination: " + snapshot.val().destination);
    console.log("First bus: " + snapshot.val().firstBusTime);
    console.log("Frequency: " + snapshot.val().frequency);
    console.log("Next bus: " + snapshot.val().nextArrival);
    console.log("Minutes away: " + snapshot.val().minutesAway);
    console.log("==============================");



    $("#new-bus").append("<tr><td>" + snapshot.val().busName + "</td>" +
        "<td>" + snapshot.val().destination + "</td>" +
        "<td>" + "Every " + snapshot.val().frequency + " mins" + "</td>" +
        "<td>" + snapshot.val().nextArrival + "</td>" +
        "<td>" + snapshot.val().minutesAway + " mins until arrival" + "</td>" +
        "</td></tr>");

    index++;


}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


database.ref().once('value', function(dataSnapshot){
    var busIndex = 0;

    dataSnapshot.forEach(
        function(childSnapshot) {
            busIDs[busIndex++] = childSnapshot.key();
        }
    );
});

console.log(busIDs);

