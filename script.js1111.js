
const gameQuestions = [
    {
        question: "Этот ингредиент часто используется для приготовления борща.",
        options: ["Морковь", "Свёкла", "Картофель", "Огурец"],
        answer: "Свёкла"
    },
    {
        question: "Этот продукт используют для приготовления картофельного пюре.",
        options: ["Банан", "Картофель", "Помидор", "Перец"],
        answer: "Картофель"
    },
    {
        question: "Этот продукт является основой для приготовления сырников.",
        options: ["Мука", "Молоко", "Творог", "Сахар"],
        answer: "Творог"
    },
    {
        question: "Какой ингредиент обычно добавляют в овощной салат?",
        options: ["Огурец", "Шоколад", "Мёд", "Какао"],
        answer: "Огурец"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("nextQuestion");

// Показ вопроса

function showQuestion() {
    const question = gameQuestions[currentQuestionIndex];

    questionElement.textContent = question.question;
    optionsElement.innerHTML = "";
    feedbackElement.textContent = "";
    nextButton.hidden = true;
    nextButton.textContent = "Следующий вопрос";

    answered = false;

    question.options.forEach(option => {
        const button = document.createElement("button");

        button.textContent = option;
        button.className = "option-btn";

        button.addEventListener("click", () => {
            checkAnswer(option, button);
        });

        optionsElement.appendChild(button);
    });
}

// Проверка ответа

function checkAnswer(selected, selectedButton) {
    if (answered) return;

    answered = true;

    const correct = gameQuestions[currentQuestionIndex].answer;

    if (selected === correct) {
        score++;
        feedbackElement.textContent = "Правильно!";
        feedbackElement.style.color = "green";
    } else {
        feedbackElement.textContent = "Неправильно! Ответ: " + correct;
        feedbackElement.style.color = "red";
    }

    scoreElement.textContent = score;

    const buttons = optionsElement.querySelectorAll("button");

    buttons.forEach(button => {
        button.disabled = true;

        if (button.textContent === correct) {
            button.style.background = "#269b4b";
        } else if (button === selectedButton) {
            button.style.background = "#d93025";
        }
    });

    nextButton.hidden = false;

    if (currentQuestionIndex === gameQuestions.length - 1) {
        nextButton.textContent = "Начать заново";
    }
}

// Следующий вопрос

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex >= gameQuestions.length) {
        currentQuestionIndex = 0;
        score = 0;
        scoreElement.textContent = score;
    }

    showQuestion();
});

// Переключение видео

const videoTrack = document.getElementById("videoTrack");

document.getElementById("prevBtn").addEventListener("click", () => {
    videoTrack.scrollBy({
        left: -videoTrack.clientWidth,
        behavior: "smooth"
    });
});

document.getElementById("nextBtn").addEventListener("click", () => {
    videoTrack.scrollBy({
        left: videoTrack.clientWidth,
        behavior: "smooth"
    });
});

// Подписка

document.getElementById("subscribeForm").addEventListener("submit", event => {
    event.preventDefault();

    document.getElementById("subscribeMessage").textContent =
        "Спасибо за подписку!";

    event.target.reset();
});

// Поиск

document.getElementById("searchButton").addEventListener("click", () => {
    const text = document.getElementById("searchInput")
        .value.trim().toLowerCase();

    if (!text) {
        alert("Введите текст для поиска!");
        return;
    }

    const cards = document.querySelectorAll(".video-card");

    let found = false;

    cards.forEach(card => {
        if (card.textContent.toLowerCase().includes(text)) {
            found = true;
        }
    });

    alert(found ? "Результат найден!" : "Ничего не найдено!");
});

// Запуск игры

showQuestion();
