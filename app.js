// variables:
let userScore = 0;
let computerScore = 0;

//DOM variables
//caching the DOM
//to show to our document (DOM):
//to do that, we use the id of the html element!
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".socre-board");
// ".result > p" because the text we want to change is inside a p tag!!
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

//some change!!!!


// --------------------Functions------------------------

function getComputerChoice() {

    const choices = ['r', 'p', 's'];

    //Math is a object that's already built in JavaScript, and one of its methods is a method called random. This method gives us a random number between 0 and 1, never reaching 1, like this:
    //0.3412835707114079
    //0.7092038094188242
    //and so on...
    //but, that still doesn't help us, we'd need a random number between 0, 1 and 2
    //so, if we multiply the random number by 3, it'll always be a random number between 0, 1 and 2, never reaching three!
    //let's say you need to get a random number between 0 and 11, you just need to do this:
    //Math.random() * 12;
    //it'll never reach 12, and so you'll get a random number between 0 and 11!

    //now, we just need to round the integer to be a whole number, like this:
    //Math.floor(Math.random() * 3);

    //floor method: The Math.floor() function returns the largest integer less than or equal to a given number.

    //store the random number in a variable
    const randomNumber = Math.floor(Math.random() * 3);

    //return one of the three options
    return choices[randomNumber];
}



function convertToWord(letter) {
    // a easier way to write if/else statements:
    if (letter === "r") return "Rock";
    if (letter === "p") return "Paper";
    return "Scissors";
}


function getMessage(user, comp) {

    //to change the font-size of something in javascript, just write: .fontsize($number);
    //the sup(); / sub(); methods:
    //they supscript or subscript some text (supscript = moves half a line up, comparing to the text on its line), and (subscript = moves half a line down, comparing to the text on its line)
    const smallUserWord = "user".fontsize(3).sup();
    const smallCompWord = "comp".fontsize(3).sup();
    let userFirst = true;
    let message = "";

    //Rock crushes Scissors
    //Scissors cuts Paper
    //Paper covers Rock
    switch (user + comp) {

        //wins first:
        case "rs":
            //Rock crushes Scissors
            message = "crushes";
            break;
        
        case "sp":
            //Scissors cuts Paper
            message = "cuts";
            break;    
    
        case "pr":
            //Paper covers Rock
            message = "covers";
            break;
    

        //losts:
        case "sr":
            //Rock crushes Scissors
            message = "crushes";
            userFirst = false;
            break;
        
        case "ps":
            //Scissors cuts Paper
            message = "cuts";
            userFirst = false;
            break;    
    
        case "rp":
            //Paper covers Rock
            message = "covers";
            userFirst = false;
            break;

        
        //draws:
        case "rr":
            message = "equals";
            break;
        
        case "ss":
            message = "equals";
            break;    
    
        case "pp":
            message = "equals";
            break;
    }

    if (userFirst === true) {  

        return `${convertToWord(user)}${smallUserWord} ${message} ${convertToWord(comp)}${smallCompWord}.`;
    } else {

        return `${convertToWord(comp)}${smallCompWord} ${message} ${convertToWord(user)}${smallUserWord}.`;
    }
}



// set timeout function example:
//it'll wait 3s until it executes the function
// setTimeout(function() { console.log("Hello")}, 3000);
function win(userChoice, computerChoice) {

    const userChoice_div = document.getElementById(userChoice);

    //the first thing we want to do is increase the user score, cause he won!
    userScore ++;
    
    //update the user score on the page
    userScore_span.innerHTML = userScore;
    //update the comp score on the page
    computerScore_span.innerHTML = computerScore;

    //now we display the message of who won in the result_p element:
    //what I wrote:
    // result_p.innerHTML = convertToWord(userChoice) + " beats " + convertToWord(ComputerChoice) +". You win! ";
    //a better way of writing strings and functions/variables in the same line, using backticks (`):
    //result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} beats  ${convertToWord(computerChoice)}${smallCompWord}. You won!`;
    result_p.innerHTML = `${getMessage(userChoice, computerChoice)} You win!`;

    //when the user wins, add a green-glow to the border of the option picked!!
    //to do that, were just gonna add a class of .green-glow to whichever div the user clicked on
    // method classList: returns an array with all the classes that element has, and with .add, we can add another class to it.
    userChoice_div.classList.add('green-glow');

    //but how do we set the border green, and then turn it back to white right after?
    //we do that, using a set timeout function in JavaScript
    // so now, we'll just wait a bit, and then remove that class we just added
    //to remove a class of a html element, we just need to use the method .remove
    setTimeout(function() {userChoice_div.classList.remove('green-glow'); }, 500);
}


function lose(userChoice, computerChoice) {

    const userChoice_div = document.getElementById(userChoice);

    computerScore ++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;

    // result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} loses to  ${convertToWord(computerChoice)}${smallCompWord}. You lost...`;
    result_p.innerHTML = `${getMessage(userChoice, computerChoice)} You lost...`;

    //adds the glow to the user choice
    userChoice_div.classList.add('red-glow');

    // better way of writing a function that only occupies one line:
    setTimeout(() => userChoice_div.classList.remove('red-glow'), 500);
}



function draw(userChoice, computerChoice) {

    const userChoice_div = document.getElementById(userChoice);
    
    // result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} equals  ${convertToWord(ComputerChoice)}${smallCompWord}. It's a draw!`;
    result_p.innerHTML = `${getMessage(userChoice, computerChoice)} It's a draw!`;
    
    //adds the glow to the user choice
    userChoice_div.classList.add('gray-glow');
    setTimeout(() => userChoice_div.classList.remove('gray-glow'), 500);
}



function game(userChoice) {

    const ComputerChoice = getComputerChoice();
    
    //now we need to compare both choices
    switch (userChoice + ComputerChoice) {

        //cases when the user wins:
        //yeah, I know, this way of writing the cases is way easier than what I used to do ;)
        case "rs":
        case "pr":
        case "sp":
            win(userChoice, ComputerChoice);
            break;
        
        //cases when the user loses:
        case "rp":
        case "ps":  
        case "sr":
            lose(userChoice, ComputerChoice);
            break;
        

        //draw:
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice, ComputerChoice);
            break;
    }
}


// now, everytime the user clicks on one of the option images, we need to store the value of the option they picked, and then later on compare it to the computer choice
function main() {

    //old way of writing the one line function:
    //rock_div.addEventListener('click', function() {
    //     game("r");
    // })

    //new/better way:
    rock_div.addEventListener('click', () => game("r"));
    
    paper_div.addEventListener('click', () => game("p"));
    
    scissors_div.addEventListener('click', () => game("s"));
}

//runs the main function (executes the entire game)
main();