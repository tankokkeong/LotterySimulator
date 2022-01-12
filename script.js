//Generate Results poor
var results_pool = [];
var click_time = 0;

function tryLuck(){
    results_pool = [];

    var input = document.getElementById("my-number-input").value.trim();
    var error_prompt = document.getElementById("error-prompt");
    var digit_validation = /^[0-9]+$/;

    if(input.length == 4 && digit_validation.test(input)){
        generateResultsPool();
        printResults();
        error_prompt.innerHTML = "";
        checkWin();
        tryTimes();
    }
    else{
        error_prompt.innerHTML = "Please enter a 4-digit number!";
    }
    
}

function generateResultsPool(){

    if(results_pool.length == 23){
        return;
    }

    var random_number = numberFormatter(Math.floor((Math.random() * 10000)));

    if(checkNumberExists(random_number) == 0){
        results_pool.push(random_number);
    }
    else{
        generateResultsPool();
    }

    if(results_pool.length != 23){
        generateResultsPool();
    }
}

function numberFormatter(number){
    
    number = String(number);
    
    var run_times = 4 - number.length;

    for(var i = 0; i < run_times; i++){
        number = "0" + number;
    }

    return number;
}

function checkNumberExists(number){

    var exist = 0;

    for(var i = 0; i < results_pool.length; i++){
        
        //Checking
        if(results_pool[i] == number){
            exist++;
        }
    }

    return exist;
}

function printResults(){
    var results_number = document.getElementsByClassName("result-number");

    for(var i = 0; i < results_number.length; i++){
        results_number[i].innerHTML = results_pool[i];
    }
}

function inputFormatter(){
    var input =  document.getElementById("my-number-input");
    var digit_validation = /^[0-9]+$/;

    //digit validation
    if(digit_validation.test(input.value) == false){
        input.value = input.value.substring(0, input.value.length-1);
    }

    //4-digit validation
    if(input.value.length > 4){
        input.value = input.value.substring(0,4);
    }
}

function checkWin(){
    var input = document.getElementById("my-number-input").value;
    var prize_message = document.getElementById("prize-message");

    prize_message.innerHTML = "Loading...";

    if(checkNumberExists(input) == 1){

        checkWinPrize(input);
        showPopUp();

        setTimeout(function(){
            prize_message.innerHTML = "<span class='text-success'>You win a prize this time!<span>";
        }, 300);

    }
    else{
        setTimeout(function(){
            prize_message.innerHTML = "<span class='text-danger'>You didn't win a prize this time!<span>";
        }, 300);
    }
}

function closePopUp(){
    var popup_container = document.getElementById("popup-container");

    popup_container.style.display = "none";
}

function showPopUp(){
    var popup_container = document.getElementById("popup-container");

    popup_container.style.display = "";
}

function checkWinPrize(number){
    var message_text = document.getElementById("message-text");
    var prize_index = -1;

    for(var i = 0; i < results_pool.length; i++){
        
        //Checking
        if(results_pool[i] == number){
            prize_index = i;
        }
    }

    if(prize_index == -1){
        return;
    }
    else if(prize_index == 0){
        message_text.innerHTML = "You win the 1st Prize " + number + " (首獎) !";
    }
    else if(prize_index == 1){
        message_text.innerHTML = "You win the 2nd Prize " + number + " (二獎) !";
    }
    else if(prize_index == 2){
        message_text.innerHTML = "You win the 3rd Prize " + number + " (三獎) !";
    }
    else if(prize_index > 2 && prize_index <= 12){
        message_text.innerHTML = "You win the Special Prize " + number + " (特別獎) !";
    }
    else{
        message_text.innerHTML = "You win the Consolation Prize " + number + " (安慰獎) !";
    }
}

function tryTimes(){
    var try_times = document.getElementById("click-times");

    click_time++;

    if(click_time == 1){
        try_times.innerHTML = "You tried " + click_time + " time";
    }
    else{
        try_times.innerHTML = "You tried " + click_time + " times";
    }
}