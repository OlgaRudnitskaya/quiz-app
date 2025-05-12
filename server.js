const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/quiz_game', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Модель пользователя
const UserSchema = new mongoose.Schema({
    name: String,
    totalGames: { type: Number, default: 0 },
    totalCorrect: { type: Number, default: 0 },
    bestScore: { type: Number, default: 0 }
});

const User = mongoose.model('User', UserSchema);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Папка с вашими HTML/CSS/JS

// API для вопросов
app.get('/api/questions', async (req, res) => {
    // Ваша логика генерации вопросов
    // ...
    res.json(questions);
});

// API для сохранения результата
app.post('/api/save-result', async (req, res) => {
    const { username, score, totalQuestions } = req.body;
    
    try {
        let user = await User.findOne({ name: username });
        
        if (!user) {
            user = new User({ name: username });
        }
        
        user.totalGames += 1;
        user.totalCorrect += score;
        if (score > user.bestScore) {
            user.bestScore = score;
        }
        
        await user.save();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API для рейтинга
app.get('/api/rating', async (req, res) => {
    try {
        const users = await User.find({});
        const sortedUsers = users.map(user => ({
            name: user.name,
            totalGames: user.totalGames,
            totalCorrect: user.totalCorrect,
            bestScore: user.bestScore,
            avgScore: (user.totalCorrect / (user.totalGames * TOTAL_QUESTIONS) * 100).toFixed(1)
        })).sort((a, b) => b.bestScore - a.bestScore);
        
        res.json(sortedUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
3. Инструкция по развертыванию
Установите Node.js и MongoDB

Создайте папку проекта с такой структурой:

/project
├── public
│   ├── index.html
│   ├── script.js
│   └── style.css
├── server.js
└── package.json
В package.json добавьте зависимости:

json
{
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^5.12.3",
    "cors": "^2.8.5"
  }
}
