const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const resetButton = document.querySelector(".btn__reset");
const overlay = document.getElementById("overlay");
const message = document.querySelector(".title");
const hearts = document.querySelectorAll('.tries img');

let missed = 0;

// Hide the start screen overlay on clicking the start button
resetButton.addEventListener("click", () => {
  overlay.style.display = "none";
});

// An array of phrases to choose from
const phrases = [
    'I am all ears', 'A piece of cake', 'Better late than never', 'Break a leg', 'Easier said than done'];

// Returns a random phrase from the phrases array as an array of characters
function getRandomPhraseAsArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex].split('');
}

// Add the characters of a phrase 
function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        const ul = phrase.children[0];
        li.textContent = arr[i];
        ul.appendChild(li);
        if (arr[i] === " ") {
            li.className = 'space';
        } else {
            li.className = 'letter';
        }
    }
}
const phraseArray = getRandomPhraseAsArray (phrases);
addPhraseToDisplay(phraseArray);

// Check if the clicked letter exists in the phrase and display the matching letters
function checkLetter(letterButton) {
  let matchingLetter = null;
  const letters = document.getElementsByClassName("letter");
  for (let i = 0; i < letters.length; i++) {
    if (letters[i].textContent.toLowerCase() === letterButton.textContent) {
      letters[i].classList.add("show");
      matchingLetter = letterButton.textContent;
    }
  }
  return matchingLetter;
}

// Update the hearts 
function updateHearts() {
  hearts[missed].src = "images/lostHeart.png";
  hearts[missed].classList.add("died");
  missed++;
}

// Check if the player has won or lost and show message
 function checkWin() {
    const letters = document.getElementsByClassName("letter");
    const shownLetters = document.getElementsByClassName("show");
  
    if (letters.length === shownLetters.length) {
      overlay.classList.replace("start", "win");
      message.textContent = "Congratulations, You Won!";
      overlay.style.display = "flex";
    } else if (missed >= hearts.length) {
      overlay.classList.replace("start", "lose");
      message.textContent = "Better luck next time!";
      overlay.style.display = "flex";
    }
  }
// Add event listeners to the qwerty button
qwerty.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      event.target.classList.add("chosen");
      event.target.disabled = true;
  
      const letterFound = checkLetter(event.target);
  
      if (!letterFound) {
        updateHearts();
      }
    }
    checkWin();
  });