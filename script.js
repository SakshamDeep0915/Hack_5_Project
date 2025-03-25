// Navigation Toggle
document.querySelector('.nav-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Quiz Logic
if (document.querySelector('#quiz')) {
    const questions = [
        {
            question: "What percentage of Fortune 500 CEOs are women as of 2023?",
            choices: ["10%", "15%", "8.8%", "20%"],
            correct: 2
        },
        {
            question: "In which year was the UN Convention on the Elimination of All Forms of Discrimination against Women adopted?",
            choices: ["1979", "1985", "1969", "1975"],
            correct: 0
        },
        {
            question: "What is the term for the economic empowerment of women?",
            choices: ["Female Economics", "Women's Capital", "Feminist Economy", "Gender Economics"],
            correct: 3
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    function loadQuestion() {
        const questionEl = document.getElementById('question');
        const choicesEl = document.getElementById('choices');
        const currentQ = questions[currentQuestion];

        questionEl.textContent = currentQ.question;
        choicesEl.innerHTML = '';

        currentQ.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-button';
            button.textContent = choice;
            button.onclick = () => checkAnswer(index);
            choicesEl.appendChild(button);
        });
    }

    function checkAnswer(choice) {
        if (choice === questions[currentQuestion].correct) {
            score++;
        }

        currentQuestion++;

        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        const quizEl = document.getElementById('quiz');
        const resultsEl = document.getElementById('quiz-results');
        const scoreEl = document.getElementById('score');

        document.querySelector('.quiz-question').style.display = 'none';
        resultsEl.classList.remove('hidden');
        scoreEl.textContent = `${score} out of ${questions.length}`;

        document.getElementById('restart').onclick = restartQuiz;
    }

    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        document.querySelector('.quiz-question').style.display = 'block';
        document.getElementById('quiz-results').classList.add('hidden');
        loadQuestion();
    }

    // Initialize quiz
    loadQuestion();
}

// Animate statistics on scroll
if (document.querySelector('.stats-grid')) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelector('.progress').style.width = 
                    entry.target.querySelector('.progress').style.width;
            }
        });
    });

    document.querySelectorAll('.stat-card').forEach(card => {
        observer.observe(card);
    });
}

// Add smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});