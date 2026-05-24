"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const expandableButtonVariants = cva(
  "inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 justify-center",
        destructive: "bg-destructive text-white hover:bg-destructive/90 justify-center",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground justify-center",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 justify-center",
        ghost: "hover:bg-accent hover:text-accent-foreground justify-center",
        "sidepanel-entry": "bg-white/10 backdrop-blur-md border border-white/20 text-foreground hover:bg-white/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ExpandableButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof expandableButtonVariants> {
  /** The icon to display */
  icon: React.ReactNode
  /** The full label shown in expanded state */
  label: string
  /** Optional small label for collapsed state (shown below icon) */
  collapsedLabel?: string
  /** Whether the button is expanded */
  expanded?: boolean
}

const ExpandableButton = React.forwardRef<HTMLButtonElement, ExpandableButtonProps>(
  ({ className, variant, icon, label, collapsedLabel, expanded = false, ...props }, ref) => {
    const isSidepanelEntry = variant === "sidepanel-entry"

    return (
      <button
        ref={ref}
        className={cn(
          expandableButtonVariants({ variant }),
          expanded
            ? isSidepanelEntry
              ? "h-12 px-5 gap-3 flex-row justify-start"
              : "h-10 px-4 gap-2 flex-row"
            : collapsedLabel
              ? isSidepanelEntry
                ? "h-auto min-h-14 w-14 px-3 py-3 flex-col gap-1 justify-center"
                : "h-auto min-h-12 w-12 px-2 py-2 flex-col gap-0.5 justify-center"
              : isSidepanelEntry
                ? "size-12 justify-center"
                : "size-10 justify-center",
          className
        )}
        {...props}
      >
        <span className="[&_svg]:size-5 flex items-center justify-center shrink-0">
          {icon}
        </span>
        {expanded ? (
          <span className="transition-opacity duration-300">{label}</span>
        ) : collapsedLabel ? (
          <span className="text-[10px] font-medium leading-tight text-center truncate max-w-full">
            {collapsedLabel}
          </span>
        ) : null}
      </button>
    )
  }
)
ExpandableButton.displayName = "ExpandableButton"

export { ExpandableButton, expandableButtonVariants }
