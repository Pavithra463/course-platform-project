const form = document.getElementById("loginForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");

const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  successMsg.textContent = "";

  let isValid = true;

  if (username.value.trim() === "") {
    usernameError.textContent = "Username is required";
    isValid = false;
  } else if (username.value.trim().length < 3) {
    usernameError.textContent = "Username must be at least 3 characters";
    isValid = false;
  } else {
    usernameError.textContent = "";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() === "") {
    emailError.textContent = "Email is required";
    isValid = false;
  } else if (!emailPattern.test(email.value.trim())) {
    emailError.textContent = "Enter a valid email address";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  if (password.value === "") {
    passwordError.textContent = "Password is required";
    isValid = false;
  } else if (password.value.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters";
    isValid = false;
  } else {
    passwordError.textContent = "";
  }

  if (isValid) {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.value.trim(),
          password: password.value
        })
      });

      const data = await response.json();

            if (response.ok) {
        localStorage.setItem("loggedInUsername", data.username);
        successMsg.textContent = `Welcome, ${data.username}! Redirecting to quiz...`;
        successMsg.style.color = "#28a745";
        form.reset();
        setTimeout(() => {
          window.location.href = "quiz.html";
        }, 1500);
      } else {
        successMsg.textContent = data.message;
        successMsg.style.color = "red";
      }
    } catch (error) {
      successMsg.textContent = "Could not connect to server.";
      successMsg.style.color = "red";
    }
  }
});