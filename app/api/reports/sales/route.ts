import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { startOfDay, endOfDay } from "date-fns"
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const range = searchParams.get("range") || "today"
  const now = new Date()
  const start = startOfDay(now)
  const end = endOfDay(now)
  const sales = await prisma.invoice.aggregate({ where: { date: { gte: start, lte: end } }, _sum: { totalAmount: true }, _count: { id: true } })
  const collections = await prisma.payment.aggregate({ where: { date: { gte: start, lte: end } }, _sum: { amount: true } })
  return NextResponse.json({ totalSales: sales._sum.totalAmount || 0, billCount: sales._count.id, totalCollected: collections._sum.amount || 0, chartData: [] })
}
