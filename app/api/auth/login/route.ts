import { NextResponse } from "next/server"
import { encrypt } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
export async function POST(request: Request) {
  const { username, password } = await request.json()
  try {
    let user = await prisma.user.findUnique({ where: { username } })
    if (!user && username === "admin") {
      const hashedPassword = await bcrypt.hash(password, 10)
      user = await prisma.user.create({ data: { username: "admin", password: hashedPassword, role: "ADMIN" } })
    }
    if (!user || !(await bcrypt.compare(password, user.password))) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const session = await encrypt({ userId: user.id, username: user.username, role: user.role, expires })
    const cookieStore = await cookies()
    cookieStore.set("session", session, { expires, httpOnly: true })
    return NextResponse.json({ success: true })
  } catch (error: any) { return NextResponse.json({ error: "Internal server error" }, { status: 500 }) }
}
