"use strict";

function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === "0") {
        return "ERROR"
    }
    return a / b;
}

function operate(a, b, operator) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

let a = 0;
let b = "";
let operator = "";
const display = document.querySelector("#display");

function populateDisplay(val) {
    if (val === "ERROR") {
        display.textContent = val;
    }
    else {
        display.textContent = Math.round(10**13 * val) / 10 ** 13;
    }
    return val;
}

function processInput(val) {
    let nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    if (val === "C") {
        a = 0;
        b = "";
        operator = "";
        populateDisplay("");
    }
    else if (val === "=") {
        if ((a !== 0 && b && operator)) {
            a = populateDisplay(operate(a, b, operator));
            if (a === "ERROR") {
                a = 0;
                operator = "";
            }
            b = "";
        }
    }
    else if (nums.includes(val)) {
        if (!operator) {
            a = parseInt(`${a}` + val);
            populateDisplay(a);
        }
        else {
            b += val;
            populateDisplay(b);
        }
    }
    else {
        if (b) {
            a = populateDisplay(operate(a, b, operator));
            if (a === "ERROR") {
                a = 0;
                operator = "";
            }
            b = "";
        }
        operator = val;
    }
}

const numbers = document.querySelectorAll("button");
numbers.forEach(button => {
    button.addEventListener("click", event => {
        processInput(event.target.id);
    });
});

