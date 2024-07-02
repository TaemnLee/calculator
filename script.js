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
let lastAction = '';

const percentDenom = 100;
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
// updateDisplay
// 
// This function displays the current input of the calculator accordingly
// 
// Parameter: value
// Return: - none (updates the display)
//==================================================================

function updateDisplay (value) {
    if (typeof value === 'number') {
        value = value.toString();
    }

    if (value.length > 9) {
        // Truncate to 9 digits
        display.textContent = value.slice(0, 9);
    } else {
        display.textContent = value;
    }
}

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

function handleDigits(digits, eql) {
    // Keep the default display when only 0s are clicked
    if (display.textContent === "0" && digits === "0") {
        return;
    }
    deleteBtn.disabled = false;
    // When only digits are clicked
    if (eql === '' && operator === '' && (lastAction === '' || lastAction === 'dec' || lastAction === 'digit')) {
        if (op1 === '0' && digits !== '.') {
            op1 = digits; // Replace leading zero
        } else {
            op1 += digits;
        }
        updateDisplay(op1);
    // When digits are clicked if only operand1 and eql exist
    // Sequence: op1 -> =
    } else if (op1 !== '' && operator === '' && lastAction === "equal") {
        op1 = digits; // Start new number after equal
        updateDisplay(op1);
    // When digits are clicked after equal
    // Sequence: op1 -> opr -> op2 -> =
    } else if (op1 !== '' && operator !== '' && lastAction === "equal") {
        op1 = digits; // Start new number after equal
        updateDisplay(op1);
    // Sequence: op1 && operator -> dec -> 
    } else if (op1 !== '' && operator !== '' && lastAction === "dec") {
        if (op2 === '0' && digits !== '.') {
            op2 = digits; // Replace leading zero
        } else {
            op2 += digits;
        }
        updateDisplay(op2);
    // Sequence = -> dec -> 
    } else if (op1 === '' && operator !== '' && lastAction === "dec") {
        if (op1 === '0' && digits !== '.') {
            op1 = digits; // Replace leading zero
        } else {
            op1 += digits;
        }
        updateDisplay(op1);
    // When digits are clicked if only operator exists
    } else if (op1 === '' && operator !== '') {
        if (op1 === '0' && digits !== '.') {
            op1 = digits; // Replace leading zero
        } else {
            op1 += digits;
        }
        updateDisplay(op1);
    // When digits are clicked if only operand1 and operator exist
    } else {
        if (op2 === '0' && digits !== '.') {
            op2 = digits; // Replace leading zero
        } else {
            op2 += digits;
        }
        updateDisplay(op2);
    }
    lastAction = "digit";
}

digitBtn.forEach(button => {
    button.addEventListener("click", () => 
        handleDigits(button.textContent, eql)
    );
});

//==================================================================
// eventListener (percentage)
//
// This function divides the operands by 100 to represent the percentage.
//
// Parameter: none
// Return: -float
//==================================================================

const percentBtn = document.querySelector(".pcnt");

percentBtn.addEventListener("click", () => {
    if (op2 === '') {
        op1 = op1/percentDenom;
        updateDisplay(parseFloat(op1));
    } else {
        op2 = op2/percentDenom;
        updateDisplay(parseFloat(op2));
    }
    lastAction = "dec";
    decBtn.disabled = display.textContent.includes('.');
});

//==================================================================
// eventListener (+/-)
//
// This function changes the sign of the operands
//
// Parameter: none
// Return: - int/float
//==================================================================

const unsignedBtn = document.querySelector(".plusMin");

unsignedBtn.addEventListener("click", () => {
    if (op2 === '') {
        op1 = -op1;
        updateDisplay(parseFloat(op1));
    } else {
        op2 = -op2;
        updateDisplay(parseFloat(op2));
    }
});

//==================================================================
// eventListener (delete)
//
// This function deletes the last digit of the current operand.
// If the last digit is deleted, it returns the default display ("0")
//
// Parameter: none
// Return: - string
//==================================================================

const deleteBtn = document.querySelector(".remove");

