// Elements
const buttons = document.querySelectorAll(".btn");
const currentOperandTextElement = document.querySelector(".current-operand");
const previousOperandTextElement = document.querySelector(".previous-operand");
class Calculator {
  constructor(currentOperandTextElement, previousOperandTextElement) {
    this.currentOperandTextElement = currentOperandTextElement;
    this.previousOperandTextElement = previousOperandTextElement;

    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  chooseOperand(operation) {
    // if it was first time that user clicked operation buttons, return out
    if (this.currentOperand === "") return;
    // if previous operand existed, compute calculator
    if (this.previousOperand !== "") {
      this.compute();
    }

    // update operation and pervious operand & reset current operand
    this.operation = operation;
    this.previousOperand = this.currentOperand + this.operation;
    this.currentOperand = "";
  }

  compute() {
    let computation = null;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "/":
        computation = prev / current;
        break;
      case "*":
        computation = prev * current;
        break;
      
      default:
        break;
    }
    this.currentOperand = computation;
    this.previousOperand = '';
    this.operation = undefined;
  }

  appendNumber(value) {
    // If Current Operand had ( . ) Dont Add it again
    if (this.currentOperand.toString().includes(".") && value === ".") return;
    this.currentOperand = this.currentOperand.toString() + value.toString();
  }

  // Update display every time that buttons clicked
  updateDisplay() {
    this.currentOperandTextElement.textContent = this.currentOperand;
    this.previousOperandTextElement.textContent = this.previousOperand;
  }
}

// Events
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.currentTarget.dataset.btn;
    clickHandler(value);
  });
});

const clickHandler = (value) => {
  switch (value) {
    case "+":
    case "-":
    case "*":
    case "/":
      calculator.chooseOperand(value);
      break;
    case "c":
      calculator.clear();
      break;
    case "de":
      calculator.delete();
      break;
    case "=":
      calculator.compute();
      break;
    default:
      calculator.appendNumber(value);
      break;
  }

  calculator.updateDisplay();
};

// Call Calculator Class
const calculator = new Calculator(
  currentOperandTextElement,
  previousOperandTextElement,
);
