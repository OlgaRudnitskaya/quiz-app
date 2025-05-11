// База данных всех стран и их столиц (добавьте больше стран)
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
    // Добавьте остальные страны...
];

document.addEventListener('DOMContentLoaded', function() {
    // ... (остальной код остаётся таким же до функции startGame)

    function startGame() {
        if (!startScreen || !quizScreen) return;
        
        startScreen.style.display = "none";
        quizScreen.style.display = "block";
        
        // Проверяем, чтобы не запросили больше вопросов, чем есть стран
        totalQuestions = Math.min(totalQuestions, countries.length);
        
        // Создаём вопросы с рандомными вариантами
        const shuffledCountries = [...countries]
            .sort(() => Math.random() - 0.5) // Более случайное перемешивание
            .slice(0, totalQuestions);
            
        questions = shuffledCountries.map(country => {
            // Создаем новый массив столиц для каждого вопроса
            const availableCapitals = countries
                .map(c => c.capital)
                .filter(c => c !== country.capital);
                
            // Выбираем 3 уникальные случайные столицы
            const wrongCapitals = [];
            while (wrongCapitals.length < 3 && availableCapitals.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableCapitals.length);
                wrongCapitals.push(availableCapitals.splice(randomIndex, 1)[0]);
            }
            
            // Смешиваем варианты
            const options = [...wrongCapitals, country.capital]
                .sort(() => Math.random() - 0.5);
            
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

    // ... (остальной код остаётся таким же)
});

