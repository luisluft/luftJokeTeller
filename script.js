const button = document.getElementById("button");
const audioElement = document.getElementById("audio");
const jokeText = document.getElementById("jokeText");

function showJokeText(text) {
  jokeText.innerText = text;
}

function hideJokeText() {
  jokeText.innerText = "";
}

function toggleButton() {
  button.disabled = !button.disabled;
}

function textToSpeech(text) {
  VoiceRSS.speech({
    key: "e5d0ef304b8e4950ab5b4f24cac943ed",
    src: text,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

async function getJokes() {
  toggleButton();

  let joke = "";
  const apiUrl = "https://v2.jokeapi.dev/joke/Programming";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) joke = `${data.setup} ...${data.delivery}`;
    else joke = data.joke;
    console.log("🚀 ~ joke", joke);
    textToSpeech(joke);
    showJokeText(joke);
  } catch (error) {
    console.log("🚀 ~ error", error);
  }
}

// Event listeners
button.addEventListener("click", getJokes);

audioElement.addEventListener("ended", toggleButton);
audioElement.addEventListener("ended", hideJokeText);
