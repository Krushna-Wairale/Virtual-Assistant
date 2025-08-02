let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let logo = document.getElementById("logo");

// Speak WITHOUT blinking (for greeting)
function speakWithoutEffect(text) {
    window.speechSynthesis.cancel(); // Prevent overlap
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-GB";
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
}

// Speak WITH blinking (for responses)
function speakWithEffect(text) {
    window.speechSynthesis.cancel();
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-GB";
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;

    // Start blinking
    logo.classList.add("blinking-logo");

    // Stop blinking when done
    utterance.onend = () => {
        logo.classList.remove("blinking-logo");
    };

    window.speechSynthesis.speak(utterance);
}

// Greet user on page load
function wishMe() {
    const hour = new Date().getHours();
    if (hour < 12) {
        speakWithoutEffect("Have a Very Good Morning buddy hope you are doing good");
    } else if (hour < 16) {
        speakWithoutEffect("Have a Very Good Afternoon buddy hope you doing good");
    } else {
        speakWithoutEffect("Have a Very Good Evening buddy hope you doing good");
    }
}

let greeted = false;

function handleFirstInteraction() {
    if (!greeted) {
        wishMe();
        greeted = true;

        // Stop listening after first greeting
        window.removeEventListener("click", handleFirstInteraction);
        window.removeEventListener("keydown", handleFirstInteraction);
    }
}

// Speak only after first click or keypress (required by browser policies)
window.addEventListener("click", handleFirstInteraction);
window.addEventListener("keydown", handleFirstInteraction);

// window.addEventListener("load", () => {
//     wishMe();
// });

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    let transcript = event.results[0][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
});

function takeCommand(message) {
    if (message.includes("hello") || message.includes("hi")) {
        speakWithEffect("Hello buddy, what can I help you?");
    } 
    else if (message.includes("who are you")) {
        speakWithEffect("I am your virtual assistant, created by krushna wairale.");
    } 
    else if (message.includes("what can you do")) {
        speakWithEffect("I can open some of social media platform for you");
    } 
    else if (message.includes("pallavi tayde")) {
        speakWithEffect("You are best amoung best mavshi in the universe i love you boda");
    } 
    else if (message.includes("baba")) {
        speakWithEffect("god bless you my boda sanchin rao & bachu");
    } 
    else if (message.includes("open youtube")) {
        speakWithEffect("Opening YouTube For You");
        window.open("https://www.youtube.com", "_blank");
    } 
    else if (message.includes("open google")) {
        speakWithEffect("Opening Google For You");
        window.open("https://www.google.com", "_blank");
    } 
    else if (message.includes("open instagram")) {
        speakWithEffect("Opening Instagram For You");
        window.open("https://www.instagram.com", "_blank");
    } 
    else if (message.includes("open linkedin")) {
        speakWithEffect("Opening Linkedin For You");
        window.open("https://www.linkedin.com", "_blank");
    } 
    else if (message.includes("open facebook")) {
        speakWithEffect("Opening Facebook For You");
        window.open("https://www.facebook.com", "_blank");
    }
    else if (message.includes("open github")) {
        speakWithEffect("Opening GitHub For You");
        window.open("https://github.com/", "_blank");
    }
    else {
        speakWithEffect("Sorry, Thise is Out of my Domain.");
    }
}
