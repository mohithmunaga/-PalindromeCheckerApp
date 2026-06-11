"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { LogIn } from "lucide-react"
export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError("")
    try {
      const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) })
      if (res.ok) router.push("/")
      else { const data = await res.json(); setError(data.error || "Login failed") }
    } catch (err) { setError("An unexpected error occurred") } finally { setLoading(false) }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <Card className="premium-card w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">Login to Pulses Wholesale Management</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="grid gap-4">
              {error && <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-lg text-center">{error}</div>}
              <div className="grid gap-2"> <Label htmlFor="username">Username</Label> <Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required /> </div>
              <div className="grid gap-2"> <Label htmlFor="password">Password</Label> <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /> </div>
            </CardContent>
            <CardFooter> <Button type="submit" className="w-full" disabled={loading}>{loading ? "Logging in..." : "Login"}</Button> </CardFooter>
          </form>
        </Card>
    </div>
  )
}
