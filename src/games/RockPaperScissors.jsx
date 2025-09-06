import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/RockPaperScissors.css';

const choices = ["Rock", "Paper", "Scissors"];

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [aiChoice, setAiChoice] = useState(null);
  const [result, setResult] = useState("");
  const [scores, setScores] = useState({ player: 0, ai: 0, draws: 0 });

  const playRound = (choice) => {
    const aiPick = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setAiChoice(aiPick);

    if (choice === aiPick) {
      setResult("🤝 It's a Draw!");
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
    } else if (
      (choice === "Rock" && aiPick === "Scissors") ||
      (choice === "Paper" && aiPick === "Rock") ||
      (choice === "Scissors" && aiPick === "Paper")
    ) {
      setResult("🎉 You Win!");
      setScores(prev => ({ ...prev, player: prev.player + 1 }));
    } else {
      setResult("💀 AI Wins!");
      setScores(prev => ({ ...prev, ai: prev.ai + 1 }));
    }
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setAiChoice(null);
    setResult("");
  };

  const resetScores = () => {
    setScores({ player: 0, ai: 0, draws: 0 });
  };

  return (
    <div className="rps-game">
      <div className="game-header">
        <Link to="/" className="home-btn">🏠 Back to Games</Link>
        <h1 className="game-title">Rock Paper Scissors</h1>
        <button onClick={resetGame} className="control-btn">🔄 New Round</button>
      </div>

      <div className="rps-container">
        <div className="choices">
          {choices.map((choice) => (
            <button 
              key={choice} 
              className="choice-btn"
              onClick={() => playRound(choice)}
            >
              {choice}
            </button>
          ))}
        </div>

        <div className="results">
          {playerChoice && <p>You chose: <span>{playerChoice}</span></p>}
          {aiChoice && <p>AI chose: <span>{aiChoice}</span></p>}
          {result && <h2 className="result-text">{result}</h2>}
        </div>

        <div className="scoreboard">
          <h3>🏆 Scoreboard</h3>
          <p>Player: {scores.player}</p>
          <p>AI: {scores.ai}</p>
          <p>Draws: {scores.draws}</p>
          <button onClick={resetScores} className="reset-scores-btn">Reset Scores</button>
        </div>
      </div>
    </div>
  );
};

export default RockPaperScissors;
