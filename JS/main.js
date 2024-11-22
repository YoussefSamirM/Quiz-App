fetch(
  "https://raw.githubusercontent.com/YoussefSamirM/Questions-api/refs/heads/main/questions.json"
)
  .then((response) => {
    let data = response.json();
    return data;
  })
  .then((data) => {
    const questions = data;
    return questions;
  })
  .then((questions) => {
    const questionElement = document.querySelector(".question");
    const answers = document.querySelector(".answers");
    const nextBtn = document.querySelector(".next");

    let currentQuestionIndex = 0;
    let result = 0;

    function start() {
      currentQuestionIndex = 0;
      result = 0;

      nextBtn.innerHTML = "Next";
      nextBtn.style = "display:none;";

      changeQuestionsAndAnswers();
    }

    function changeQuestionsAndAnswers() {
      resetState();
      let currentQuestion = questions[currentQuestionIndex];

      let questionNumber = currentQuestionIndex + 1;

      questionElement.innerHTML = `${questionNumber}) ${currentQuestion.question}`;

      currentQuestion.answers.forEach((button) => {
        let btn = document.createElement("button");
        btn.classList.add("btn");
        btn.innerHTML = button.text;
        answers.appendChild(btn);

        btn.dataset.state = button.state;

        if (btn.dataset.state) {
          btn.dataset.state = button.state;
        }

        btn.addEventListener("click", answerSelected);
      });
    }

    function answerSelected(btn) {
      let slectedBtn = btn.target;
      let isCorrect = slectedBtn.dataset.state === "true";

      if (isCorrect) {
        slectedBtn.classList.add("correct");
        result++;
      } else {
        slectedBtn.classList.add("incorrect");
      }

      Array.from(answers.children).forEach((button) => {
        if (button.dataset.state === "true") {
          button.classList.add("correct");
        }
        button.disabled = true;
      });
      nextBtn.style = "display:block";
    }

    function resetState() {
      nextBtn.style = "display:none";
      while (answers.firstChild) {
        answers.firstChild.remove();
      }
    }

    function handleNextBtn() {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        changeQuestionsAndAnswers();
      } else {
        showResult();
      }
    }

    function showResult() {
      resetState();

      nextBtn.innerHTML = "Restart Quiz";
      nextBtn.style = "display:block";
      questionElement.innerHTML = `Your Result Is ${result} From ${currentQuestionIndex}`;
    }

    nextBtn.addEventListener("click", () => {
      if (currentQuestionIndex < questions.length) {
        handleNextBtn();
      } else {
        start();
      }
    });

    start();
  });
