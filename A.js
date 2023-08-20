// A.js
// Import the B.js file
import { doSomethingInB } from './B.js';

// Your code in A.js
export function initializeA() {
  console.log('File A is loaded.');
  doSomethingInB();
}
