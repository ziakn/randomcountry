import React from "react";
import { RefreshCw } from "lucide-react";

type GenerateButtonProps = {
  onClick: () => void;
  isLoading?: boolean;
};

export default function GenerateButton({ onClick, isLoading }: GenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="group relative flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed text-lg"
    >
      <RefreshCw className={`w-6 h-6 transition-transform duration-500 ${isLoading ? 'animate-spin' : 'group-hover:rotate-180'}`} />
      <span>{isLoading ? "Generating..." : "Generate Random Country"}</span>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}