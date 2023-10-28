const questions = {
  
    "q1": {
      "id": "q1",
      "question": "What is my favorite Color?",
      "answers": [
        "Black",
        "Blue",
        "Green",
        "Red"
      ],
      "correctAnswer": "Blue"
    },
    "q2": {
      "id": "q2",
      "question": "What was my favorite subject in Middle School?",
      "answers": [
        "Math",
        "English",
        "Science",
        "School? "
      ],
      "correctAnswer": "Math"
    },
    "q3": {
      "id": "q3",
      "question": "What is my favorite genre of book?",
      "answers": [
        "Fantasy",
        "Science Fiction",
        "Romance Novel",
        "Mystery"
      ],
      "correctAnswer": "Fantasy"
    },
    "q4": {
      "id": "q4",
      "question": "What is my favorite passtime?",
      "answers": [
        "Bowling",
        "Billiards",
        "Darts",
        "Poker"
      ],
      "correctAnswer": "Billiards"
    },
    "q5": {
      "id": "q5",
      "question": "Which of the following is NOT a job that I have had?",
      "answers": [
        "Letter Carrier",
        "Programmer",
        "Amazon",
        "Car Salesman"
      ],
      "correctAnswer": "Programmer"
    },
    "q6": {
      "id": "q6",
      "question": "What was my first car?",
      "answers": [
        "Ford Thunderbird",
        "Dodge Intrepid",
        "Oldsmobile Alero",
        "Toyota Camry"
      ],
      "correctAnswer": "Ford Thunderbird"
    },
    "q7": {
      "id": "q7",
      "question": "What nicknames do I have for my cats?",
      "answers": [
        "Jinx/Janx",
        "Purrito/Katy Purry",
        "Ricky Ticky Tabby/Cindy Clawford",
        "Big Fat/Little Fat"
      ],
      "correctAnswer": "Big Fat/Little Fat"
    },
    "q8": {
      "id": "q8",
      "question": "What is my LEAST favorite Holiday?",
      "answers": [
        "I hate them all equally",
        "Halloween",
        "ThanksGiving",
        "Christmas"
      ],
      "correctAnswer": "Christmas"
    },
    "q9": {
      "id": "q9",
      "question": "What town did I grow up in?",
      "answers": [
        "Racine",
        "Memphis",
        "Mesa",
        "St. Paul"
      ],
      "correctAnswer": "Racine"
    },
    "q10": {
      "id": "q10",
      "question": "What color are my eyes?",
      "answers": [
        "Blue",
        "Green",
        "Brown",
        "Hazel"
      ],
      "correctAnswer": "Blue"
    }
    
    }
    
const users = {
  "u1": {
    "username": "bobdray7",
    "score": 800
  }, 
  "u2": {
    "username": "meganbinn35",
    "score": 200
  }, 
  "u3": {
    "username": "janeyjay9",
    "score": 400
  }, 
  "u4": {
    "username": "johnmarv21",
    "score": 600
  } 

}

// Get all DOM elements
const usernameInput = document.getElementById('username')
const validationMsg = document.getElementById('validation-msg')
const startBtn = document.getElementById('start-btn')
const nextBtns = document.querySelectorAll('.next-question')
const playAgainBtn = document.getElementById('play-again')
const startSection = document.getElementById('start')
const currentUserDisplay = document.getElementById('user-display')
const questionGroups = document.querySelectorAll('.question')
const endSection = document.getElementById('game-end')
const finalScoreSpan = document.querySelector('span[id="score"]')
const answerButtons = document.querySelectorAll('.answer')
const modal = document.getElementById('modal');
const openModal = document.getElementById('show-details');
const closeModal = document.getElementById('modal-close');
const questionsInModal = document.querySelectorAll('.game-question')
const userStatsItems = document.querySelectorAll('.user-stat')


openModal.addEventListener("click", () => {
  modal.showModal();
  modal.scrollTop = 0
});

modal.addEventListener('click', (e) => {
  if (e.target.nodeName === "DIALOG") {
    modal.close();
    openModal.blur()
  }
})

closeModal.addEventListener("click", () => {
  modal.setAttribute("modal-closing", "");

  modal.addEventListener(
    "animationend",
    () => {
      modal.removeAttribute("modal-closing");
      modal.close();
      openModal.blur()
    },
    { once: true }
  );
});

// Create array from all the answer buttons
const answers = [...answerButtons]


// Create array from buttons which trigger the displayed <section> element to change
const nextSectionTriggers = [startBtn, ...nextBtns]


// Create an array from all the <section> elements
const sections = [startSection, ...questionGroups, endSection]


// Create an array from all question <li> elements in detailed results modal
const resultsQuestions = [ ...questionsInModal ]


