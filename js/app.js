const NUMBER_OF_DIGITTS = 12;
let firstValue = '';
let secondValue = '';
let operation = '';
let memoryOne = '';
let memoryTwo = '';
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
let MemoryPlusButton = document.querySelector('#MemoryPlus');
MemoryPlusButton.addEventListener('mouseup', memoryOnePlus)
let MemoryMinusButton = document.querySelector('#MemoryMinus');
MemoryMinusButton.addEventListener('mouseup', memoryOneMinus);
let MemoryReadButton = document.querySelector('#MemoryOneRead');
MemoryReadButton.addEventListener('mouseup', memoryOneRead);
let MemoryOneClearButton = document.querySelector('#MemoryOneClear');
MemoryOneClearButton.addEventListener('mouseup', memoryOneClear);
let MemoryTwoPlusButton = document.querySelector('#MemoryTwoPlus');
MemoryTwoPlusButton.addEventListener('mouseup', memoryTwoPlus)
let MemoryTwoMinusButton = document.querySelector('#MemoryTwoMinus');
MemoryTwoMinusButton.addEventListener('mouseup', memoryTwoMinus);
let MemoryTwoReadClearButton = document.querySelector('#MemoryTwoReadClear');
MemoryTwoReadClearButton.addEventListener('mouseup', MemoryTwoReadClear);
let MemoryTwoPrest = false;
let MemoryOneIcon = document.querySelector('#MOneSign');
let MemoryTwoIcon = document.querySelector('#MTwoSign');
let decimalInput = document.querySelector('#decimalInput');
let roundingInput = document.querySelector('#roundingInput');


function isNegativ() {
    if (!minusSelect) return
    if (minusSelect && !firstValueExist) return firstValue *= -1;
    if (minusSelect && firstValueExist) return secondValue *= -1;
}

function isMInusSelect() {
    minusSelect ? minusicon.style.opacity = '1' : minusicon.style.opacity = '0';
}

function isMemoryFill() {
    MemoryOneIcon.style.opacity = (memoryOne || memoryTwo) ?  '1' : '0';
    MemoryTwoIcon.style.opacity = memoryTwo ?  '1' : '0';
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
    if (operation === 'plus') firstValue = rounding(decimalLimiter(addition())) ;
    if (operation === 'minus') firstValue = rounding(decimalLimiter(subtraction()));
    if (operation === 'multiply') firstValue = rounding(decimalLimiter(multiplication()));
    if (operation === 'divide') firstValue = rounding(decimalLimiter(division()));
    secondValue = '';
    displayResult()
}

function addition() {
    return Number(firstValue) + Number(secondValue);
}

function subtraction() {
    return Number(firstValue) - Number(secondValue);
}

function multiplication() {
    return Number(firstValue) * Number(secondValue);
}

function division() {
    return Number(firstValue) / Number(secondValue);
}

function squareRoot() {
    isNegativ()
    firstValue = Math.sqrt(firstValue);
    firstValue = firstValue.toFixed(NUMBER_OF_DIGITTS - Math.round(firstValue));
    firstValue = decimalLimiter(Number(firstValue));
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
    isMInusSelect();
    isMemoryFill();
    if (overflowError) overflowErrorIcon.style.opacity = '1';
    if (!overflowError) overflowErrorIcon.style.opacity = '0';
}

function displayResult() {
    displayValue.textContent = firstValue;
    isMInusSelect();
    isMemoryFill();
}

function CeC() {
    if (firstValue && !operation && !secondValue) firstValue = ''; 
    if (firstValue && operation && !secondValue) operation = '';
    if (firstValue && operation && secondValue) secondValue = '';
    firstValueExist = false;
    MamoryTwoPrest = false;
    minusSelect = false;
    display()
}

function allClear() {
    firstValue = '';
    operation = '';
    secondValue = '';
    memoryOne = '';
    memoryTwo = '';
    firstValueExist = false;
    minusSelect = false;
    overflowError = false;
    MamoryTwoPrest = false;
    display()
}

function clearFirstValue() {
    firstValueExist = false;
    firstValue = '';
    operation = '';
}

function memoryOnePlus() {
    isNegativ()
    if (firstValueExist && secondValue) calculate();
    memoryOne = rounding(decimalLimiter((Number(memoryOne) + Number(firstValue))));
    clearFirstValue();
    minusSelect = false;
    display();
}

function memoryOneMinus() {
    isNegativ()
    if (firstValueExist && secondValue) calculate();
    memoryOne = rounding(decimalLimiter((Number(memoryOne) + Number(firstValue))));
    clearFirstValue();
    minusSelect = false;
    display();
}

function memoryOneRead() {
    if (firstValueExist) secondValue = memoryOne;
    if (!firstValueExist) firstValue = memoryOne;
    display()
}

function memoryOneClear() {
    memoryOne = '';
    CeC()
}

function memoryTwoPlus() {
    isNegativ()
    if (firstValueExist && secondValue) calculate();
    memoryTwo = rounding(decimalLimiter((Number(memoryOne) + Number(firstValue))));
    clearFirstValue();
    minusSelect = false;
    display();
}

function memoryTwoMinus() {
    isNegativ()
    if (firstValueExist && secondValue) calculate();
    memoryTwo = rounding(decimalLimiter((Number(memoryOne) + Number(firstValue))));
    clearFirstValue();
    minusSelect = false;
    display(); 
}

function MemoryTwoReadClear() {
    if (MamoryTwoPrest) {
        display();
        memoryTwo = '';
        CeC();
    }
    if (!MamoryTwoPrest) {
        if (firstValueExist) secondValue = memoryTwo;
        if (!firstValueExist) firstValue = memoryTwo;
        MamoryTwoPrest = true;
        display()
    }        
}

function decimalLimiter(resultOf) {
    switch (decimalInput.value) {
        case '1':
            return resultOf.toFixed(2);
        case '2':
            return resultOf.toFixed();
        case '3':
            return resultOf.toFixed(2);
        case '4':
            return resultOf.toFixed(3);
        case '5':
            return resultOf.toFixed(4);
        case '6':
            return resultOf
    }
}

function rounding(resultOf) {
    switch (roundingInput.value) {
        case '1':
            return Math.ceil(resultOf);
        case '2':
            return resultOf;
        case '3':
            return Math.floor(resultOf); 
    }
}


