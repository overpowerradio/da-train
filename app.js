console.log("hey boddy dude");


// Initialize Firebase
 var config = {
    apiKey: "AIzaSyDpzGMYvhuRNLAXaztW_ZNHJ5jb8fCxQOc",
    authDomain: "i-hear-my-train.firebaseapp.com",
    databaseURL: "https://i-hear-my-train.firebaseio.com",
    projectId: "i-hear-my-train",
    storageBucket: "",
    messagingSenderId: "334280666937"
  };

  firebase.initializeApp(config);

var database = firebase.database();

$("#addTrain").on("click", function(event) {
	event.preventDefault();

	var trainName = $("#name-input").val();
	var destination = $("#destination").val();
	var frequency = $("#frequency").val();
	var firstTrain = $("#firstTrain").val();
	

	var newTrain = {
		train: trainName,
		destination: destination,
		frequency: frequency,
		firsttrain: firstTrain
	};

	console.log(newTrain);
	console.log("hey buddy");

	database.ref().push(newTrain);
});

database.ref().on("child_added", function(childSnapshot) {

var trainName = childSnapshot.val().train;
var destination = childSnapshot.val().destination;
var frequency = childSnapshot.val().frequency;
var firstTrain = childSnapshot.val().firsttrain;

	var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
	console.log(firstTimeConverted);

	// Difference between times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

	// Time apart (remainder)
	var tRemainder = diffTime % frequency;
	console.log(tRemainder);

	// Mins until train
	var tMinutesTillTrain = frequency - tRemainder;
	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	// Next train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
	// console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


console.log(trainName);



$("#trainInfo").prepend("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + firstTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});

	

