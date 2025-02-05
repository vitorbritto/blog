interface AlertProps {
  type: "info" | "warning" | "error" | "success";
  children: React.ReactNode;
}

export function Alert({ type, children }: AlertProps) {
  const styles = {
    info: "bg-blue-400/10 text-blue-400 border-blue-400/20",
    warning: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
    error: "bg-red-400/10 text-red-400 border-red-400/20",
    success: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  };

  return (
    <div className={`p-4 rounded-lg border ${styles[type]} my-4`}>
      {children}
    </div>
  );
}