// Create an array from all stat <li> elements at the end of the game
const resultsStats = [ ...userStatsItems ]


// Create array from the questions.json object keys, which will help in selecting random questions
const questionsKeysArray = Object.keys(questions)


// Create array from the users.json object values
const usersValuesArray = Object.values(users)


// Create a new set which will store 10 random questions
const randomTen = new Set()


// Create a set to store fake users
const gameUsers = new Set()


// Create a variable to store current user's chosen username
let currentUser


// Create a variable to store the user's running score
let runningScore = 0


// Declare necessary variables for cycling through the <section> elements
const lastSectionIndex = sections.length - 1
let displayedSectionIndex = 0
let sectionOffset


// Declare necessary variables to display a question and store the selected answer
let nextQuestionNumber = displayedSectionIndex + 1
let currentQuestion
let selectedAnswer
let correctAnswer
let userSelection = false


// Create map to store detailed results
const currentUserDetailedResults = new Map()
currentUserDetailedResults.set("results", [])


// Create map to store all users stats
const usersStats = new Map()
usersStats.set("stats", [])

// Add fake users’ usernames to gameUsers Set and the full fake user objects to userStats Map
for (const user of usersValuesArray) {
  gameUsers.add(user.username)
  usersStats.entries().next().value[1].push(user)
}

// Add 5 random questions from JSON file to the randomTen array
while (randomTen.size < 5) {
  const randomIndex = Math.floor(Math.random() * questionsKeysArray.length)
  const randomObjectKey = questionsKeysArray[randomIndex]
  if (randomTen.has(questions[randomObjectKey])) {
    continue;
  } else {
    randomTen.add(questions[randomObjectKey])
  }
}


// Get access to the set's values
const randomQuestionSet = randomTen.values()

/*Check if DOM's readyState is "complete", then move all question sections 
out of view 
*/


document.onreadystatechange = (e) => {
if (document.readyState === "complete") {
 sections.forEach((section, index) => {
   section.style.transform = `translateX(${index * 100}%)`
 })
}
}

// Define functions to handle valid and invalid state at game start
const setStartGameInvalidState = () => {
usernameInput.style.border = "2px solid rgb(211, 70, 70)"
validationMsg.style.display = "block"
startBtn.setAttribute('disabled', '')
}


const setStartGameValidState = () => {
usernameInput.style.border = "2px solid black"
validationMsg.style.display = "none"
startBtn.removeAttribute('disabled')
}


// Create helper function to check if gameUsers Set already contains the username entered
const userExists = (username) => {
if (gameUsers.has(username)) {
 return true
} else {
 return false
}
}


// Create helper function to check validity of usernameInput value using the Validator.js package
const isValid = (usernameInputValue) => {
if (!validator.isEmpty(usernameInputValue) && validator.isLength(usernameInputValue, { min: 4 })) {
 return {
   valid: true,
   msg: null
 }
} else {

 if (validator.isEmpty(usernameInputValue)) {
   return {
     valid: false,
     msg: "Required"
   }
 } else if (!validator.isLength(usernameInputValue, { min: 4 })) {
   return {
     valid: false,
     msg: "Minimum 4 characters"
   }
 } else {
   return {
     valid: false,
     msg: "Input invalid"
   }
 }
}
}


// Create an event listener callback function to sanitize and validate the input value from the username field
const checkUsernameValidity = () => {
const sanitizedInput = DOMPurify.sanitize(usernameInput.value)
const trimmedInput = validator.trim(sanitizedInput)
const escapedInput = validator.escape(trimmedInput)

const validation = isValid(escapedInput)
const usernameNotTaken = userExists(escapedInput)

if (!validation.valid || usernameNotTaken) {
 setStartGameInvalidState()

 if (usernameNotTaken) {
   validationMsg.innerHTML = "Username already in use"
 } else {
   validationMsg.innerHTML = validation.msg
 }

} else {
 currentUser = escapedInput
 setStartGameValidState()
}
}

