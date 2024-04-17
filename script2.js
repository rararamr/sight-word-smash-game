const targetWord = document.getElementById("target-word");
const wordBoxes = document.querySelectorAll(".word-box");

const sightWords = ["the", "a", "you", "like", "see", "is", "at"];

let score = 0;

function pickRandomWord() {
  const randomIndex = Math.floor(Math.random() * sightWords.length);
  return sightWords[randomIndex];
}

function shuffleArray(array) { // Helper function to shuffle the word choices
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function displayWord() {
  const target = pickRandomWord();
  const shuffledWords = shuffleArray([...sightWords]); // Copy sightWords to avoid mutation
  const wordChoices = shuffledWords.slice(0, 4); // Pick 4 random words for choices

  // Ensure the target word is included in the choices
  const targetIndex = wordChoices.indexOf(target);
  if (targetIndex === -1) {
    wordChoices[Math.floor(Math.random() * 4)] = target; // Replace a random choice with the target
  }

  targetWord.textContent = "Smash the word: " + target;

  // Update word box content with shuffled choices
  wordBoxes.forEach((box, index) => {
    box.firstChild.textContent = wordChoices[index];
  });
}

function handleWordClick(event) {
  const clickedWord = event.target.textContent;
  const target = targetWord.textContent.split(": ")[1];

  if (clickedWord === target) {
    score++;
    alert("Correct! Score: " + score);
  } else {
    alert("Try Again!");
  }

  displayWord();
}

displayWord();

wordBoxes.forEach(box => box.addEventListener("click", handleWordClick));
