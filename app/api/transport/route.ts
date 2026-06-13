import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
export async function GET() { const data = await prisma.delivery.findMany({ include: { invoice: { include: { customer: true } } }, orderBy: { date: "desc" } }); return NextResponse.json(data); }
export async function POST(req: Request) {
  const { invoiceId, vehicleNumber, driverName, status } = await req.json();
  const count = await prisma.delivery.count();
  const deliveryNumber = "DEL-" + new Date().getFullYear() + "-" + (count + 1).toString().padStart(4, "0");
  const data = await prisma.delivery.create({ data: { invoiceId, deliveryNumber, vehicleNumber, driverName, status } });
  return NextResponse.json(data);
}
