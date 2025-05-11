// База данных всех стран и их столиц
const countries = [
    { country: "Франция", capital: "Париж" },
    { country: "Япония", capital: "Токио" },
    { country: "Бразилия", capital: "Бразилиа" },
    { country: "Канада", capital: "Оттава" },
    { country: "Австралия", capital: "Канберра" },
    { country: "Россия", capital: "Москва" },
    { country: "Германия", capital: "Берлин" },
    { country: "Италия", capital: "Рим" },
    { country: "Испания", capital: "Мадрид" },
    { country: "Великобритания", capital: "Лондон" },
    { country: "США", capital: "Вашингтон" },
    { country: "Китай", capital: "Пекин" },
    { country: "Индия", capital: "Нью-Дели" },
    { country: "Южная Корея", capital: "Сеул" },
    { country: "Таиланд", capital: "Бангкок" },
    { country: "Аргентина", capital: "Буэнос-Айрес" },
    { country: "Мексика", capital: "Мехико" },
    { country: "ЮАР", capital: "Претория" },
    { country: "Египет", capital: "Каир" },
    { country: "Турция", capital: "Анкара" },
    // Добавьте остальные страны по необходимости...
];

// Получаем все столицы для создания неправильных вариантов
const allCapitals = countries.map(c => c.capital);

let questions = [];
let currentQuestion = 0;
let score = 0;
let totalQuestions = 0;

document.addEventListener('DOMContentLoaded', function() {
    const startScreen = document.getElementById("start-screen");
    const quizScreen = document.getElementById("quiz-screen");
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const nextButton = document.getElementById("next-btn");
    const resultElement = document.getElementById("result");
    const progressElement = document.getElementById("progress");

    document.querySelectorAll(".count-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            totalQuestions = parseInt(e.target.dataset.count);
            startGame();
        });
    });

    function startGame() {
        if (!startScreen || !quizScreen) return;
        
        startScreen.style.display = "none";
        quizScreen.style.display = "block";
        
        // Создаём вопросы с рандомными вариантами
        const shuffledCountries = [...countries].sort(() => 0.5 - Math.random());
        questions = shuffledCountries.slice(0, totalQuestions).map(country => {
            // Выбираем 3 случайные столицы (исключая правильную)
            const wrongCapitals = allCapitals
                .filter(c => c !== country.capital)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);
            
            // Смешиваем правильный и неправильные ответы
            const options = [...wrongCapitals, country.capital]
                .sort(() => 0.5 - Math.random());
            
            return {
                question: `Столица ${country.country}?`,
                options: options,
                answer: country.capital
            };
        });
        
        currentQuestion = 0;
        score = 0;
        showQuestion();
    }

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
        nextButton.style.display = "none";
    }

    function selectAnswer(answer) {
        const correct = questions[currentQuestion].answer;
        const buttons = optionsElement.querySelectorAll("button");
        
        buttons.forEach(button => {
            button.disabled = true;
            if (button.textContent === correct) {
                button.style.backgroundColor = "#2ecc71";
            } else if (button.textContent === answer && answer !== correct) {
                button.style.backgroundColor = "#e74c3c";
            }
        });
        
        if (answer === correct) {
            score++;
        }
        
        nextButton.style.display = "block";
    }

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

    nextButton.addEventListener("click", () => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    });
});
