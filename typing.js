let startTime, timerRunning = false;
let timerInterval;
let sentenceIndex = 0;

// List of sentences for the typing test
const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "A journey of a thousand miles begins with a single step.",
  "To be or not to be, that is the question.",
  "All that glitters is not gold.",
  "Practice makes perfect, so keep typing to improve."
];

// Function to start the timer automatically when typing begins
function startTimer() {
  const userInput = document.getElementById("userInput");

  userInput.addEventListener("input", () => {
    if (!timerRunning) {
      startTime = new Date();
      timerRunning = true;
      updateTimer();
    }
    checkSentenceCompletion();
  });
}

// Function to check if the current sentence is completed
function checkSentenceCompletion() {
  const paragraph = document.getElementById("paragraph").innerText.trim();
  const userInput = document.getElementById("userInput").value.trim();

  // If the sentence is completed, load the next sentence
  if (userInput === paragraph) {
    sentenceIndex = (sentenceIndex + 1) % sentences.length; // Cycle through the sentences
    document.getElementById("paragraph").innerText = sentences[sentenceIndex];
    document.getElementById("userInput").value = ""; // Clear the input for the next sentence
  }
}

// Function to update the timer display in real-time
function updateTimer() {
  let elapsedTime = 0;

  timerInterval = setInterval(() => {
    if (timerRunning) {
      const currentTime = new Date();
      elapsedTime = Math.floor((currentTime - startTime) / 1000);

      // Update the timer display
      document.getElementById("time").innerText = elapsedTime;

      // End the test when time reaches 60 seconds
      if (elapsedTime >= 60) {
        endTest();
      }
    }
  }, 1000);
}

// Function to end the test and calculate results
function endTest() {
  if (!timerRunning) return;
  timerRunning = false;
  clearInterval(timerInterval);

  const totalTime = 60; // Total time is 60 seconds
  const userInput = document.getElementById("userInput").value.trim();
  const wordCount = userInput.split(" ").length;
  const speed = Math.round((wordCount / totalTime) * 60);

  const paragraph = sentences[sentenceIndex];
  const correctWords = userInput.split(" ").filter((word, index) => {
    return word === paragraph.split(" ")[index];
  }).length;
  const accuracy = Math.round((correctWords / paragraph.split(" ").length) * 100);

  // Display results
  document.getElementById("speed").innerText = speed;
  document.getElementById("accuracy").innerText = accuracy;

  // Show certificate section
  document.getElementById("certificateSection").style.display = "block";

  // Show alert message with speed and accuracy
  alert(`Test Complete! \nSpeed: ${speed} WPM\nAccuracy: ${accuracy}%\nClick OK to enter your name and generate the certificate.`);
}

// Function to reset the typing test
function resetTest() {
  sentenceIndex = 0;
  document.getElementById("paragraph").innerText = sentences[sentenceIndex];
  document.getElementById("userInput").value = "";
  document.getElementById("time").innerText = "0";
  document.getElementById("speed").innerText = "0";
  document.getElementById("accuracy").innerText = "0";
  document.getElementById("certificateSection").style.display = "none";

  timerRunning = false;
  startTime = null;
  clearInterval(timerInterval);
}

function generateCertificate() {
  const canvas = document.getElementById("certificateCanvas");
  const ctx = canvas.getContext("2d");

  // Get user inputs
  const userName = document.getElementById("userName").value.trim() || "Participant";
  const speed = document.getElementById("speed").innerText || "0";
  const accuracy = document.getElementById("accuracy").innerText || "0";

  // Clear the canvas before drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background
  ctx.fillStyle = "#f0f8ff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add certificate text
  ctx.backgroundImage 
  ctx.fillStyle = "#333";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Certificate of Achievement", canvas.width / 2, 100);

  ctx.font = "20px Arial";
  ctx.fillText("This is to certify that", canvas.width / 2, 160);

  // Add user's name
  ctx.font = "28px Arial";
  ctx.fillStyle = "#0073e6";
  ctx.fillText(userName, canvas.width / 2, 210);

  // Add performance details
  ctx.fillStyle = "#333";
  ctx.font = "20px Arial";
  ctx.fillText(`achieved a typing speed of ${speed} WPM`, canvas.width / 2, 270);
  ctx.fillText(`with an accuracy of ${accuracy}%`, canvas.width / 2, 310);

  // Footer message
  ctx.font = "18px Arial";
  ctx.fillText("Well done! Keep practicing to improve further.", canvas.width / 2, 370);

  // Generate download link
  const downloadLink = document.getElementById("downloadLink");
  downloadLink.href = canvas.toDataURL("image/png"); // Generate PNG data URL
  downloadLink.style.display = "inline-block"; // Show the link
}


