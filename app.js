// variables:
let userScore = 0;
let computerScore = 0;
let language = "eng";

//DOM variables
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
//querySelector => returns the first element within the document that matches the specified selector, or group of selectors. If no matches are found, null is returned.
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");
const pt_div = document.getElementById("pt");
const eng_div = document.getElementById("eng");
const header_h1 = document.querySelector("header > h1");
const badgeUser_div = document.getElementById("user-label");
const badgeComp_div = document.getElementById("computer-label");
const actionMsg_p = document.getElementById("action-message");
const hint_h1 = document.querySelector(".wrapper > h1");
const pt_btn = document.getElementById("pt");
const eng_btn = document.getElementById("eng");



// --------------------Functions------------------------

function getComputerChoice() {

    const choices = ['r', 'p', 's'];

    //Math.random returns a randon number between 0 and 1, so we just need to multiply the returned value for the number of options we have (3)
    //Then we just need the result to be a whole number (integer), and we do that using Math.floor
    const randomNumber = Math.floor(Math.random() * 3);

    //return one of the three options
    return choices[randomNumber];
}



function convertToWord(letter, lang) {

    if (lang === "eng") {
        if (letter === "r") return "Rock";
        if (letter === "p") return "Paper";
        return "Scissors";
    } else {
        if (letter === "r") return "Pedra";
        if (letter === "p") return "Papel";
        return "Tesoura";
    }
}


