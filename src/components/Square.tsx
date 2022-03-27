import React from "react";

type Player = "X" | "O" | "BOTH" | null;

// interface props {
//     firstName: string;
//     lastName: string;
// }

const Square = ({
  value,
  onClick,
  winner,
}: {
  winner: Player;
  value: Player;
  onClick: () => void;
}) => {
  if (!value) {
    return (
      <button className="square" onClick={onClick} disabled={Boolean(winner)} />
    );
  }
  return (
    <button className={`square square_${value.toLowerCase()}`} disabled>
      {value}
    </button>
  );
};

export default Square;
