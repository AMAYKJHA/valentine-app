import { useState } from 'react'

const questions = [
  {
    question: "What is their favorite food?",
    options: ["Pizza", "Sushi", "Pasta", "Burger"]
  },
  {
    question: "Who said I love you first?",
    options: ["Me", "Them", "Both at same time", "Neither yet"]
  },
  {
    question: "What is their favorite color?",
    options: ["Red", "Blue", "Pink", "Green"]
  },
  {
    question: "What do they love most?",
    options: ["Movies", "Music", "Food", "Travel"]
  },
  {
    question: "Where do they want to travel?",
    options: ["Paris", "Tokyo", "New York", "Maldives"]
  }
]

function App() {
  const [screen, setScreen] = useState("start")
  const [personA, setPersonA] = useState("")
  const [personB, setPersonB] = useState("")
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answersA, setAnswersA] = useState([])
  const [answersB, setAnswersB] = useState([])
  const [matchCount, setMatchCount] = useState(0)

  const handleAnswer = (answer) => {
    if (currentPlayer === 1) {
      const newAnswersA = [...answersA, answer]
      setAnswersA(newAnswersA)
      
      if (currentQuestion === 4) {
        setCurrentPlayer(2)
        setCurrentQuestion(0) 
      } else {
        setCurrentQuestion(currentQuestion + 1)
      }
    } else {
      const newAnswersB = [...answersB, answer]
      setAnswersB(newAnswersB)
      
      if (currentQuestion === 4) {
        calculateMatches(answersA, newAnswersB)
        setScreen("result")
      } else {
        setCurrentQuestion(currentQuestion + 1)
      }
    }
  }

  const calculateMatches = (a, b) => {
    let matches = 0
    for (let i = 0; i < a.length; i++) {
      if (a[i] === b[i]) {
        matches = matches + 1
      }
    }
    setMatchCount(matches)
  }

  const getResultMessage = () => {
    if (matchCount <= 1) {
      return "Are you even dating? 😂"
    } else if (matchCount <= 3) {
      return "Cute couple! 💕"
    } else {
      return "Soulmates! 💖"
    }
  }

  const restartQuiz = () => {
    setScreen("start")
    setPersonA("")
    setPersonB("")
    setCurrentPlayer(1)
    setCurrentQuestion(0)
    setAnswersA([])
    setAnswersB([])
    setMatchCount(0)
  }

  const startQuiz = () => {
    if (personA.trim() !== "" && personB.trim() !== "") {
      setScreen("quiz")
    }
  }

  return (
    <div className="app">
      <div className="hearts-bg">
        <div className="heart filled lg" style={{top: '5%', left: '8%'}}></div>
        <div className="heart outline sm" style={{top: '12%', left: '25%'}}></div>
        <div className="heart filled sm" style={{top: '8%', left: '45%'}}></div>
        <div className="heart outline md" style={{top: '3%', left: '65%'}}></div>
        <div className="heart filled md" style={{top: '15%', left: '85%'}}></div>
        <div className="heart outline lg" style={{top: '25%', left: '5%'}}></div>
        <div className="heart filled sm" style={{top: '30%', left: '20%'}}></div>
        <div className="heart outline sm" style={{top: '35%', left: '90%'}}></div>
        <div className="heart filled md" style={{top: '45%', left: '3%'}}></div>
        <div className="heart outline md" style={{top: '40%', left: '92%'}}></div>
        <div className="heart filled lg" style={{top: '55%', left: '10%'}}></div>
        <div className="heart outline sm" style={{top: '60%', left: '88%'}}></div>
        <div className="heart filled sm" style={{top: '65%', left: '5%'}}></div>
        <div className="heart outline lg" style={{top: '70%', left: '85%'}}></div>
        <div className="heart filled md" style={{top: '75%', left: '15%'}}></div>
        <div className="heart outline sm" style={{top: '80%', left: '30%'}}></div>
        <div className="heart filled sm" style={{top: '85%', left: '50%'}}></div>
        <div className="heart outline md" style={{top: '88%', left: '70%'}}></div>
        <div className="heart filled lg" style={{top: '92%', left: '90%'}}></div>
        <div className="heart outline sm" style={{top: '20%', left: '75%'}}></div>
        <div className="heart filled sm" style={{top: '50%', left: '95%'}}></div>
        <div className="heart outline lg" style={{top: '22%', left: '92%'}}></div>
        <div className="heart filled md" style={{top: '95%', left: '8%'}}></div>
        <div className="heart outline sm" style={{top: '18%', left: '3%'}}></div>
      </div>

      <div className="card">
        {screen === "start" && (
          <div className="screen">
            <h1>Valentine`s Quiz ❤️</h1>
            <p className="subtitle">Test how well you know each other!</p>
            <button className="btn" onClick={() => setScreen("names")}>
              Start Quiz
            </button>
          </div>
        )}

        {screen === "names" && (
          <div className="screen">
            <h2>Enter Your Names 💑</h2>
            <div className="input-group">
              <label>Person A:</label>
              <input
                type="text"
                placeholder="Enter first name"
                value={personA}
                onChange={(e) => setPersonA(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Person B:</label>
              <input
                type="text"
                placeholder="Enter second name"
                value={personB}
                onChange={(e) => setPersonB(e.target.value)}
              />
            </div>
            <button className="btn" onClick={startQuiz}>
              Start Questions
            </button>
          </div>
        )}

        {screen === "quiz" && (
          <div className="screen">
            <h2>{currentPlayer === 1 ? personA : personB}'s Turn 💭</h2>
            <p className="progress">Question {currentQuestion + 1} of 5</p>
            <h3 className="question">{questions[currentQuestion].question}</h3>
            <div className="options">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className="option-btn"
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {screen === "result" && (
          <div className="screen">
            <h2>Results! 🎉</h2>
            <p className="score">You matched {matchCount} out of 5 ❤️</p>
            <p className="message">{getResultMessage()}</p>
            <p className="couple-names">{personA} & {personB}</p>
            <button className="btn" onClick={restartQuiz}>
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
