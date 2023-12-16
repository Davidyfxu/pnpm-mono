const quizData = [
  {
    question: "How old are you?",
    a: "10",
    b: "20",
    c: "30",
    d: "40",
    correct: "c",
  },
  {
    question: "What is the most used Programming language?",
    a: "C",
    b: "Java",
    c: "Python",
    d: "Javascript",
    correct: "a",
  },
  {
    question: "Who is the President of US?",
    a: "David",
    b: "Donald",
    c: "Bill",
    d: "George",
    correct: "b",
  },
];
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const quiz = document.getElementById("quiz");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];

  questionEl.innerHTML = currentQuizData.question;
  a_text.innerHTML = currentQuizData.a;
  b_text.innerHTML = currentQuizData.b;
  c_text.innerHTML = currentQuizData.c;
  d_text.innerHTML = currentQuizData.d;
}
function getSelected() {
  let answer;

  answerEls.forEach((answerE1) => {
    if (answerE1.checked) {
      answer = answerE1.id;
    }
  });
  return answer;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }
    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `<h2>You answered correctly at ${score}/${quizData.length} questions</h2>
      <button onClick="location.reload()">Reload</button>`;
    }
  }
});
