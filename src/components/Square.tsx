import { Player } from "../types";
import { motion } from "motion/react";

type SquareProps = {
  value: Player;
  isWinner: boolean;
  onClick: () => void;
};

const getTextColor = (value: Player) =>
  value === "X" ? "text-green-400" : "text-blue-400";

const getBorderColor = (value: Player, isWinner: boolean) => {
  if (!isWinner) return "border-gray-600";
  return value === "X" ? "border-green-400" : "border-blue-400";
};

export const Square = ({ value, onClick, isWinner }: SquareProps) => {
  return (
    <motion.button
      className={`h-32 w-32 rounded-xl border-4 text-4xl font-bold ${getTextColor(value)} ${getBorderColor(value, isWinner)} `}
      onClick={onClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {value && (
        <motion.span
          className="block"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
        >
          {value}
        </motion.span>
      )}
    </motion.button>
  );
};
