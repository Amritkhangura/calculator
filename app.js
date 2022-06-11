class Calculator {
  constructor(previousTextElement, currentTextElement){
    this.previousTextElement = previousTextElement
    this.currentTextElement = currentTextElement
    this.clear()
  }
  clear(){
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete(){

  }

  appendNumber(number){
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation){
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';

  }

  compute(){

  }

  updateDisplay(){
    this.currentTextElement.innerText = this.currentOperand;
    this.previousTextElement.innerText = this.previousOperand;
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
