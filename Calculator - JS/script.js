"use strict";
/********* Global Variable *********/
const maxLength = 30;
/********* REUSABLE ELEMENT *********/
const key = document.querySelector(".calculator-key");
const currentOperandEl = document.querySelector(".current-operand");
const operatorKeyEls = document.querySelectorAll(".operator-key");
const calculatorEl = document.querySelector(".calculator");
/********* REUSABLE FUNCTION *********/
// Display number
const displayCurrentNumber = function (num) {
  currentOperandEl.textContent = num;
};
const turnOffisPressed = function () {
  operatorKeyEls.forEach((el) => {
    el.classList.remove("isPressed");
  });
};
const turnOnisPressed = function (el) {
  el.classList.add("isPressed");
};

const calculate = function (op1, operator, op2) {
  const len = Math.max(op1.length, op2.length);
  const [first, second] = [parseFloat(op1), parseFloat(op2)];
  const fixed = (val) => {
    return parseFloat(val.toFixed(len - 1));
  };
  if (operator === "add") return fixed(first + second);

  if (operator === "substract") return fixed(first - second);

  if (operator === "multiply") return fixed(first * second);

  // if reach here operate = divide
  return fixed(first / second);
};
const reset = function () {
  displayCurrentNumber("");
  calculatorEl.dataset.firstValue = "";
  calculatorEl.dataset.operator = "";
  calculatorEl.dataset.previousKey = "";
  calculatorEl.dataset.prevOperator = "";
  calculatorEl.dataset.prevSecondOperator = "";
  turnOffisPressed();
};
// ACTION
key.addEventListener("click", function (e) {
  if (e.target.matches("button")) {
    // REUSABLE VARIABLE
    const key = e.target; // key -> button element
    const action = key.getAttribute("data-action"); // can also use key.dataset.action
    let numberDisplay = currentOperandEl.textContent;
    const keyContent = key.textContent;

    if (!action && numberDisplay.length < maxLength) {
      // here keyContent = number
      if (
        numberDisplay === "" ||
        calculatorEl.dataset.previousKey === "operator" ||
        calculatorEl.dataset.previousKey === "calculate"
      ) {
        numberDisplay = keyContent;
        turnOffisPressed();
      } else {
        numberDisplay += keyContent;
      }
      calculatorEl.dataset.previousKey = "number";
      displayCurrentNumber(numberDisplay);
    } else if (
      action === "add" ||
      action === "substract" ||
      action === "divide" ||
      action === "multiply"
    ) {
      // edge case : number + operator + number + another operator
      const firstValue = calculatorEl.dataset.firstValue;
      const operator = calculatorEl.dataset.operator;
      const prevKey = calculatorEl.dataset.previousKey;
      if (firstValue && operator && prevKey !== "operator") {
        numberDisplay = calculate(firstValue, operator, numberDisplay);
        displayCurrentNumber(numberDisplay);
        calculatorEl.dataset.previousKey = "calculate";
      }
      // end edge case
      calculatorEl.dataset.previousKey = "operator";
      calculatorEl.dataset.firstValue = numberDisplay;
      calculatorEl.dataset.operator = action;
      turnOffisPressed();
      turnOnisPressed(key);
    } else if (action === "decimal") {
      calculatorEl.dataset.previousKey = "decimal";
      // if user press decimal btn -> append '.' after numberDisplay
      // Also check the current number has '.' or not
      // if No -> Do it
      // if Yes -> Don't do anything because invalid number
      if (!numberDisplay.includes(".")) {
        if (numberDisplay === "") numberDisplay = "0.";
        else numberDisplay += ".";
        displayCurrentNumber(numberDisplay);
      }
    } else if (action === "clear") {
      reset();
    } else if (action === "delete") {
      calculatorEl.dataset.previousKey = "delete";
      displayCurrentNumber("");
    } else if (action === "calculate") {
      const firstValue = calculatorEl.dataset.firstValue;
      const operator = calculatorEl.dataset.operator;
      let secondValue = numberDisplay;
      if (calculatorEl.dataset.previousKey !== "calculate") {
        calculatorEl.dataset.previousKey = "calculate";
        if (firstValue) {
          calculatorEl.dataset.firstValue = calculate(
            firstValue,
            operator,
            secondValue
          );
          displayCurrentNumber(calculatorEl.dataset.firstValue);
        }
        calculatorEl.dataset.operator = "";
        turnOffisPressed();
        calculatorEl.dataset.prevOperator = operator;
        calculatorEl.dataset.prevSecondOperator = secondValue;
      } else {
        if (firstValue && calculatorEl.dataset.prevOperator) {
          secondValue = calculatorEl.dataset.prevSecondOperator;
          const operator = calculatorEl.dataset.prevOperator;
          calculatorEl.dataset.firstValue = calculate(
            firstValue,
            operator,
            secondValue
          );
          displayCurrentNumber(calculatorEl.dataset.firstValue);
        }
      }
    }
  }
});