deleteBtn.addEventListener("click", () => {
    if (op2 === '') {
        op1 = op1.slice(0, -1);
        if (op1 === '') {
            updateDisplay("0");
            deleteBtn.disabled = display.textContent.includes('0');
        } else {
            updateDisplay(parseFloat(op1));
        }
    } else {
        op2 = op2.slice(0, -1);
        if (op2 === '') {
            updateDisplay("0");
            deleteBtn.disabled = display.textContent.includes('0');
        } else {
            updateDisplay(parseFloat(op2));
        }
    }
});

//==================================================================
// eventListener (.)
//
// This function converts the current operand to decimal value
//
// Parameter: none
// Return: - float
//==================================================================

const decBtn = document.querySelector(".decimals");

decBtn.addEventListener("click", () => {
    // Append decimal point based on the lastAction
    if (lastAction === 'digit') {
        if (op2 === '') {
            op1 += '.';
            updateDisplay(op1);
        } else {
            op2 += '.';
            updateDisplay(op2);
        }
    } else if (lastAction === 'operator' || lastAction === 'equal' || lastAction === '') {
        // Default to '0.' for op1 if starting fresh or after an operator or equals
        if (op1 === '' || lastAction === '') {
            op1 = '0.';
            updateDisplay(op1);
        }
        // Default to '0.' for op1 after an equal
        else if (op2 === '' && operator === '' && lastAction === 'equal') {
            op1 = '0.';
            updateDisplay(op1);
        }
        // Default to '0.' for op2 after an operator
        else if (op2 === '' && operator !== '' && lastAction === 'operator') {
            op2 = '0.';
            updateDisplay(op2);
        }
    } 

    // Update lastAction to 'digit' because a decimal point is a numeric input
    lastAction = 'dec';
    // Disable the decimal button if there's already one in the display
    decBtn.disabled = display.textContent.includes('.');
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
        // when operator is clicked if op1, operator, and op2 exists
        if (op1 !== '' && operator !== '' && op2 !== ''){
            // update the global variables and display op1 (result)
            op1 = operate(op1, op2, operator);
            updateDisplay(op1);
            op2 = '';
            operator = '';
        // when operator is clicked only if op1 and operator exists AND sequence: opr -> digit
        } else if (op1 !== '' && operator !== '' && op2 === '' && lastAction === "digit") {
            switch (operator) {
                case '+':
                    // op1 remains the same
                    break;
                case '-':
                    op1 = -parseFloat(op1); // Change to the opposite sign
                    updateDisplay(op1);
                    break;
                case '*':
                case '/':
                    op1 = '0'; // Result should be 0
                    updateDisplay(op1);
                    break;
            }
        }
        // store the operator (string)
        operator = event.target.textContent;
        lastAction = "operator";
        decBtn.disabled = false;
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
    op1 = parseFloat(op1);
    op2 = parseFloat(op2);

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
    return parseFloat(op1.toPrecision(9));
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
    decBtn.disabled = false;
    lastAction = '';
    updateDisplay("0");
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
    // when = is clicked if only op1 and operator exists
    if (op1 !== '' && operator !== '' && op2 === '') {
        // Digit -> operator sequence
        if (lastAction === "digit"){
            switch (operator) {
                case '+':
                    // op1 remains the same
                    break;
                case '-':
                    op1 = -parseFloat(op1); // Change to the opposite sign
                    updateDisplay(op1);
                    break;
                case '*':
                case '/':
                    op1 = '0'; // Result should be 0
                    updateDisplay(op1);
                    break;
            }
        } else if (lastAction === "operator"){ // operator -> digit
            op2 = op1;
            op1 = operate(op1, op2, operator);
            updateDisplay(op1);
            op2 = '';
            operator = '';
        } 

    } // Sequence: op1 -> = 
    else if (op1 !== '' && operator === '' && op2 === ''){
        eql = op1;
        updateDisplay(eql);
    } else {
        op1 = operate(op1, op2, operator)
        updateDisplay(op1);
        op2 = '';
        operator = '';
    }
    decBtn.disabled = false;
    lastAction = "equal";
});