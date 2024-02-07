const favoriteSport: string[] = [
  "baseball",
  "football",
  "skateboarding",
  "snowboarding",
];

async function showGif(): Promise<void> {
  const button = document.getElementById("game-button");
  if (!button) return;

  // Create video element
  const video: HTMLVideoElement = document.createElement("video");
  video.setAttribute("loop", "true");
  video.setAttribute("autoplay", "true");
  video.setAttribute("muted", "true");
  video.setAttribute("playsinline", "true");

  // Apply any additional styles you need
  video.style.maxWidth = "100%";
  video.style.height = "auto";
  video.classList.add("rounded-full");

  // Create source element
  const source: HTMLSourceElement = document.createElement("source");
  source.src = "/ripper-snowboarder.mp4";
  source.type = "video/mp4";

  // Append source to video
  video.appendChild(source);

  // Set alt text equivalent for video (for accessibility, although not standard)
  video.setAttribute("title", "Correct");

  await new Promise<void>((resolve, reject) => {
    video.onloadeddata = () => resolve();
    video.onerror = () => reject(new Error("Video failed to load."));
  });

  // Replace button with video
  button.replaceWith(video);
}

function gifGame(): void {
  let guess: string | null;
  let numTries: number = 0;
  let correct: boolean = false;
  do {
    guess = prompt(
      `Which one is my favorite sport?\n\n${favoriteSport.join(", ")}`
    );
    numTries += 1;
    if (guess === null) {
      alert("Game aborted");
      return;
    }
    correct = checkGuess(guess.toLowerCase().trim(), numTries);
  } while (!correct);
}

function checkGuess(guess: string, numTries: number): boolean {
  // Check if the guess is among the favorite sports
  if (!favoriteSport.includes(guess)) {
    alert("That's not a valid sport from the list. Please try again.");
    return false; // Continue the game without incrementing numTries
  }

  if (guess === "snowboarding") {
    // Only show the winner message and the gif if the guess is "snowboarding"
    showGif();
    const message =
      numTries === 1
        ? `Winner! It only took you 1 try!`
        : `Winner! It only took you ${numTries} tries!`;
    alert(message);
    return true; // Correct guess
  } else {
    // Handle incorrect guesses
    let alertMessage;
    switch (guess) {
      case "baseball":
        alertMessage = "Incorrect guess again.";
        break;
      case "football":
        alertMessage = "Not even close dummy.";
        break;
      case "skateboarding":
        alertMessage = "Wrong guess again.";
        break;
      default:
        alertMessage = "Incorrect. Try again.";
    }
    alert(alertMessage);
    return false; // Incorrect guess
  }
}

export default gifGame;
