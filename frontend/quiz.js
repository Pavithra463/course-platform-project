const quizForm = document.getElementById("quizForm");
const resultMsg = document.getElementById("resultMsg");

// Correct answers
const correctAnswers = {
  q1: "class",
  q2: "string (lowercase)",
  q3: "SELECT",
  q4: "Cascading Style Sheets",
  q5: "//"
};

quizForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  let score = 0;
  const totalQuestions = Object.keys(correctAnswers).length;

  // Check each answer
  for (let question in correctAnswers) {
    const selected = document.getElementById(question).value;
    if (selected === correctAnswers[question]) {
      score++;
    }
  }

  // Get the logged-in username (we will save this during login in the next step)
  const username = localStorage.getItem("loggedInUsername") || "Guest";
    if (location.hostname.endsWith("github.io")) {
    resultMsg.textContent = `You scored ${score} out of ${totalQuestions}. Demo mode: scores are saved to MySQL only when the backend runs locally.`;
    resultMsg.style.color = "#28a745";
    return;
  }

  // Send the score to the backend
  try {
    const response = await fetch('http://localhost:5000/save-score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        testName: "Basic Programming Quiz",
        score: score
      })
    });

    const data = await response.json();

    if (response.ok) {
      resultMsg.textContent = `You scored ${score} out of ${totalQuestions}. Score saved successfully!`;
      resultMsg.style.color = "#28a745";
    } else {
      resultMsg.textContent = `You scored ${score} out of ${totalQuestions}, but saving failed: ${data.message}`;
      resultMsg.style.color = "red";
    }
  } catch (error) {
    resultMsg.textContent = `You scored ${score} out of ${totalQuestions}, but could not connect to server.`;
    resultMsg.style.color = "red";
  }
});