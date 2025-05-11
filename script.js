// База данных вопросов (столицы мира)
const allQuestions = [
    { question: "Столица Франции?", options: ["Париж", "Берлин", "Мадрид", "Рим"], answer: "Париж" },
    { question: "Столица Японии?", options: ["Пекин", "Сеул", "Токио", "Бангкок"], answer: "Токио" },
    { question: "Столица Бразилии?", options: ["Рио-де-Жанейро", "Бразилиа", "Сан-Паулу", "Буэнос-Айрес"], answer: "Бразилиа" },
    { question: "Столица Канады?", options: ["Торонто", "Оттава", "Ванкувер", "Монреаль"], answer: "Оттава" },
    { question: "Столица Австралии?", options: ["Сидней", "Мельбурн", "Канберра", "Брисбен"], answer: "Канберра" },
    // Добавьте ещё вопросы по аналогии...
];

let questions = [];
let currentQuestion = 0;
let score = 0;
let totalQuestions = 0;

// Ждём полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    const startScreen = document.getElementById("start-screen");
    const quizScreen = document.getElementById("quiz-screen");
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const nextButton = document.getElementById("next-btn");
    const resultElement = document.getElementById("result");
    const progressElement = document.getElementById("progress");

    // Обработчик выбора количества вопросов
    document.querySelectorAll(".count-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            totalQuestions = parseInt(e.target.dataset.count);
            startGame();
        });
    });

    // Начало игры
    function startGame() {
        if (!startScreen || !quizScreen) return;
        
        startScreen.style.display = "none";
        quizScreen.style.display = "block";
        
        // Выбираем случайные вопросы из базы
        questions = [...allQuestions]
            .sort(() => 0.5 - Math.random())
            .slice(0, totalQuestions);
        
        currentQuestion = 0;
        score = 0;
        showQuestion();
    }

    // Показ вопроса
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
        
        progressElement.textContent = `Вопрос ${currentQuestion + 1} из ${totalQuestions}`;
    }

    // Проверка ответа
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

    // Показ результата
    function showResult() {
        questionElement.textContent = "";
        optionsElement.innerHTML = "";
        nextButton.style.display = "none";
        
        const percentage = Math.round((score / totalQuestions) * 100);
        resultElement.textContent = `Ваш результат: ${score} из ${totalQuestions} (${percentage}%)`;
        
        if (percentage >= 80) {
            resultElement.style.color = "#2ecc71";
        } else if (percentage >= 50) {
            resultElement.style.color = "#f39c12";
        } else {
            resultElement.style.color = "#e74c3c";
        }
    }

    nextButton.addEventListener("click", showQuestion);
});
