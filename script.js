//==================================================================
// Taemin Lee
// June 26th, 2024
//
// This is a Javascript for implementation of calculator function.
//==================================================================

// variables for storing the operands and operator
let op1 = '';
let operator = '';
let op2 = '';

// variable to check the specific sequence of the calculator 
// sequence: digit -> = -> digit || digit -> = -> operator -> digit
let eql = '';

//==================================================================
// add, subtract, multiply, and divide
//
// These are basic four functions so that calculator can actaully
// operate. For divide function, an error message will be displayed
// if operand2 is taken as 0.
//
// Parameters: a, b (operands)
// Return: 
//    - integer 
//    - string (error message)
//==================================================================

function add(a, b){
    return a + b;
};

function subtract(a, b){
    return a - b;
};

function multiply(a, b){
    return a * b;
};

function divide(a, b){
    // when the denominator == 0, it returns the error message
    if (b === 0) {
        return "Bruh";
    }
    return a / b;
};

// create variables to grab the elements from html
const display = document.querySelector(".display");
const digitBtn = document.querySelectorAll(".digit");
const oprBtn = document.querySelectorAll(".operator");

//==================================================================
// handleDigits & eventListener (Digit)
//
// This function stores the digits that are clicked and store them 
// into the operands. After storing all the values to the operand, 
// it will display the values according to the string values we 
// accumulated.
//
// Parameters: 
//    - digit buttons
// Return: none (displays operands)
//==================================================================

function handleDigits(digits, eql){
    // displays the digit I clicked instead of the default display
    if (display.textContent === "0" && digits === "0"){
        return;
    }

    // if operator exists, we take the digit to op1
    // O/w, we take the digit to op2
    if (eql === '' && operator === ''){
        op1 += digits;
        display.textContent = op1;
    } else if (op1 !== '' && eql !== '' && operator === '') {
        op1 = '';
        op1 += digits;
        display.textContent = op1;
    } else {
        op2 += digits;
        display.textContent = op2;
    }
}

digitBtn.forEach(button => {
    button.addEventListener("click", () => 
        handleDigits(button.textContent, eql)
    );
});

//==================================================================
// eventListener (operator)
//
// This anonymous function stores the operator value as a string.
// If the second operand is defined, it will call the operate function
// and display the result.
//
// Parameters: 
// - event: The event object containing details about the click event.
// Return: none (displays the result of operate function)
//==================================================================

oprBtn.forEach(button => {
    button.addEventListener("click", (event) => {
        if (op2 != ''){
            // update the global variables and display op1 (result)
            op1 = operate(op1, op2, operator);
            display.textContent = op1;
            op2 = '';
            operator = '';
        }
        // store the operator (string)
        operator = event.target.textContent;
    });
});


//==================================================================
// operate
//
// This function takes the operands and operator and convert them
// into integers to implement the calculations by calling one of the
// basic calculating functions according to the operator received.
//
// Then, it takes the result of the calculation to op1, and sets other
// variables as empty string.
//
// Parameters: op1, op2, operator - (string)
//
// Return: op1 (integer)
//==================================================================

function operate(op1, op2, operator){
    // convert the text to integer
    op1 = parseInt(op1);
    op2 = parseInt(op2);

    // implements the calculation
    if (operator === "+"){
        op1 = add(op1, op2);
    } else if (operator === "-"){
        op1 = subtract(op1, op2);
    } else if (operator === "*"){
        op1 = multiply(op1, op2);
    } else if (operator === "/"){
        op1 = divide(op1, op2);
    }

    // return the result
    return op1;
};

//==================================================================
// Anonymous function (clear)
//
// This function clears up all the variables and set the calculator
// to the default display - 0.
//
// Parameters: AC button
// Return: none - (displays 0)
//==================================================================
const clearBtn = document.querySelector(".reset");

clearBtn.addEventListener("click", () => {
    op1 = '';
    op2 = '';
    operator = '';
    eql = '';
    display.textContent = "0";
});

//==================================================================
// Anonymous function (=)
//
// This function displays the result of the calculation.
//
// Parameters: = button 
// Return: none = (displays the result from operate function)
//==================================================================
const resultBtn = document.querySelector(".result");

resultBtn.addEventListener("click", () => {
    // if result button is clicked without the second operand, 
    // implement the function byitself
    if (op1 !== '' && operator !== '' && op2 === '') {
        op2 = op1;
        op1 = operate(op1, op2, operator);
        display.textContent = op1;
        op2 = '';
        operator = '';
    } else if (op1 !== '' && operator === '' && op2 === ''){
        eql = op1;
        display.textContent = eql;
    } else {
        display.textContent = operate(op1, op2, operator);
    }
});