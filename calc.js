const numberButton = document.querySelectorAll('[data-number]');
const decimalButton = document.querySelector('[data-action]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equal]');
const ansButton = document.querySelector('[data-answer]')
const upDisplay = document.getElementById('top-text');
const downDisplay = document.getElementById('bottom-text');
const computationDisplay = document.getElementById('computation-text');
const clrButton = document.querySelector('[data-clr]');
const acButton = document.querySelector('[data-ac]');

let firstOperand = "";
let secondOperand = "";
let operation = undefined;
let computation;
let ans = "";

acButton.addEventListener('click', () => {
    upDisplay.innerText = "";
    downDisplay.innerText = "";
    computationDisplay.innerText = "";
    firstOperand = "";
    secondOperand = "";
    operation = undefined;
    computation ="";
})

function deleteNumber () {
    if (secondOperand !== "") {
        secondOperand = secondOperand.slice(0, -1);
        downDisplay.innerText = secondOperand;
    }
    else if (operation) {
        operation = undefined;
        upDisplay.innerText = firstOperand;
    }
    else if (firstOperand !== "") {
        firstOperand = firstOperand.slice(0, -1);
        upDisplay.innerText = firstOperand;
    }
    else {
        computation = computationDisplay.innerText.slice(0, -1);
        computationDisplay.innerText = computation;
    }
}

clrButton.addEventListener('click', () => {
    deleteNumber();
})


numberButton.forEach(button => {
    button.addEventListener('click', () => {
        if (!operation) {
            firstOperand += button.innerText;
            upDisplay.innerText = firstOperand;
        } else {
            secondOperand += button.innerText;
            downDisplay.innerText = secondOperand;
        }
    })
})

decimalButton.addEventListener('click', () => {
    if (!operation) {
        if (firstOperand.includes(".")) return;
        firstOperand += ".";
        upDisplay.innerText = firstOperand;
    } else {
        if (secondOperand.includes(".")) return;
        secondOperand += ".";
        downDisplay.innerText = secondOperand;
    }
})

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        if (operation) return;
        if (firstOperand === "") return;
        operation = button.innerText;
        upDisplay.innerText = firstOperand + " " + operation;
        downDisplay.innerText = "";
    })
})

ansButton.addEventListener('click', () => {
    computationDisplay.innerText = ans;
})

function compute () {
    const prev = parseFloat(firstOperand);
    const current = parseFloat(secondOperand);

    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case 'x':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                downDisplay.innerText = "Error";
                upDisplay.innerText = "";
                return;
            }
            computation = prev / current;
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
        }
        computationDisplay.innerText = computation;
        ans = computation;
        firstOperand = "";
        secondOperand = "";
        operation = undefined;
        computation ="";
        upDisplay.innerText = "";
        downDisplay.innerText = "";
}

equalButton.addEventListener('click', () => {
    compute();
})

document.addEventListener('keydown', (e) => {
    if (!isNaN(e.key)) {
        if (!operation) {
            firstOperand += e.key;
            upDisplay.innerText = firstOperand;
        } else {
            secondOperand += e.key;
            downDisplay.innerText = secondOperand;
        }
    }
    if (['+', '-', '*', '/', '%'].includes(e.key)) {
        if (upDisplay.innerText === "") return;
        if (e.key === '*') {
            operation = 'x';
        }
        else {
            operation = e.key;
        }
        upDisplay.innerText = firstOperand + " " + operation;
        downDisplay.innerText = "";
        }
        if (e.key === 'Enter') {
            compute();
        }
        if (e.key === 'Backspace') {
            clrButton.click();
        }
        if (e.key === 'Escape') {
            acButton.click();
        }
        if (e.key === 'a') {
            ansButton.click();
        }
        if (e.key === '.') {
            decimalButton.click();
        }
    })