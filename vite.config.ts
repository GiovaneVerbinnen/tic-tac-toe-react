import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://tic-tac-toe-react-git-main-giovaneverbinnens-projects.vercel.app/",
});
