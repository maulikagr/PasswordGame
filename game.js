let passwordInput = document.getElementById("password-input");
let passwordWarning = document.getElementById("password-warning");

// Initialize passwordValid variable
let passwordValid = false;

function validatePassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return regex.test(password);
}

// Activate password field when the game is ongoing
function startPasswordEntry() {
  passwordInput.disabled = false;
}

// Password input event listener
passwordInput.addEventListener("input", () => {
  let password = passwordInput.value;
  if (validatePassword(password)) {
    passwordValid = true;
    passwordWarning.textContent = "✅ Password is valid!";
    
    // Redirect to the new page once the password is valid
    setTimeout(() => {
      window.location.href = "congrats.html";
    }, 1000); // 1 second delay before redirecting

  } else {
    passwordValid = false;
    passwordWarning.textContent = "❌ Password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
  }
});

// Reset password when game ends
function resetPassword() {
  passwordInput.value = "";
  passwordWarning.textContent = "";
  passwordValid = false;
}

// This function should be called from snake.js when the game is over
function resetGameOnLoss() {
  resetPassword();
  startPasswordEntry(); // Allow typing password after reset
}
