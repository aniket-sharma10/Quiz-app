let questions = [
    {
        question: "What does the acronym 'CSS' stand for in web development?",
        answers: [
          { text: "Counter Strike: Source", correct: false },
          { text: "Computer Style Sheets", correct: false },
          { text: "Cascading Style Sheets", correct: true },
          { text: "Code Syntax System", correct: false }
        ]
      },
      {
        question: "Which of the following is a JavaScript library for building user interfaces?",
        answers: [
          { text: "jQuery", correct: true },
          { text: "JavaFX", correct: false },
          { text: "Joomla", correct: false },
          { text: "JSON", correct: false }
        ]
      },
      {
        question: "What is the purpose of the 'git clone' command in Git?",
        answers: [
          { text: "Create a new branch", correct: false },
          { text: "Merge branches", correct: false },
          { text: "Copy a repository into a new directory", correct: true },
          { text: "Commit changes to the repository", correct: false }
        ]
      },
      {
        question: "In Python, what is the purpose of the 'range()' function?",
        answers: [
          { text: "Generate a random number", correct: false },
          { text: "Create a list of numbers in a specified range", correct: true },
          { text: "Calculate the square root", correct: false },
          { text: "Check the length of a string", correct: false }
        ]
      },
      {
        question: "What does the term 'API' stand for in programming?",
        answers: [
          { text: "Application Programming Interface", correct: true },
          { text: "Advanced Programming Instruction", correct: false },
          { text: "Automated Program Interaction", correct: false },
          { text: "Application Process Integration", correct: false }
        ]
      }
]

let ques = document.querySelector('.question');
let options = document.querySelector('.options');
let next = document.querySelector('.next');

let currQuesIndex = 0;
let score = 0;

function startQuiz(){
    currQuesIndex = 0;
    score = 0;
    next.innerHTML = "Next";
    showQuestion();
}
startQuiz()

function showQuestion(){
    resetState();
    let currQues = questions[currQuesIndex];
    let quesNo = currQuesIndex + 1;
    ques.innerHTML = quesNo + ". " + currQues.question;

    currQues.answers.forEach(answer => {
        let btn = document.createElement('button');
        btn.classList.add("option")
        btn.innerHTML = answer.text;
        options.appendChild(btn);

        if(answer.correct){
            btn.dataset.correct = answer.correct;
        }
        btn.addEventListener("click", selectOption);
    }); 
}

function resetState(){
    next.style.display = "none";
    while(options.firstChild){
        options.removeChild(options.firstChild);
    }
}

function selectOption(e){
    let selectedBtn = e.target;
    let isCorrect = (selectedBtn.dataset.correct === "true");

    // checking if user selected correct or incorrect option
    if(isCorrect){
      selectedBtn.classList.add("correct");
      score++;
    }
    else{
      selectedBtn.classList.add("incorrect");
    }

    // disabling buttons after selecting one option
    Array.from(options.children).forEach(btn => {
        if(btn.dataset.correct === "true"){
            btn.classList.add("correct");
        }
        btn.disabled = true;
    });
    next.style.display = "block";
}

function showScore(){
    resetState();
    ques.innerHTML = `You scored ${score} out of ${questions.length}!!`;
    next.innerHTML = "Restart!";
    next.style.display = "block";
}

function handleNextBtn(){
    currQuesIndex++;
    if(currQuesIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

next.addEventListener("click", (e)=> {
    if(currQuesIndex < questions.length){
        handleNextBtn();
    }
    else{
        startQuiz();
    }
})