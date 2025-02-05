export function InlineCode({ children }: { children: string }) {
  // Remove os apóstrofos do início e fim se existirem
  const code = children.replace(/^`|`$/g, "");

  return (
    <code className="px-1.5 py-0.5 text-sm font-mono bg-zinc-800 text-emerald-400 rounded">
      {code}
    </code>
  );
}
