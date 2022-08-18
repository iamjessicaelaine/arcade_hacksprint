(function () {
// functions defined
  function buildQuiz () {
    // variable to store the HTML output
    const output = [];

    // for each question...
    myRiddles.forEach(
	    (currentRiddle, riddleNumber) => {
        // variable to store the list of possible answers
        const answers = [];
        // and for each available answer....
        for (letter in currentRiddle.answers) {
		    // ...add an HTML radio button
		    answers.push(
			`<label>
                          <input type="radio" name="riddle${riddleNumber}"
  value=${letter}">
                          ${letter} :
                          $currentQuestion.answers[letter]}
                        </label>`
		    );
        }

        // add this question and its answers to the output
        output.push(
		    `<div class="riddle"> ${currentRiddle.riddle} </div>
                    <div class="answers"> ${answers.join('')} </div>`
        );
	    }
    );

    // combine output list into one string of HTML and put it on page
    quizContainer.innerHTML = output.join('');
  }

  function showResults () {}

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

  // on submit, show results
  submitButton.addEventListener('click', showResults);
})();
