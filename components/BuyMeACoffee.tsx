import { Coffee } from "lucide-react";

export function BuyMeACoffee() {
  return (
    <a
      href="https://www.buymeacoffee.com/vitorbritto"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-zinc-900 rounded-lg transition-all group font-medium"
    >
      <Coffee className="w-5 h-5 group-hover:rotate-12 transition-transform" />
      <span>Buy me a coffee</span>
    </a>
  );
}
