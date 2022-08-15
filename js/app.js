let firstValue = '';
let secondValue = '';
let operation = '';
let firstValueExist = false;
let displayValue = document.querySelector('.curientValue');
let inputButton = document.querySelectorAll('.numbers');
inputButton.forEach( button => {
    button.addEventListener("mouseup", event => {addNumber(event)})
})
let removeNumberButton = document.querySelector('#removeNumber');
removeNumberButton.addEventListener("mouseup", remuveNumber);
let operationButton = document.querySelectorAll('.operation');
operationButton.forEach( button => {
    button.addEventListener("mouseup",  event => {addOperation(event)});
})
let minusSelect = false;
let minusicon = document.querySelector('.plusMinus')
let minusButton = document.querySelector('#minusValue');
minusButton.addEventListener("mouseup", () => {
    if (!minusSelect) {
        minusSelect = true;
        return display()
    } 
    if (minusSelect) {
        minusSelect = false;
        return display()
    };   
})

let equalsButton = document.querySelector('#equals');
equalsButton.addEventListener("mouseup", equals)

function isNegativ() {
    if (!minusSelect) return
    if (minusSelect && !firstValueExist) return firstValue *= -1;
    if (minusSelect && firstValueExist) return secondValue *= -1;
}

function addNumber(event) {    
    if (!firstValueExist) firstValue += event.target.value;
    if (firstValueExist) secondValue += event.target.value;    
    display()
}

function remuveNumber() { 
    if (!firstValueExist) firstValue = firstValue.slice(0, -1);
    if (firstValueExist) secondValue = secondValue.slice(0, -1);
    display()
}

function addOperation(event) {
    isNegativ()
    if (!firstValueExist && !firstValue) return
    if (!firstValueExist  && firstValue) {
        firstValueExist = true;
        operation = event.target.value;
    }
    if (firstValueExist) {
        calculate()
        operation = event.target.value;
    }
    minusSelect = false
}

function equals() {
    isNegativ()
    minusSelect = false
    if (firstValueExist && secondValue) return calculate()
    if (firstValueExist && !secondValue) return displayResult()
}

function calculate() {
    if (!operation) return;
    if (operation === 'plus') addition();
    if (operation === 'minus') subtraction();
    if (operation === 'multiply') multiplication();
    if (operation === 'divide') division();
    secondValue = '';
    displayResult()
}

function addition() {
    return firstValue = (firstValue * 1) + (secondValue * 1);
}

function subtraction() {
    return firstValue = (firstValue*1) - (secondValue * 1);
}

function multiplication() {
    return firstValue = (firstValue*1) * (secondValue * 1);
}

function division() {
    return firstValue = (firstValue*1) / (secondValue * 1);
}

function display() {
    if (!firstValueExist) displayValue.textContent = firstValue;
    if (firstValueExist) displayValue.textContent = secondValue;
    if (minusSelect) minusicon.style.opacity = '1';
    if (!minusSelect) minusicon.style.opacity = '0';
}

function displayResult() {
    displayValue.textContent = firstValue;
    if (minusSelect) minusicon.style.opacity = '1';
    if (!minusSelect) minusicon.style.opacity = '0';
}