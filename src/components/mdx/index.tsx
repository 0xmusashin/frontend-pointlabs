import type { ReactNode } from "react";

interface CalloutProps {
  type?: "note" | "warning" | "tip";
  children: ReactNode;
}

// Callout component for important notes
export function Callout({ type = "note", children }: CalloutProps) {
  const styles = {
    note: "border-accent bg-accent-muted/30",
    warning: "border-warning bg-warning/10",
    tip: "border-success bg-success/10",
  };

  const labels = {
    note: "Note",
    warning: "Warning",
    tip: "Tip",
  };

  return (
    <div
      className={`border-l-2 ${styles[type]} p-4 rounded-r-md my-4`}
      role="note"
    >
      <span className="font-mono text-xs uppercase tracking-wider text-foreground-muted block mb-2">
        {labels[type]}
      </span>
      <div className="text-foreground-secondary">{children}</div>
    </div>
  );
}

interface CodeBlockProps {
  filename?: string;
  children: ReactNode;
}

// Code filename header
export function CodeBlock({ filename, children }: CodeBlockProps) {
  return (
    <div className="rounded-md overflow-hidden my-6">
      {filename && (
        <div className="bg-background-subtle border border-border-subtle border-b-0 px-4 py-2 text-xs font-mono text-foreground-muted rounded-t-md">
          {filename}
        </div>
      )}
      {children}
    </div>
  );
}

// Export all MDX components for use with MDXRemote
export const mdxComponents = {
  Callout,
  CodeBlock,
};
