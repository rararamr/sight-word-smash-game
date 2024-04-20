const targetWord = document.getElementById("target-word");
const wordBoxes = document.querySelectorAll(".word-box");

const sightWords = ["the", "a", "you", "like", "see", "is", "at", "in", "on", "it"];
let lives = 3; // Number of allowed wrong answers
let score = 0;

function pickRandomWord() {
  const randomIndex = Math.floor(Math.random() * sightWords.length);
  return sightWords[randomIndex];
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function displayWord() {
  const target = pickRandomWord();
  const shuffledWords = shuffleArray([...sightWords]); // Copy to avoid mutation
  const wordChoices = shuffledWords.slice(0, 9); // Pick 4 random words for choices

  // Ensure the target word is included without modifying the original array
  if (!wordChoices.includes(target)) {
    wordChoices[Math.floor(Math.random() * 9)] = target; // Place target word randomly among choices
  }

  targetWord.textContent = "Smash the word: " + target;

  // Update word box content with shuffled choices (separated by spaces)
  wordBoxes.forEach((box, index) => {
    const wordText = wordChoices[index] || ""; // Use empty string if no word available
    box.firstChild.textContent = wordText;
  });
}

function restartGame() {
  lives = 3;  // Reset lives to 3
  score = 0;   // Reset score to 0

  // Get references to score and lives elements
  const scoreElement = document.getElementById("score");
  const livesElement = document.getElementById("lives");

  // Update text content of the elements
  scoreElement.textContent = "Score: " + score;
  livesElement.textContent = "Lives: " + lives;

  displayWord(); // Generate a new target word and word choices
}
function handleWordClick(event) {
  const clickedWord = event.target.textContent.trim(); // Remove leading/trailing spaces
  const target = targetWord.textContent.split(": ")[1];
  

  if (clickedWord === target) {
    score++;
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = "Score: " + score; // Update score text
    alert("Correct!"); // Optional: Keep the audio cue
  } else {
    lives--;
    const livesElement = document.getElementById("lives");
    livesElement.textContent = "Lives: " + lives; // Update lives text
    alert("Wrong. Try Again."); // Optional: Keep the audio cue

    if (lives === 0) {
      alert("Game Over! Score: " + score);
      //const restartButton = document.getElementById("restart-button");
      //restartButton.style.display = "block"; // Make the button visible
      setTimeout(function() {
        restartGame();
      }, 1000); // Restart after 2 seconds (adjust as needed)
    }
  }

  displayWord();
}

displayWord();

wordBoxes.forEach(box => box.addEventListener("click", handleWordClick));

//const restartButton = document.getElementById("restart-button");
//restartButton.addEventListener("click", restartGame);

const goBackButton = document.getElementById("goBackButton");

goBackButton.addEventListener("click", function() {
  // Redirect the user to the desired back page (replace with your actual URL)
  window.location.href = "DashboardGames.html";
});