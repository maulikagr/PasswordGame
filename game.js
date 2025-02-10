let passwordInput = document.getElementById("password-input");
let passwordWarning = document.getElementById("password-warning");
let passwordRequirementDisplay = document.getElementById("password-requirement");

// Initialize passwordValid variable
let passwordValid = false;

let passwordRequirements = [
  { length: 22, sum: 21 },
  { length: 20, sum: 25 },
  { length: 23, sum: 30 },
  { length: 25, sum: 35 },
  { length: 21, sum: 20 }
];

// Function to randomly shuffle the requirements
function getRandomRequirement() {
  return passwordRequirements[Math.floor(Math.random() * passwordRequirements.length)];
}

// Get the current random requirement
let currentRequirement = getRandomRequirement();

function validatePassword(password) {
  let digitSum = password.split('').filter(c => /\d/.test(c)).reduce((sum, digit) => sum + parseInt(digit), 0);
  
  return password.length === currentRequirement.length && digitSum === currentRequirement.sum;
}

// Activate password field when the game is ongoing
function startPasswordEntry() {
  passwordInput.disabled = false;
}

// Function to update the displayed requirement
function updatePasswordRequirementDisplay() {
  passwordRequirementDisplay.textContent = `Password must be ${currentRequirement.length} characters long and the sum of digits must be ${currentRequirement.sum}.`;
  if (passwordValid) {
    passwordRequirementDisplay.style.color = 'green';  // Turn green when valid
  } else {
    passwordRequirementDisplay.style.color = 'black';  // Default color
  }
}

// Password input event listener
passwordInput.addEventListener("input", () => {
  let password = passwordInput.value;
  if (validatePassword(password)) {
    passwordValid = true;
    passwordWarning.textContent = "✅ Password is valid!";
    updatePasswordRequirementDisplay();  // Update the requirement display with green color
    
    // Redirect to the new page once the password is valid
    setTimeout(() => {
      window.location.href = "congrats.html";
    }, 1000); // 1 second delay before redirecting

  } else {
    passwordValid = false;
    passwordWarning.textContent = "❌ Invalid password. Try again!";
    updatePasswordRequirementDisplay();  // Update the requirement display with default color
  }
});

// Reset password when game ends
function resetPassword() {
  passwordInput.value = "";
  passwordWarning.textContent = "";
  passwordValid = false;
  // Get new random requirement after each loss
  currentRequirement = getRandomRequirement();
  updatePasswordRequirementDisplay();  // Update the requirement display
}

// This function should be called from snake.js when the game is over
function resetGameOnLoss() {
  resetPassword();
  startPasswordEntry(); // Allow typing password after reset
  updatePasswordRequirementDisplay();  // Update the requirement display after reset
}