// Define a function to toggle the select indicator on any given answer button
const toggleSelectIndicator = (e) => {

userSelection = true

if (e.target.id.includes("answer-selection")) {
 const childrenArray = Array.from(e.target.parentElement.children)
 childrenArray.forEach((answerBtn) => {
   answerBtn.children[0].style.border = "2px solid #fff"
   answerBtn.children[0].style.boxShadow = "none"
 })

 e.target.children[0].style.border = "none"
 e.target.children[0].style["box-shadow"] = "var(--blue-neon-box)"

 selectedAnswer = e.target.children[1].innerText

 if (userSelection) {
   e.target.parentElement.nextElementSibling.removeAttribute('disabled')
 }

} else if (e.target.id.includes("-indicator") || e.target.id.includes("__text")) {

 const childrenArray = Array.from(e.target.parentElement.parentElement.children)
 childrenArray.forEach((answerBtn) => {
   answerBtn.children[0].style.border = "2px solid #fff"
   answerBtn.children[0].style.boxShadow = "none"
 })

 if (e.target.id.includes("-indicator")) {

   e.target.style.border = "none"
   e.target.style["box-shadow"] = "var(--blue-neon-box)"
  
   selectedAnswer = e.target.nextElementSibling.innerText

 } else {

   e.target.previousElementSibling.style.border = "none"
   e.target.previousElementSibling.style["box-shadow"] = "var(--blue-neon-box)"

   selectedAnswer = e.target.innerText
 }

 if (userSelection) {
   e.target.parentElement.parentElement.nextElementSibling.removeAttribute('disabled')
 }
}
}


// Define a function to check whether a given answer is correct and update user score
const checkAnswer = (question, userAnswer, correct) => {
const results = currentUserDetailedResults.entries().next().value

if (results[1].length < 5) {
 if (userAnswer === correct) {
   results[1].push({
     question,
     selectedAnswer,
     outcome: "Correct"
   })

   runningScore+=200

 } else {
   results[1].push({
     question,
     selectedAnswer,
     outcome: "Incorrect"
   })
 }
}
}

// Define function to handle game end logic
const gameEnd = () => {
const score = runningScore.toString()
const results = currentUserDetailedResults.entries().next().value
const stats = usersStats.entries().next().value

finalScoreSpan.innerHTML = score

stats[1].push({ username: currentUser,  score: runningScore})

const sortedStats = stats[1].sort((a, b) => (a.score < b.score) ? 1 : -1)

resultsStats.forEach((rs, index) => {
 rs.children[0].innerHTML = sortedStats[index].username
 rs.children[1].innerHTML = sortedStats[index].score.toString()
})

resultsQuestions.forEach((rq, index) => {
 rq.children[1].style["font-family"] = "var(--accent-font)"
 rq.children[0].children[0].innerHTML = results[1][index].question
 rq.children[0].children[1].children[0].innerHTML = results[1][index].selectedAnswer

 rq.children[1].innerHTML = results[1][index].outcome

 if (results[1][index].outcome === "Correct") {
   rq.children[1].style.color = "green"
 } else if (results[1][index].outcome === "Incorrect") {
   rq.children[1].style.color = "var(--error-color)"
 }
})
}


// Define function to display question/answer set from randomTen Set
const loadQuestionAndAnswers = () => {

if (nextQuestionNumber != lastSectionIndex) {

 currentQuestion = randomQuestionSet.next().value
 correctAnswer = currentQuestion.correctAnswer
 sections[nextQuestionNumber].children[0].innerHTML = currentQuestion["question"]

 const answerNodes = Array.from(sections[nextQuestionNumber].children[1].children)

 answerNodes.forEach((node, index) => node.children[1].innerHTML = currentQuestion["answers"][index])

 setTimeout(() => {
   container.style.background = "rgba(11, 70, 96, 0.75)"
 }, 350)
}
}


// Define function to progress to the next section
const goToNextSection = () => {
sections.forEach((section, loopIndex) => {
 sectionOffset = loopIndex - displayedSectionIndex
 section.style.transform = `translateX(${sectionOffset * 100}%)`
 section.style.opacity = 1
})
}


// Create an event listener callback function to move to the next <section> element
const nextSectionClickListener = (e) => {
if (e.target.id === "start-btn") {
 gameUsers.add(currentUser)
 currentUserDisplay.children[0].innerHTML = currentUser
 currentUserDisplay.style.display = "block"
}

if (correctAnswer && selectedAnswer) {
 checkAnswer(currentQuestion["question"], selectedAnswer, correctAnswer)
}

if (displayedSectionIndex === lastSectionIndex - 1) {
 userSelection = false
 displayedSectionIndex++
 gameEnd()
 goToNextSection()

} else {
 loadQuestionAndAnswers()
 userSelection = false
 displayedSectionIndex++
 nextQuestionNumber++
 goToNextSection()
}
}

// Add listener to all nextSectionTrigger buttons
nextSectionTriggers.forEach((trigger) => {
trigger.addEventListener('click', (e) => nextSectionClickListener(e))
})


// Add listeners to all the answer buttons
answers.forEach((answer) => {
answer.addEventListener('click', (e) => toggleSelectIndicator(e))
})


// Add input and blur listeners to username input field
usernameInput.addEventListener('input', checkUsernameValidity)
usernameInput.addEventListener('blur', checkUsernameValidity)


// Add a click listener to the Play Again button
playAgainBtn.addEventListener('click', () => window.location.reload())