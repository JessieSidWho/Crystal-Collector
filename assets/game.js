/* 

- What Variables are needed?
  + Total
  + Target
  + Win
  + Loss
  + Each Random Button
  + * intervalID *

- What functions are needed?
  + Random number for Target
  + Random number for each button
  + Reset function
  + Updating the total
  + Win/lose situation
  + * Add a timer (if you finish early) *
    -- Run()
    --Decrement??

- What event handlers are needed?
  + what happens when you click a button?

-What functions need to be called?
  + Reset on page load

*/


$(document).ready(function(){
   
    // Variables Needed
    let crystalOne;
    let crystalTwo;
    let crystalThree;
    let crystalFour;
    let total = 0;
    let target = 0;
    let wins = 0;
    let losses = 0;
    let intervalId;
    let number = 61;

    // Function for setting a random target
    function setTarget() {
      let upperLimitScore = 120;
      let lowerLimitScore = 19;
      target = Math.floor(Math.random() * (upperLimitScore-lowerLimitScore)) + lowerLimitScore;
      $("#target").html("Target: " + target);
      // console.log(target);
    }

    // Function for updating the total
    function updateTotal (){
      total += $(this).data("data-value");
      $("#total").html("Total: " + total);
      if (total >= target) {
        winLose();
      }
    }

    // Function for a random crystal value
    function crystalRandom() {
      let crystalCeiling = 12;
      let crystalFloor = 2;
      let crystalValue = Math.floor(Math.random() * (crystalCeiling - crystalFloor)) + crystalFloor;
      return crystalValue;
    }  

    // Function for resetting the game
    function initializeReset (){
      crystalOne = $("[data-id=1]");
      crystalOne.data("data-value", crystalRandom()); 
    //   console.log("Crystal 1: " + crystalOne.data("data-value"));
      crystalTwo = $("[data-id=2]");
      crystalTwo.data("data-value", crystalRandom()); 
    //   console.log("Crystal 2: " + crystalTwo.data("data-value"));
      crystalThree = $("[data-id=3]");
      crystalThree.data("data-value", crystalRandom()); 
    //   console.log("Crystal 3: " + crystalThree.data("data-value"));
      crystalFour = $("[data-id=4]");
      crystalFour.data("data-value", crystalRandom()); 
    //   console.log("Crystal 4: " + crystalFour.data("data-value"));
      setTarget();

      clearInterval(intervalId);
      intervalId = setInterval(decrement, 1000);
      
      total = 0;
      number = 61;
    //   console.log("Target: " + target);
      $("#total").html("Total: " + total);
      $("#wins").html("Wins: " + wins);
      $("#losses").html("Losses: " + losses);
    }


    // Function for win or lose situation
    function winLose() {
      if (total === target) {
        wins++;
        $("#wins").html("Wins: " + wins);
        // console.log("You win!");
      } else {
        losses++;
        $("#losses").html("Losses: " + losses);
        // console.log("You lose!");
      }
      initializeReset(); 
    }

    // timer

    function decrement() {
        number--;
  
        if (number > 9) {
          $("#timer").html("00:" + number);
        } else if (number < 10) {
          $("#timer").html("00:0" + number);  
        }
  
        if (number === 0) {
            losses++;
          initializeReset();
        }
      }
      

    // Event Handlers for button clicks
    $(".btn").on("click", updateTotal);

    // Call the reset on game load
    initializeReset(); 
    
})