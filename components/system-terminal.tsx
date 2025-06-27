"use client"

import { useState, useRef, useEffect, type FormEvent } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*                                   types                                    */
/* -------------------------------------------------------------------------- */

type LineType = "command" | "output" | "success" | "error"

interface TerminalLine {
  id: string
  type: LineType
  content: string
  timestamp: string
}

/* -------------------------------------------------------------------------- */
/*                               helper data                                  */
/* -------------------------------------------------------------------------- */

const initialLines: TerminalLine[] = [
  {
    id: crypto.randomUUID(),
    type: "output",
    content: "AI Orchestra Terminal v2.1.0 – Ready",
    timestamp: new Date().toLocaleTimeString(),
  },
  {
    id: crypto.randomUUID(),
    type: "success",
    content: "✓ All systems operational",
    timestamp: new Date().toLocaleTimeString(),
  },
  {
    id: crypto.randomUUID(),
    type: "output",
    content: "Type 'help' for available commands",
    timestamp: new Date().toLocaleTimeString(),
  },
]

/* -------------------------------------------------------------------------- */
/*                              main component                                */
/* -------------------------------------------------------------------------- */

export function SystemTerminal() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [cmd, setCmd] = useState("")
  const [lines, setLines] = useState<TerminalLine[]>(initialLines)

  const logRef = useRef<HTMLDivElement>(null)

  /* ---------------------------------- UX ---------------------------------- */
  const scrollToBottom = () => {
    logRef.current?.scrollTo({
      top: logRef.current.scrollHeight,
      behavior: "smooth",
    })
  }

  useEffect(scrollToBottom, [lines, isExpanded])

  /* ---------------------------- command helpers --------------------------- */
  const appendLine = (type: LineType, content: string) => {
    setLines((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type,
        content,
        timestamp: new Date().toLocaleTimeString(),
      },
    ])
  }

  const runCommand = (input: string) => {
    const trimmed = input.trim()
    if (!trimmed) return
    appendLine("command", `> ${trimmed}`)

    switch (trimmed) {
      case "help":
        appendLine("output", "Available commands: status, agents, deploy, logs, clear, version")
        break
      case "status":
        appendLine("output", "System Status: ✓ Operational | Agents: 247 | Load: 67%")
        break
      case "agents":
        appendLine("output", "Active Agents: Alpha-7, Beta-3, Gamma-1, Delta-9, Epsilon-5")
        break
      case "deploy":
        appendLine("output", "Deploying new agent configuration…")
        setTimeout(() => appendLine("success", "✓ Deployment Complete"), 900)
        break
      case "logs":
        appendLine("output", "[INFO] Neural network optimised – 42 % faster")
        break
      case "version":
        appendLine("output", "AI Orchestra Terminal version 2.1.0")
        break
      case "clear":
        setLines([])
        break
      default:
        appendLine("error", `Unknown command: '${trimmed}'`)
    }
  }

  /* -------------------------- form submission ----------------------------- */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    runCommand(cmd)
    setCmd("")
  }

  /* ------------------------------------------------------------------------ */
  /*                                   JSX                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 flex flex-col transition-[height] duration-300",
        isExpanded ? "h-64 md:h-80" : "h-10",
      )}
      aria-label="System terminal"
    >
      {/* Header / toggle */}
      <button
        type="button"
        onClick={() => setIsExpanded((p) => !p)}
        className="flex h-10 w-full items-center justify-between bg-neutral-900 px-4 text-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
        aria-expanded={isExpanded}
      >
        <span className="text-sm font-medium">Terminal</span>
        {isExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
      </button>

      {/* Scrollable log */}
      <div
        ref={logRef}
        className="flex-1 overflow-y-auto bg-neutral-950 px-4 py-2 font-mono text-xs text-neutral-200"
        role="log"
        aria-live="polite"
        aria-atomic="false"
      >
        {lines.map(({ id, content, type }) => (
          <div
            key={id}
            className={cn(
              "whitespace-pre-wrap break-words",
              type === "command" && "text-neutral-50",
              type === "success" && "text-emerald-400",
              type === "error" && "text-red-400",
            )}
          >
            {content}
          </div>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className={cn("flex h-9 w-full items-center gap-2 bg-neutral-900 px-4", !isExpanded && "hidden")}
      >
        <label htmlFor="terminal-input" className="sr-only">
          Command prompt
        </label>
        <span aria-hidden className="text-neutral-400">
          &gt;
        </span>
        <input
          id="terminal-input"
          value={cmd}
          onChange={(e) => setCmd(e.target.value)}
          autoComplete="off"
          className="flex-1 border-none bg-transparent font-mono text-xs text-neutral-50 outline-none placeholder:text-neutral-500"
          placeholder="Enter command…"
        />
      </form>
    </div>
  )
}
