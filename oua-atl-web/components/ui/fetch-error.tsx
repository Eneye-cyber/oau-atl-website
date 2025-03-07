"use client"

import * as React from "react"
import { AlertCircle, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export interface FetchErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  message?: string
  error?: Error | null
  onRetry?: () => void
  retryText?: string
  showDetails?: boolean
}

export function FetchError({
  title = "Failed to load data",
  message = "There was a problem fetching the data. Please try again.",
  error = null,
  onRetry,
  retryText = "Try again",
  showDetails = false,
  className,
  ...props
}: FetchErrorProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5 p-6 text-center",
        className,
      )}
      role="alert"
      aria-live="assertive"
      {...props}
    >
      <AlertCircle className="h-12 w-12 text-destructive" aria-hidden="true" />
      <h3 className="mt-4 text-lg font-semibold text-destructive">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>

      {onRetry && (
        <Button onClick={onRetry} className="mt-4" variant="secondary">
          <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
          {retryText}
        </Button>
      )}

      {error && showDetails && (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-4 w-full max-w-md">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="text-xs">
              {isOpen ? "Hide error details" : "Show error details"}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-2 rounded-md bg-muted p-3 text-left">
              <p className="text-xs font-mono break-all whitespace-pre-wrap">{error.message || "Unknown error"}</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  )
}

