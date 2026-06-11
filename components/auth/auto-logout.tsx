"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
export function AutoLogout({ timeout = 30 * 60 * 1000 }: { timeout?: number }) {
  const router = useRouter()
  useEffect(() => {
    let timer: NodeJS.Timeout
    const resetTimer = () => {
      clearTimeout(timer)
      timer = setTimeout(async () => {
        await fetch("/api/auth/logout", { method: "POST" })
        router.push("/login")
      }, timeout)
    }
    const events = ["mousedown", "mousemove", "keydown", "scroll", "touchstart"]
    events.forEach((event) => document.addEventListener(event, resetTimer))
    resetTimer()
    return () => {
      events.forEach((event) => document.removeEventListener(event, resetTimer))
      clearTimeout(timer)
    }
  }, [router, timeout])
  return null
}
