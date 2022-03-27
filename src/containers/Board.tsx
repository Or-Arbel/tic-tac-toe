import React, { useEffect, useState } from "react";
import Square from "../components/Square";
type Player = "X" | "O" | "BOTH" | null;

const calculateWinner = (squares: Player[]) => {
  const lines = [
    // horizontal lines
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical lines
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal lines
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [curretPlayer, setCurrentPlayer] = useState<"X" | "O">(
    Math.round(Math.random() * 1) === 1 ? "X" : "O"
  );
  const [winner, SetWinner] = useState<Player>(null);

  const reset = () => {
    setSquares(Array(9).fill(null));
    SetWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
  };

  const setSquareValue = (index: number) => {
    const newData = squares.map((val, i) => {
      if (i === index) {
        return curretPlayer;
      }
      return val;
    });
    setSquares(newData);
    setCurrentPlayer(curretPlayer === "X" ? "O" : "X");
  };

  useEffect(() => {
    const w = calculateWinner(squares);
    if (w) {
      SetWinner(w);
    }
    if (!w && squares.every((element) => element != null)) {
      SetWinner("BOTH");
    }
  }, [squares]);

  return (
    <div>
      {winner ? (
        <p>
          {winner === "BOTH"
            ? "Congratulations you are both winners :)"
            : `Congraulations ${winner}!`}
        </p>
      ) : (
        <p>Hi {curretPlayer}, it's your turn!</p>
      )}

      <div className="grid">
        {Array(9)
          .fill(null)
          .map((_, i) => {
            return (
              <Square
                winner={winner}
                key={i}
                onClick={() => setSquareValue(i)}
                value={squares[i]}
              />
            );
          })}
      </div>

      <button className="reset" onClick={reset}>
        RESET
      </button>
    </div>
  );
};

export default Board;
