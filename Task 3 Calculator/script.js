document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    let currentInput = '0';
    let operator = null;
    let firstOperand = null;
    let waitingForSecondOperand = false;

    function inputDigit(digit) {
        if (currentInput === '0' || waitingForSecondOperand) {
            currentInput = digit;
            waitingForSecondOperand = false;
        } else {
            currentInput += digit;
        }
    }

    function inputDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentInput);
        if (operator && waitingForSecondOperand) {
            operator = nextOperator;
            return;
        }

        if (firstOperand === null) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = performCalculation(operator, firstOperand, inputValue);
            currentInput = `${parseFloat(result.toFixed(7))}`;
            firstOperand = parseFloat(result.toFixed(7));
        }

        waitingForSecondOperand = true;
        operator = nextOperator;
    }

    function performCalculation(operator, firstOperand, secondOperand) {
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '*':
                return firstOperand * secondOperand;
            case '/':
                return firstOperand / secondOperand;
            default:
                return secondOperand;
        }
    }

    function clearCalculator() {
        currentInput = '0';
        operator = null;
        firstOperand = null;
        waitingForSecondOperand = false;
    }

    function toggleSign() {
        currentInput = `${-parseFloat(currentInput)}`;
    }

    function inputPercentage() {
        currentInput = `${parseFloat(currentInput) / 100}`;
    }

    function updateDisplay() {
        display.textContent = currentInput;
    }

    updateDisplay();

    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => {
            inputDigit(button.textContent);
            updateDisplay();
        });
    });

    document.getElementById('decimal').addEventListener('click', () => {
        inputDecimal();
        updateDisplay();
    });

    document.querySelectorAll('.operator').forEach(button => {
        button.addEventListener('click', () => {
            handleOperator(button.textContent);
            updateDisplay();
        });
    });

    document.getElementById('clear').addEventListener('click', () => {
        clearCalculator();
        updateDisplay();
    });

    document.getElementById('toggleSign').addEventListener('click', () => {
        toggleSign();
        updateDisplay();
    });

    document.getElementById('percentage').addEventListener('click', () => {
        inputPercentage();
        updateDisplay();
    });

    document.getElementById('equals').addEventListener('click', () => {
        handleOperator('=');
        updateDisplay();
    });
});
