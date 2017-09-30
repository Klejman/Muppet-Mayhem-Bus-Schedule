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
var bus_name;
var destination;
var firstBusTime;
var frequency;
var submit;
var new_bus;

$("#submit").on("click", function(event){

    //prevents default button event
    event.preventDefault();

    //updates variables based on the text within the input fields
    bus_name = $("#bus_name").val().trim();
    destination = $("#destination").val().trim();
    firstBusTime = $("#firstBusTime").val().trim();
    frequency = $("#frequency").val().trim();

    //all input values must be filled
    if (bus_name === "" || destination === "" || firstBusTime === "" || frequency === "") {
        console.log("first");


        alert("All fields must be entered");
        //time data must be in correct format in input
    } else if (moment(firstBusTime,"HH:mm",true).isValid() && (frequency%1) === 0) {
        //pushes data to the firebase database
        var inputPush= {
            bus_name,
            destination,
            firstBusTime,
            frequency,
            determinetimeAdded: firebase.database.ServerValue.TIMESTAMP
        };

        database.ref().push(inputPush);
        $("input").val("");
    }
    else {
        alert("Please enter in the the time in the format specified");
    }

});


database.ref().orderByChild("determinetimeAdded").on("child_added", function(snapshot) {

    var snapshotData = snapshot.val();

    var currentTime = moment();


    var firstBus = moment(snapshotData.firstBusTime, "HH:mm");

    //uses the data to calculate time until next train and the time of the next train
    var diffTime = moment().diff(firstBus, "minutes");
    var timeRemainder = diffTime % snapshotData.frequency;
    var minutesUntilBus = snapshotData.frequency - timeRemainder;
    var nextBus = moment().add(minutesUntilBus,"minutes");

    //dynamically created
    var newRow = $("<tr>");


    var newBusNameData = $("<td>");
    var newDestinationData = $("<td>");
    var newFrequencyData = $("<td>");
    var nextArrivalData = $("<td>");
    var minutesAwayData = $("<td>");


    newBusNameData.append(snapshotData.bus_name);
    newDestinationData.append(snapshotData.destination);
    newFrequencyData.append(snapshotData.frequency);
    nextArrivalData.append(moment(nextBus).format("HH:mm"));
    minutesAwayData.append(minutesUntilBus);


    newRow.append(newBusNameData, newDestinationData,  newFrequencyData, nextArrivalData, minutesAwayData);


    $("tbody").append(newRow);
});

