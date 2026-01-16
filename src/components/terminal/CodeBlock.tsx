"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = "typescript",
  filename,
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const lines = code.trim().split("\n");

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "border border-border rounded-lg bg-background-subtle overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background-muted">
        <div className="flex items-center gap-2">
          {filename && (
            <span className="text-xs text-foreground-secondary font-mono">
              {filename}
            </span>
          )}
          {!filename && language && (
            <span className="text-xs text-foreground-muted font-mono">
              {language}
            </span>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="p-1.5 rounded hover:bg-background-subtle text-foreground-muted hover:text-foreground transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-success" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Code */}
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-sm">
          <code>
            {lines.map((line, index) => (
              <div key={index} className="flex">
                {showLineNumbers && (
                  <span className="select-none text-foreground-faint w-8 shrink-0 text-right pr-4">
                    {index + 1}
                  </span>
                )}
                <span className="text-foreground-secondary">{line || " "}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
