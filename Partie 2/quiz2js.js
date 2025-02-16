document.getElementById('configurationform').addEventListener('submit', function(event) {
    event.preventDefault();
    fetchQuizData();
});  // en appuyant sur demarrer quiz 

let reponsescorrectes = [];
let TimerDecrease;

function displayQuiz(questions) {
    document.getElementById('configuration').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';

    const quizquestions = document.querySelector('.questions');
    quizquestions.innerHTML = '';
    reponsescorrectes = [];

    questions.forEach(function(question, indexI) {
        const questionNumI = document.createElement('div');
        questionNumI.classList.add('question');
        questionNumI.innerHTML = `<p>${indexI + 1}. ${question.question}</p>`;

        let answers = [...question.incorrect_answers, question.correct_answer];
        answers.sort(() => Math.random() - 0.5); // pour que la bonne reponse soit randomly posee dans les choix 

        answers.forEach(function(answerJ) {
            const answerJ_ofQuestionI = document.createElement('div');
            answerJ_ofQuestionI.innerHTML = `<input type="radio" name="${indexI}" value="${answerJ}"> ${answerJ}`;
            questionNumI.appendChild(answerJ_ofQuestionI);
        });

        quizquestions.appendChild(questionNumI);
        reponsescorrectes.push(question.correct_answer);
    });
}


function startTimer() {
    numberquestions = document.getElementById("numberquestions").value;
    let timer = numberquestions * 10;
    document.getElementById("timeleft").textContent = timer;

    function TimerUpdate() {
        timer--; // le timer diminue de 1

        if (timer == 0) {
            alert("Temps du quiz écoulé");
            clearInterval(TimerDecrease);

            let radios = document.querySelectorAll('input[type="radio"]')
            radios.forEach(radio => {
                radio.disabled = true;
            }); // freeze le formulaire quand le minuteur finit 
        }

        // modifier sur la page HTML le timer pour qu'il apparaisee a l'utilisateur combien de temps il lui reste
        document.getElementById("timeleft").textContent = timer
    }
    TimerDecrease = setInterval(TimerUpdate, 1000); // la fonction de diminuer le minuteur se repete chaque 1000 ms (1s)
}

function fetchQuizData() { // starts the timer and displays the questions generated from the url 
    const category = document.getElementById('category').value;
    const difficulty = document.getElementById('difficulty').value;
    const type = document.getElementById('type').value;
    const numQuestions = document.getElementById('numberquestions').value;
    const url = `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`;

    fetch(url)  // le url est un fichier json, on applique donc les operations pour transformer json en js 
        .then(response => response.json())
        .then(data => {
            displayQuiz(data.results);  // afficher le quiz 
            startTimer(); // start the timer when the quiz begins
        })
}

function ScoreUpdate() {
    let score = 0;
    // selecting all questions by using the queryselectall on all divs that have class = question
    let questions = document.querySelectorAll(".question")
    questions.forEach(function(question, index) {
        rightanswer = reponsescorrectes[index];
        selectedanswer = question.querySelector(`input[name="${index}"]:checked`)
        if (selectedanswer && rightanswer == selectedanswer.value) {
            score++;
        }
    });
    document.getElementById("score").textContent = score;
}

function submit() {

    clearInterval(TimerDecrease);

    ScoreUpdate();

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    }); // to scroll to the top of the page after clicking on valider 

    let radios = document.querySelectorAll('input[type="radio"]')
    radios.forEach(radio => {
        radio.disabled = true;
    }); // freeze le formulaire apres submission

}
