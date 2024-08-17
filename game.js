var buttonColours = ["red", "blue", "green", "yellow"];  /* creating array */

var gamePattern = [];

var userClickedPattern = [];

var gameStarted = false;  // Variable to track if the game has started

var level = 0;

$(document).keypress(function() {
    if (!gameStarted) {  // Check if the game has not started
        $("#level-title").text("Level " + level); // Update the title to "Level 0"
        nextSequence();  // Call the nextSequence function
        gameStarted = true;  // Set gameStarted to true so nextSequence() is not called again
    }
});

$(".btn").click(function() {  // Detect button clicks
    var userChosenColour = $(this).attr("id");  // Get the id of the clicked button
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);

    playSound(userChosenColour);

    animatePress(userChosenColour);  // currentColor is changed to userChoosenColor

    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel) {
    // Check if the most recent user answer matches the game pattern
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");  // Log success for debugging
        // Check if the user has completed the sequence
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();  // Move to the next sequence after 1 second
            }, 1000);
        }
    } else {
        console.log("wrong");  // Log wrong for debugging
        // Additional code to handle game over
        playSound("wrong");  // Play the wrong sound

        $("body").addClass("game-over");  // Add the game-over class

        setTimeout(function() {
            $("body").removeClass("game-over");  // Remove the game-over class after 200ms
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");  // Update the title

        startOver();  // Call startOver() to reset the game
    }
}

function nextSequence() {

    userClickedPattern = []; // Reset userClickedPattern , Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.

    level++;  // Increment level at the start of each sequence
    $("#level-title").text("Level " + level);  // Update the title with the new level

    var randomNumber = Math.floor(Math.random() * 4);  /* tere is diffrence between math and Math , also for floor and round */
    var randomChosenColour = buttonColours[randomNumber]; /* for selecting random color */
    gamePattern.push(randomChosenColour); /* adding random color to gamePattern */

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100); /* Animation */

    playSound(randomChosenColour);

}

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");  // Add the "pressed" class

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");  // Remove the "pressed" class after 100 milliseconds
    }, 100);
}

function startOver() {
    level = 0;  // Reset the level
    gamePattern = [];  // Clear the game pattern
    gameStarted = false;  // Set gameStarted to false
}

/* 
Selecting Elements by ID vs. Class
"#" + currentColour:

Purpose: This selects an element by its ID.
Example: If currentColour is "green", then "#" + currentColour results in "#green". This targets an element with the ID green (e.g., <button id="green" class="btn">Green</button>).
Uniqueness: IDs are unique within a page, so "#green" will select a single element with that ID. This is useful when you want to apply styles or effects to a specific element.
".btn":

Purpose: This selects all elements with the class btn.
Example: ".btn" would select every element that has the class btn, regardless of the specific button (e.g., <button id="red" class="btn">Red</button> and <button id="blue" class="btn">Blue</button>).
Non-specific: If you used ".btn", you would affect all elements with the class btn, not just the one that was clicked.
*/