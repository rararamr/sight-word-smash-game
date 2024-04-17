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

function handleWordClick(event) {
  const clickedWord = event.target.textContent.trim(); // Remove leading/trailing spaces
  const target = targetWord.textContent.split(": ")[1];

  if (clickedWord === target) {
    score++;
    alert("Correct! Score: " + score);
  } else {
    lives--;
    alert("Try Again! Lives remaining: " + lives);

    if (lives === 0) {
      alert("Game Over! Score: " + score);
      // You can disable clicking on word boxes here or add a restart button
    }
  }

  displayWord();
}

displayWord();

wordBoxes.forEach(box => box.addEventListener("click", handleWordClick));
