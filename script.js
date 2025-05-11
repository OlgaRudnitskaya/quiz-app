const questions = [
    {
        question: "Какая столица Франции?",
        options: ["Берлин", "Мадрид", "Париж", "Рим"],
        answer: "Париж"
    },
    {
        question: "Сколько планет в Солнечной системе?",
        options: ["7", "8", "9", "10"],
        answer: "8"
    },
    {
        question: "Какой язык программирования используется для веб-разработки?",
        options: ["Java", "Python", "JavaScript", "C++"],
        answer: "JavaScript"
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const resultElement = document.getElementById("result");

function showQuestion() {
    const q = questions[currentQuestion];
    questionElement.textContent = q.question;
    optionsElement.innerHTML = "";

    q.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => selectAnswer(option));
        optionsElement.appendChild(button);
    });
}

function selectAnswer(answer) {
    const correct = questions[currentQuestion].answer;
    if (answer === correct) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionElement.textContent = "";
    optionsElement.innerHTML = "";
    nextButton.style.display = "none";
    resultElement.textContent = `Ваш результат: ${score} из ${questions.length}`;
}

nextButton.addEventListener("click", showQuestion);
showQuestion();