function getMessage(user, comp, lang) {

    //to change the font-size of something in javascript, just write: .fontsize($number);
    //.sup() => it superscripts the string (pushes the string a litlle bit higher comparing to the line)
    const smallUserWord = "user".fontsize(3).sup();
    const smallCompWord = "comp".fontsize(3).sup();
    const smallUserPt = "jogador".fontsize(3).sup();
    const smallCompPt = "pc".fontsize(3).sup();
    let userFirst = true;
    let message = "";

    //checks the lang option
    if (lang === "eng") {
        
        //Rock crushes Scissors
        //Scissors cuts Paper
        //Paper covers Rock
        switch (user + comp) {

            //wins:
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
                // if the user loses, it won't display what the user picked first
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

        //returns the message (eng)
        if (userFirst === true) {  

            return `${convertToWord(user, lang)}${smallUserWord} ${message} ${convertToWord(comp, lang)}${smallCompWord}.`;
        } else {
    
            return `${convertToWord(comp, lang)}${smallCompWord} ${message} ${convertToWord(user, lang)}${smallUserWord}.`;
        }

    } else {

        //Pedra quebra Tesoura
        //Tesoura corta Papel
        //Papel embrulha Pedra
        switch (user + comp) {

            //wins first:
            case "rs":
                //Pedra quebra Tesoura
                message = "quebra";
                break;

            case "sp":
                //Tesoura corta Papel
                message = "corta";
                break;

            case "pr":
                //Papel embrulha Pedra
                message = "embrulha";
                break;


            //losts:
            case "sr":
                //Pedra quebra Tesoura
                message = "quebra";
                userFirst = false;
                break;

            case "ps":
                //Tesoura corta Papel
                message = "corta";
                userFirst = false;
                break;

            case "rp":
                //Papel embrulha Pedra
                message = "embrulha";
                userFirst = false;
                break;


            //draws:
            case "rr":
                message = "é igual a";
                break;

            case "ss":
                message = "é igual a";
                break;

            case "pp":
                message = "é igual a";
                break;
        }

        //returns the message (pt)
        if (userFirst === true) {
            return `${convertToWord(user, lang)}${smallUserPt} ${message} ${convertToWord(comp, lang)}${smallCompPt}.`;
        } else {
            return `${convertToWord(comp, lang)}${smallCompPt} ${message} ${convertToWord(user, lang)}${smallUserPt}.`;
        }
    }
}


function win(userChoice, computerChoice, lang) {

    const userChoice_div = document.getElementById(userChoice);

    userScore ++;
    
    //update the user score on the page
    userScore_span.innerHTML = userScore;
    //update the comp score on the page
    // computerScore_span.innerHTML = computerScore;

    //Displays the message of who won in the result_p element depending on the lang selected
    if (lang === "eng") {
        result_p.innerHTML = `${getMessage(userChoice, computerChoice, lang)} You win!`;
    } else {
        result_p.innerHTML = `${getMessage(userChoice, computerChoice, lang)} Você venceu!`;
    }

    //when the user wins, it adds a green-glow to the border of the option picked
    //.classList: returns an array with all the classes that element has, and with .add, we can add another class to it
    userChoice_div.classList.add('green-glow');

    //it uses the function setTimeout to add a delay before removing the green border 
    setTimeout(function() {userChoice_div.classList.remove('green-glow'); }, 500);
}


function lose(userChoice, computerChoice, lang) {

    const userChoice_div = document.getElementById(userChoice);

    computerScore ++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;


    if (lang === "eng") {
        result_p.innerHTML = `${getMessage(userChoice, computerChoice, lang)} You lost...`;
    } else {
        result_p.innerHTML = `${getMessage(userChoice, computerChoice, lang)} Você perdeu...`;
    }


    //adds the glow to the user choice
    userChoice_div.classList.add('red-glow');

    // better way of writing a function that only occupies one line:
    setTimeout(() => userChoice_div.classList.remove('red-glow'), 500);
}



function draw(userChoice, computerChoice, lang) {

    const userChoice_div = document.getElementById(userChoice);

    if (lang === "eng") {
        result_p.innerHTML = `${getMessage(userChoice, computerChoice, lang)} It's a draw!`;
    } else {
        result_p.innerHTML = `${getMessage(userChoice, computerChoice, lang)} Empatou!`;
    }
    
    userChoice_div.classList.add('gray-glow');
    setTimeout(() => userChoice_div.classList.remove('gray-glow'), 500);
}


function changeLang(lang) {
    
    switch (lang) {

        case "pt":

            //element.classList.contains(class) => checks if the element has a class applied to it
            if (pt_div.classList.contains('active') === false) {
                pt_div.classList.add('active');
                eng_div.classList.remove('active');
                //updates the variable that's outside this function
                language = "pt";
            }
            break;


        case "eng":

            if (eng_div.classList.contains('active') === false) {
                eng_div.classList.add('active');
                pt_div.classList.remove('active');
                language = "eng";
            }
            break;
    }

    // Updates the text that's on the page depending on the language selected
    switch (language) {
        case "pt":
            
            header_h1.innerHTML = "Pedra Papel Tesoura";
            badgeUser_div.innerHTML = "jogador";
            badgeComp_div.innerHTML = "pc";
            result_p.innerHTML = "Papel embrulha Pedra. Você venceu!";
            actionMsg_p.innerHTML = "Faça sua jogada:";
            hint_h1.innerHTML = "Selecione o idioma";
            pt_btn.innerHTML = "Português";
            eng_btn.innerHTML = "Inglês";
            break;
        
        case "eng":
            
            header_h1.innerHTML = "Rock Paper Scissors";
            badgeUser_div.innerHTML = "user";
            badgeComp_div.innerHTML = "comp";
            result_p.innerHTML = "Paper covers rock. You win!";
            actionMsg_p.innerHTML = "Make your move:";
            hint_h1.innerHTML = "Select your language";
            pt_btn.innerHTML = "Portuguese";
            eng_btn = "English";
            break;
    }
}


function game(userChoice, lang) {

    const ComputerChoice = getComputerChoice();
    
    // Compares both choices
    switch (userChoice + ComputerChoice) {

        //user wins:
        case "rs":
        case "pr":
        case "sp":
            win(userChoice, ComputerChoice, lang);
            break;
        
        //user loses:
        case "rp":
        case "ps":  
        case "sr":
            lose(userChoice, ComputerChoice, lang);
            break;
        

        //draw:
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice, ComputerChoice, lang);
            break;
    }
}

function main() {

    //changes the language when one of those divs gets clicked on
    pt_div.addEventListener('click', () => changeLang("pt"));
    eng_div.addEventListener('click', () => changeLang("eng"));

    //runs the game function with the option selected by the user
    rock_div.addEventListener('click', () => game("r", language));
    paper_div.addEventListener('click', () => game("p", language));
    scissors_div.addEventListener('click', () => game("s", language)); 
}

//runs the main function (executes the entire game)
main();