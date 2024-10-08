import React, { useState } from 'react';
import {QRCodeCanvas} from 'qrcode.react';
import './App.css';

// Sample Questions
const questions = [
  { 
    question: "What is the capital of France?", 
    options: ["A) Berlin", "B) Madrid", "C) Paris", "D) Rome"], 
    correctAnswer: "C" 
  },
  { 
    question: "Which planet is known as the Red Planet?", 
    options: ["A) Earth", "B) Mars", "C) Venus", "D) Jupiter"], 
    correctAnswer: "B" 
  },
  { 
    question: "Who wrote 'Hamlet'?", 
    options: ["A) Shakespeare", "B) Dickens", "C) Austen", "D) Twain"], 
    correctAnswer: "A" 
  },
  { 
    question: "What is the largest ocean on Earth?", 
    options: ["A) Atlantic", "B) Pacific", "C) Indian", "D) Arctic"], 
    correctAnswer: "B" 
  },
  { 
    question: "What is the square root of 64?", 
    options: ["A) 6", "B) 8", "C) 10", "D) 4"], 
    correctAnswer: "B" 
  }
];

function App() {
  const [playerName, setPlayerName] = useState(""); // Player's name
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Current question index
  const [gameStarted, setGameStarted] = useState(false); // Whether the game has started
  const [selectedAnswer, setSelectedAnswer] = useState(""); // Player's selected answer
  const [isCorrect, setIsCorrect] = useState(null); // Whether the answer is correct
  const [gameOver, setGameOver] = useState(false); // Whether the game has ended

  // Handle Name Input (stores the full name properly)
  const handleNameChange = (e) => {
    setPlayerName(e.target.value); // Set the player name correctly
  };

  // Handle Game Start
  const handleGameStart = () => {
    if (playerName.trim() !== "") {
      setGameStarted(true); // Start the game only when a valid name is entered
      setIsCorrect(null); // Reset any previous feedback
    }
  };

  // Handle Answer Submission
  const handleAnswerSubmit = () => {
    const correct = questions[currentQuestionIndex].correctAnswer === selectedAnswer;
    setIsCorrect(correct);

    if (correct) {
      // If the answer is correct, move to the next question
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setGameOver(true);
        alert(`Congratulations ${playerName}, you've completed the game!`);
      }
    } else {
      alert("Incorrect answer. Please try again.");
    }

    // Reset selected answer
    setSelectedAnswer("");
  };

  // Current Question
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="App">
      <h1>KBC Game</h1>

      {/* Display QR Code for Mobile Users to Join */}
      <QRCodeCanvas value={window.location.href} size={256} />

      {/* Desktop View */}
      {!gameStarted && !gameOver ? (
        <div>
          <h2>Enter Your Name to Start</h2>
          <input
            type="text"
            value={playerName}
            onChange={handleNameChange} // Update on each keystroke
            placeholder="Enter your full name"
          />
          <button onClick={handleGameStart}>Start Game</button>
        </div>
      ) : gameOver ? (
        <div>
          <h2>Game Over! Thanks for playing, {playerName}!</h2>
        </div>
      ) : (
        <div>
          {/* Player's Name Displayed */}
          <h3>Welcome, {playerName}!</h3>

          {/* Show Current Question */}
          <h2>{currentQuestion.question}</h2>
          <div className="options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(option[0])} // Use first letter for answer validation
                className={selectedAnswer === option[0] ? "selected" : ""}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Answer Submission */}
          <button onClick={handleAnswerSubmit} disabled={!selectedAnswer}>
            Submit Answer
          </button>

          {/* Display Answer Feedback */}
          {isCorrect !== null && (
            <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? `Congratulations, ${playerName}! Correct answer!` : "Incorrect answer. Try again!"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
