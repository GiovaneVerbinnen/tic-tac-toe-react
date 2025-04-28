import { WINNING_COMBINATIONS } from "../helpers/game-logic";
import { BoardState, Player } from "../types";
import { Square } from "./Square";

type BoardProps = {
  board: BoardState;
  winner: Player;
  onClick: (index: number) => void;
};

export const Board = ({ board, winner, onClick }: BoardProps) => {
  const isWinningSquare = (index: number): boolean => {
    if (!winner) return false;
    return WINNING_COMBINATIONS.some(
      (combo) =>
        combo.includes(index) && combo.every((i) => board[i] === winner),
    );
  };
  return (
    <div className="mx-auto grid max-w-[26rem] grid-cols-3 gap-4">
      {board.map((square, index) => (
        <Square
          key={index}
          value={square}
          onClick={() => onClick(index)}
          isWinner={isWinningSquare(index)}
        />
      ))}
    </div>
  );
};
