document.getElementById('configurationform').addEventListener('submit', function(event) {
    event.preventDefault();
    fetchQuizData();
});  //en appuyant sur demarrer quiz 

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

        let answers = [];
        for (let i = 0; i < question.incorrect_answers.length; i++) { // directement l'API fournit pour les questions a choix multiple, 1 bonne reponse et 3 mauvaises reponses
            // et pour les questions a choix True/false : 1 vraie et 1 fausse 
            answers[i] = question.incorrect_answers[i];
        } // on garantit la presence de la bonne reponse dans la liste des reponses answers 
        answers[answers.length] = question.correct_answer;  // on ajoute dans answers d'une question, les reponses a cette question

        trialeatoire(answers); // pour que la bonne reponse soit randomly posee dans les choix 

        answers.forEach(function(answerJ) {
            const answerJ_ofQuestionI = document.createElement('div');
            answerJ_ofQuestionI.innerHTML = `<input type="radio" name="${indexI}" value="${answerJ}"> ${answerJ}`;
            questionNumI.appendChild(answerJ_ofQuestionI); // a chaque question, on ajoute ses reponses possibles
        });

        quizquestions.appendChild(questionNumI);  // on ajoute dans quizquestions chaque question du quiz
        reponsescorrectes.push(question.correct_answer); 
    });
}



// fonction pour trier les reponses aleatoirement , cette fct est utilisée au sein de la fct displayquiz pour preparer les reponses
// on utilise l'algorithme Fisher-Yates
function trialeatoire(answers) {
    for (let i = answers.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Un index aléatoire entre 0 et i
        [answers[i], answers[j]] = [answers[j], answers[i]]; // Échange des éléments
    }
}





function startTimer() {
    numberquestions = document.getElementById("numberquestions").value;
    let timer = numberquestions * 10;
    document.getElementById("timeleft").textContent = timer;

    function TimerUpdate() {
        timer--; // le timer diminue de 1

        if (timer == 0) {
            alert("Temps du quiz écoulé");
            clearInterval(TimerDecrease); // et on arrete le timer, en arretant la fct qui le fait diminuer chaque 1s
            ScoreUpdate(); // update du score quand le minuteur est ecoulé mm si l'utilisateur ne valide pas ses reponses
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            }); // to scroll to the top of the page after the timer ends  

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
