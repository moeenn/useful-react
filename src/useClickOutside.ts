import { useCallback, useEffect, useRef } from "react"

export const useClickOutside = (cb: () => void) => {
  const ref = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (!ref.current) return

      const isClickOutside = !ref.current.contains(event.target as Node)
      const prevent = (event.target as HTMLElement).dataset["prevent"]
      if (prevent == "true") return

      if (isClickOutside) cb()
    },
    [cb, ref],
  )

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [handleClickOutside])

  return ref
}
