class Calculator {
  constructor(previousTextElement, currentTextElement){
    this.previousTextElement = previousTextElement;
    this.currentTextElement = currentTextElement;
    this.clear();
  }
  clear(){
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete(){
    this.currentOperand = this.currentOperand.toString(). slice(0, -1);

  }

  appendNumber(number){
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation){
    if (this.currentOperand === ' ') return;
    if (this.previousOperand !== ' '){
      this.compute()
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';

  }

  compute(){
    let computation;
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    if(isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case '+':
        computation = prev + curr;
        break;
      case '-':
        computation = prev - curr;
        break;
      case '*':
        computation = prev * curr;
        break;
      case '÷':
        computation = prev / curr;
        break;
        default:
          return

    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand;
  }

  getDisplayNumber(number){
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if(isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay(){
    this.currentTextElement.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousTextElement.innerText =
      `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousTextElement.innerText = '';
    }
    }

  }


const numberBtns = document.querySelectorAll('[data-number]');
const operationsBtns = document.querySelectorAll('[data-operation]');
const equalBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');
const previousTextElement = document.querySelector('[data-previous]');
const currentTextElement = document.querySelector('[data-current]');
const calculator = new Calculator(previousTextElement, currentTextElement);

numberBtns.forEach(button => {
  button.addEventListener('click',() => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

operationsBtns.forEach(button => {
  button.addEventListener('click',() => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

equalBtn.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
})

allClearBtn.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay()
})
deleteBtn.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})
