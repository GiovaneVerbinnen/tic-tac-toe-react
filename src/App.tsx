import { Gamepad2, Github, RotateCcw } from "lucide-react";
import { Board } from "./components/Board";
import { Suspense, useState } from "react";
import { BoardState } from "./types";
import { checkWinner, isBoardFull } from "./helpers/game-logic";
import { Trans, useTranslation } from "react-i18next";

export const App = () => {
  const { t, i18n } = useTranslation();
  const lngs: {
    [key: string]: { nativeName: string };
  } = {
    en: { nativeName: "🇺🇸 English" },
    pt: { nativeName: "🇧🇷 Português(BR)" },
    es: { nativeName: "🇪🇸 Español" },
    fr: { nativeName: "🇫🇷 Français" },
    ru: { nativeName: "🇷🇺 Pусский" },
    zh: { nativeName: "🇨🇳 官话" },
  };

  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));

  const winner = checkWinner(board);

  const isDraw = !winner && isBoardFull(board);

  const gameStatus = () => {
    if (winner) return `${winner} ${t("wins")}`;
    if (isDraw) return t("its_a_draw");
    return (
      <Trans i18nKey="player_turn" currentPlayer={currentPlayer}>
        {{ currentPlayer }}
      </Trans>
    );
  };

  const currentPlayer = winner?.length
    ? winner
    : board.filter(Boolean).length % 2 === 0
      ? "X"
      : "O";

  const handleClick = (index: number) => {
    if (board[index] || winner) return;
    setBoard(board.map((square, i) => (i === index ? currentPlayer : square)));
  };

  return (
    <Suspense fallback="loading...">
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-950 py-3">
        <div>
          {Object.keys(lngs).map((lng) => (
            <button
              className="p-3 text-white"
              key={lng}
              style={{
                fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
              }}
              onClick={() => i18n.changeLanguage(lng)}
            >
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
        <div className="w-full max-w-lg rounded-3xl bg-gray-800 p-6">
          <div className="flex items-center justify-center gap-3">
            <Gamepad2 className="text-green-400" size={64} />
            <h1 className="font-mono text-4xl font-bold text-white">
              {t("title")}
            </h1>
          </div>
          <div className="mb-6 text-center">
            <p
              className={`text-xl font-semibold ${currentPlayer === "X" ? "text-green-400" : "text-blue-400"}`}
            >
              {gameStatus()}
            </p>
          </div>
          <Board board={board} winner={winner} onClick={handleClick} />
          {(winner || isDraw) && (
            <div className="mt-6 flex justify-center">
              <button
                className="group flex items-center gap-3 rounded-lg bg-green-400 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-green-500"
                onClick={() => setBoard(Array(9).fill(null))}
              >
                {t("restart_game")}
                <RotateCcw className="transition-transform duration-500 group-hover:-rotate-180" />
              </button>
            </div>
          )}
        </div>
        <div className="mt-3 flex w-full max-w-lg justify-between">
          <p className="text-sm font-semibold text-gray-400">
            {t("made_by")}

            <a
              href="https://giovane.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-green-400">Giovane</span>
            </a>
          </p>
          <p className="px-3 text-white">
            <a
              href="https://github.com/GiovaneVerbinnen/tic-tac-toe-react"
              target="_blank"
              rel="noopener noreferrer"
              className="line-height-3 flex items-center gap-1 text-sm font-semibold text-gray-400 transition-colors hover:text-green-400"
            >
              Fork me on <Github size={16} className="text-green-400" />
            </a>
          </p>
        </div>
      </main>
    </Suspense>
  );
};
