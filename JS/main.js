fetch(
  "https://raw.githubusercontent.com/YoussefSamirM/Questions-api/refs/heads/main/questions.json"
)
  .then((response) => {
    let data = response.json();
    return data;
  })
  .then((questions) => {
    let question = document.querySelector(".question");
    let answers = document.querySelector(".answers");
    let nextBtn = document.querySelector(".next-btn");

    let currentQuestionIndex = 0;
    let result = 0;

    function startQuiz() {
      reset();

      nextBtn.innerHTML = "Next";

      currentQuestionIndex = 0;
      result = 0;

      changeQuestions_Answers();
    }

    function changeQuestions_Answers() {
      reset();
      let currentQuestion = questions[currentQuestionIndex];
      let currentQuestionNum = currentQuestionIndex + 1;

      question.innerHTML = `${currentQuestionNum}) ${currentQuestion.question}`;

      currentQuestion.answers.forEach((button) => {
        let btn = document.createElement("button");
        btn.classList.add("btn");
        btn.innerHTML = button.text;
        btn.setAttribute("data-state", button.state);

        answers.appendChild(btn);

        btn.addEventListener("click", answerSelected);
      });
    }

    function reset() {
      nextBtn.style.display = "none";
      while (answers.firstElementChild) {
        answers.firstElementChild.remove();
      }
    }

    function answerSelected(button) {
      let selectedAnswer = button.target;
      if (selectedAnswer.dataset.state == "true") {
        selectedAnswer.classList.add("correct");
        result++;
      } else {
        selectedAnswer.classList.add("incorrect");
      }
      nextBtn.style.display = "block";

      Array.from(answers.children).forEach((btn) => {
        if (btn.dataset.state == "true") {
          btn.classList.add("correct");
        }
        btn.disabled = true;
      });
    }

    function nextChecked() {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        changeQuestions_Answers();
      } else {
        showResult();
      }
    }

    function showResult() {
      reset();
      nextBtn.style.display = "block";
      nextBtn.innerHTML = "Restart Quiz";
      question.innerHTML = `Your Result Is ${result} From ${currentQuestionIndex}`;
    }

    nextBtn.addEventListener("click", () => {
      if (currentQuestionIndex < questions.length) {
        nextChecked();
      } else {
        startQuiz();
      }
    });

    startQuiz();
  });
