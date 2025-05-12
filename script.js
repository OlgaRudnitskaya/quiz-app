const TOTAL_QUESTIONS = 30;
let questions = [];
let currentQuestion = 0;
let score = 0;
let currentUser = null;

document.addEventListener('DOMContentLoaded', function() {
    const loginScreen = document.getElementById("login-screen");
    const quizScreen = document.getElementById("quiz-screen");
    const ratingScreen = document.getElementById("rating-screen");
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const nextButton = document.getElementById("next-btn");
    const resultElement = document.getElementById("result");
    const progressElement = document.getElementById("progress");
    const loginBtn = document.getElementById("login-btn");
    const usernameInput = document.getElementById("username");
    const restartBtn = document.getElementById("restart-btn");
    const ratingElement = document.getElementById("rating");
    const userGreeting = document.getElementById("user-greeting");

    // Показать рейтинг при загрузке
    fetchRating();
    loginScreen.style.display = "block";
    quizScreen.style.display = "none";
    ratingScreen.style.display = "none";

    // Обработчик входа
    loginBtn.addEventListener("click", async () => {
        const username = usernameInput.value.trim();
        if (username) {
            currentUser = username;
            await startGame();
        } else {
            alert("Пожалуйста, введите ваше имя");
        }
    });

    // Начало игры
    async function startGame() {
        loginScreen.style.display = "none";
        quizScreen.style.display = "block";
        ratingScreen.style.display = "none";
        
        userGreeting.textContent = `Играет: ${currentUser}`;
        
        // Загружаем вопросы с сервера
        try {
            const response = await fetch('/api/questions');
            questions = await response.json();
            currentQuestion = 0;
            score = 0;
            showQuestion();
        } catch (error) {
            console.error("Ошибка загрузки вопросов:", error);
            alert("Не удалось загрузить вопросы. Попробуйте позже.");
        }
    }

    // Остальные функции (showQuestion, selectAnswer) остаются такими же, как у вас

    // Показ результата
    async function showResult() {
        questionElement.textContent = "";
        optionsElement.innerHTML = "";
        nextButton.style.display = "none";
        
        const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);
        resultElement.textContent = `Ваш результат: ${score} из ${TOTAL_QUESTIONS} (${percentage}%)`;
        
        // Отправляем результаты на сервер
        try {
            await fetch('/api/save-result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: currentUser,
                    score: score,
                    totalQuestions: TOTAL_QUESTIONS
                })
            });
            
            await fetchRating();
            quizScreen.style.display = "none";
            ratingScreen.style.display = "block";
        } catch (error) {
            console.error("Ошибка сохранения результата:", error);
            alert("Не удалось сохранить результат, но вы можете продолжить.");
        }
    }

    // Загрузка рейтинга с сервера
    async function fetchRating() {
        try {
            const response = await fetch('/api/rating');
            const sortedUsers = await response.json();
            
            let html = `<table>
                <tr>
                    <th>Игрок</th>
                    <th>Лучший результат</th>
                    <th>Средний %</th>
                    <th>Игр сыграно</th>
                </tr>`;
            
            sortedUsers.forEach(user => {
                html += `<tr ${user.name === currentUser ? 'style="font-weight:bold;background-color:#f0f0f0"' : ''}>
                    <td>${user.name}</td>
                    <td>${user.bestScore}/${TOTAL_QUESTIONS}</td>
                    <td>${user.avgScore}%</td>
                    <td>${user.totalGames}</td>
                </tr>`;
            });
            
            html += "</table>";
            ratingElement.innerHTML = html;
        } catch (error) {
            console.error("Ошибка загрузки рейтинга:", error);
            ratingElement.innerHTML = "<p>Не удалось загрузить рейтинг. Попробуйте позже.</p>";
        }
    }

    // Остальной ваш код...
});
