import React, { useState, useEffect } from "react";
import Square from "./Square";
import "../App.css";
import gameLogic from "./gameLogic";

const Board = () => {
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [isXChance, setIsXChance] = useState(false);
  const [winnerPlayer, setWinnerPlayer] = useState(" ");
  const [currentPlayer, setCurrentPlayer] = useState(" ");

  // onClick square

  const squareClicked = (index) => {
    if (winnerPlayer !== " ") {
      alert("Please reset the game");
      return;
    }
    if (!gameState[index]) {
      let strings = Array.from(gameState);
      strings[index] = isXChance ? "0" : "X";
      setGameState(strings);
      setIsXChance(!isXChance);
    }
  };

  // onClick reset button

  const resetBoard = () => {
    setGameState(Array(9).fill(null));
    setCurrentPlayer(" ");
    setWinnerPlayer(" ");
    setIsXChance(false);
  };

  // on winning
  const winner = gameLogic(gameState);
  const winnerHighlight = winner.lines;
  const keyframesStyle = winner.winner1 && "winnerArea";

  useEffect(() => {
    if (winner.winner1) {
      setWinnerPlayer(`Hurrah! The winner is player ${currentPlayer}`);
      setCurrentPlayer(" ");
    } else if (currentPlayer === " ") {
      setCurrentPlayer("X");
    } else {
      currentPlayer === "X" ? setCurrentPlayer("0") : setCurrentPlayer("X");
    }
  }, [gameState]);

  const renderSquare = (i) => {
    return (
      <Square
        state={gameState[i]}
        onClick={() => squareClicked(i)}
        highlightWinner={winnerHighlight && winnerHighlight.includes(i)}
      />
    );
  };
  return (
    <div className="gameBoard containerStyle">
      <div>
        <h1 className="heading">Tic-Tac-Toe Game</h1>
      </div>
      <div id={keyframesStyle} className="winner instructionsStyle">
        <span>{winnerPlayer}</span>
      </div>
      <div id="statusArea" className="status instructionsStyle">
        <span className="nextPlayer"> Next player: {currentPlayer}</span>
        <button className="buttonStyle" onClick={resetBoard}>
          Reset
        </button>
      </div>

      <div className="boardStyle">
        <div className="board-row rowStyle">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row rowStyle">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row rowStyle">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  );
};

export default Board;
