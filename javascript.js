(function () {
// functions defined
  function buildQuiz () {
    // variable to store the HTML output
    const output = [];

    // for each question...
    myRiddles.forEach((currentRiddle, riddleNumber) => {
      // variable to store the list of possible answers
      const answers = [];
      // and for each available answer....
      for (const letter in currentRiddle.answers) {
        // ...add an HTML radio button
        answers.push(`<label>
                       <input type="radio"
name="riddle${riddleNumber}" value=${letter}">
            ${letter} :
            ${currentRiddle.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
                    `<div class="slide">
                      <div class="riddle"> ${currentRiddle.riddle} </div>
                      <div class="answers"> ${answers.join('')} </div>
                     </div>`
      );
    }
    );

    // combine output list into one string of HTML and put it on page
    quizContainer.innerHTML = output.join('');
  }

  function showResults () {
    // gather answer containers from quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');
    // keep track of user's answers
    let numCorrect = 0;
    // for each question....
    myRiddles.forEach((currentRiddle, riddleNumber) => {
    // find selected answer
      const answerContainer = answerContainers[riddleNumber];
      const selector = `input[name=riddle${riddleNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      // if answer is correc
      if (userAnswer === currentRiddle.correctAnswer) {
      // add to the number of correct answers
        numCorrect++;
        // color the answers green
        answerContainers[riddleNumber].style.color = 'lightgreen';

      // if answer is wrong or blank
      } else {
      // color the answers red
        answerContainers[riddleNumber].style.color = 'red';
      }
    });

    // show numbeer of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myRiddles.length}`;
  }

  function showSlide (n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if (currentSlide === 0) {
      previousButton.style.display = 'none';
    } else {
      previousButton.style.display = 'inline-block';
    }
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    } else {
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide () {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide () {
    showSlide(currentSlide - 1);
  }

  // variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('fortuneORnah');
  const submitButton = document.getElementById('submit');
  const myRiddles = [
    {
      riddle: 'What do the letter T and an island have in common?',
      answers: {
        a: 'They both have at least one letter in them',
        b: "You'll find them both in the middle of water",
        c: "Add the word long to the mix and you'll have a good time (if you're 21+)"
      },
      correctAnswer: 'b'
    },
    {
      riddle: "I'm the rare case when today comes before yesterday. What am I?",
      answers: {
        a: 'human',
        b: 'a rare case',
        c: 'A dictionary'
      },
      correctAnswer: 'c'
    },
    {
      riddle: 'What goes all the way around the world but stays in a corner?',
      answers: {
        a: 'The Sun because the Earth is flat',
        b: 'A stamp',
        c: 'Nobody puts baby in a corner'
      },
      correctAnswer: 'b'
    }
  ];

  // display quiz right away
  buildQuiz();

  // pagination
  const previousButton = document.getElementById('previous');
  const nextButton = document.getElementById('next');
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  // show the first slide
  showSlide(currentSlide);

  // on submit, show results
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener('click', showPreviousSlide);
  nextButton.addEventListener('click', showNextSlide);
})();
