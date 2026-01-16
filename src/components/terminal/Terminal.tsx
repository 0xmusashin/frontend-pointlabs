"use client";

import { cn } from "@/lib/utils";

interface TerminalProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Terminal({ title = "terminal", children, className }: TerminalProps) {
  return (
    <div
      className={cn(
        "border border-border rounded-lg bg-background-subtle font-mono overflow-hidden",
        className
      )}
    >
      {/* Window controls */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background-muted">
        <span className="w-3 h-3 rounded-full bg-error/50" />
        <span className="w-3 h-3 rounded-full bg-warning/50" />
        <span className="w-3 h-3 rounded-full bg-success/50" />
        <span className="ml-2 text-xs text-foreground-muted">{title}</span>
      </div>

      {/* Content */}
      <div className="p-4 text-sm">{children}</div>
    </div>
  );
}

interface TerminalLineProps {
  prompt?: string;
  command?: string;
  output?: string;
  className?: string;
}

export function TerminalLine({
  prompt = "$",
  command,
  output,
  className,
}: TerminalLineProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {command && (
        <p className="text-foreground-secondary">
          <span className="text-accent">{prompt}</span> {command}
        </p>
      )}
      {output && <p className="text-foreground-muted pl-2">{output}</p>}
    </div>
  );
}

export function TerminalCursor() {
  return <span className="animate-pulse text-accent">▊</span>;
}
