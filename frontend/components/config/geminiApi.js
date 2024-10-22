let apiKey="AIzaSyBnNG7dkHNBxgFwUGu2duh9l7xx0Q-x7vE"

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
//   const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function runChat(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    return result.response.text();
  }
  
  export default runChat;






//   ## 5 JavaScript Programs:

// **1. Simple Calculator:**

// ```javascript
// function add(a, b) {
//   return a + b;
// }

// function subtract(a, b) {
//   return a - b;
// }

// function multiply(a, b) {
//   return a * b;
// }

// function divide(a, b) {
//   if (b === 0) {
//     return "Division by zero is not allowed!";
//   }
//   return a / b;
// }

// let num1 = parseFloat(prompt("Enter the first number:"));
// let num2 = parseFloat(prompt("Enter the second number:"));
// let operation = prompt("Choose operation (+, -, *, /):");

// let result;

// switch (operation) {
//   case "+":
//     result = add(num1, num2);
//     break;
//   case "-":
//     result = subtract(num1, num2);
//     break;
//   case "*":
//     result = multiply(num1, num2);
//     break;
//   case "/":
//     result = divide(num1, num2);
//     break;
//   default:
//     result = "Invalid operation!";
// }

// console.log("The result is: ", result);
// ```

// **2. Find the Largest Number in an Array:**

// ```javascript
// function findLargest(arr) {
//   if (arr.length === 0) {
//     return "Array is empty!";
//   }
//   let largest = arr[0];
//   for (let i = 1; i < arr.length; i++) {
//     if (arr[i] > largest) {
//       largest = arr[i];
//     }
//   }
//   return largest;
// }

// let numbers = [12, 34, 5, 98, 22];
// let largestNumber = findLargest(numbers);
// console.log("The largest number is: ", largestNumber);
// ```

// **3. Reverse a String:**

// ```javascript
// function reverseString(str) {
//   return str.split("").reverse().join("");
// }

// let inputString = "Hello World!";
// let reversedString = reverseString(inputString);
// console.log("The reversed string is: ", reversedString);
// ```

// **4. Check if a Number is Prime:**

// ```javascript
// function isPrime(num) {
//   if (num <= 1) {
//     return false;
//   }
//   for (let i = 2; i <= Math.sqrt(num); i++) {
//     if (num % i === 0) {
//       return false;
//     }
//   }
//   return true;
// }

// let number = 17;
// if (isPrime(number)) {
//   console.log(number + " is a prime number.");
// } else {
//   console.log(number + " is not a prime number.");
// }
// ```

// **5.  Create a Simple Todo List:**

// ```javascript
// let todoList = [];

// function addTodo(task) {
//   todoList.push(task);
//   console.log("Added task: " + task);
// }

// function removeTodo(task) {
//   let index = todoList.indexOf(task);
//   if (index !== -1) {
//     todoList.splice(index, 1);
//     console.log("Removed task: " + task);
//   } else {
//     console.log("Task not found!");
//   }
// }

// function displayTodoList() {
//   if (todoList.length === 0) {
//     console.log("Todo list is empty.");
//   } else {
//     console.log("Todo List:");
//     for (let i = 0; i < todoList.length; i++) {
//       console.log((i + 1) + ". " + todoList[i]);
//     }
//   }
// }

// addTodo("Buy groceries");
// addTodo("Finish report");
// displayTodoList();
// removeTodo("Finish report");
// displayTodoList();
// ```

// These are just a few examples. You can explore and create many more programs with JavaScript.  Feel free to ask for specific types of programs or concepts you'd like to see examples of! 