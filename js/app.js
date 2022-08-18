const NUMBER_OF_DIGITTS = 12;
let firstValue = '';
let secondValue = '';
let operation = '';
let firstValueExist = false;
let displayValue = document.querySelector('.curientValue');
let inputButton = document.querySelectorAll('.numbers');
inputButton.forEach( button => {
    button.addEventListener('mouseup', event => {addNumber(event)})
})
let removeNumberButton = document.querySelector('#removeNumber');
removeNumberButton.addEventListener('mouseup', remuveNumber);
let operationButton = document.querySelectorAll('.operation');
operationButton.forEach( button => {
    button.addEventListener('mouseup',  event => {addOperation(event)});
})
let minusSelect = false;
let minusicon = document.querySelector('.plusMinus')
let minusButton = document.querySelector('#minusValue');
minusButton.addEventListener('mouseup', () => {
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
equalsButton.addEventListener('mouseup', equals)
let CeCButton = document.querySelector('#CEC');
CeCButton.addEventListener('mouseup', CeC);
let onAcButton = document.querySelector('#OnAc');
OnAc.addEventListener('mouseup', allClear);
let overflowError = false;
let overflowErrorIcon = document.querySelector('.overflowError');
let squareRootButton = document.querySelector('#squareRoot');
squareRootButton.addEventListener('mouseup', squareRoot);
let procentButton = document.querySelector('#procent');
procentButton.addEventListener('mouseup', procent);

function isNegativ() {
    if (!minusSelect) return
    if (minusSelect && !firstValueExist) return firstValue *= -1;
    if (minusSelect && firstValueExist) return secondValue *= -1;
}

function isMInusSelect() {
    minusSelect ? minusicon.style.opacity = '1' : minusicon.style.opacity = '0';
}

function addNumber(event) {
    if (!firstValueExist) firstValue += event.target.value;
    if (firstValueExist) secondValue += event.target.value;
    if (firstValue.length > NUMBER_OF_DIGITTS) remuveNumber()
    if (secondValue.length > NUMBER_OF_DIGITTS ) remuveNumber()
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
    if (firstValueExist && !secondValue) {
        operation = event.target.value;
    }
    if (firstValueExist && secondValue) {
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
    return firstValue = Number(firstValue) + Number(secondValue);
}

function subtraction() {
    return firstValue = Number(firstValue) - Number(secondValue);
}

function multiplication() {
    return firstValue = Number(firstValue) * Number(secondValue);
}

function division() {
    return firstValue = Number(firstValue) / Number(secondValue);
}

function squareRoot() {
    firstValue = Math.sqrt(firstValue);
    firstValue = firstValue.toFixed(NUMBER_OF_DIGITTS - Math.round(firstValue));
    firstValueExist = true;
    displayResult()
}

function procent() {
    if (!firstValueExist) return;
    secondValue = firstValue * (secondValue / 100);
    display();
}


function display() {
    if (!firstValueExist) displayValue.textContent = firstValue;
    if (firstValueExist) displayValue.textContent = secondValue;
    isMInusSelect()
    if (overflowError) overflowErrorIcon.style.opacity = '1';
    if (!overflowError) overflowErrorIcon.style.opacity = '0';

}

function displayResult() {
    displayValue.textContent = firstValue;
    isMInusSelect()
}

function CeC() {
    if (firstValue && !operation && !secondValue) {
        firstValue = '';
        firstValueExist = false;
    } 
    if (firstValue && operation && !secondValue) {
        operation = ''; 
        firstValueExist = false;
    }
    if (firstValue && operation && secondValue) secondValue = '';
    minusSelect = false;
    display()
}

function allClear() {
    firstValue = '';
    operation = '';
    secondValue = '';
    firstValueExist = false;
    minusSelect = false;
    overflowError = false;
    display()
}