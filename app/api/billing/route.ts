import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
export async function GET() { const data = await prisma.invoice.findMany({ include: { customer: true, items: true }, orderBy: { createdAt: "desc" } }); return NextResponse.json(data); }
export async function POST(req: Request) {
  const session = await getSession(); if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { customerId, date, items, transportCharges, otherCharges, paidAmount } = await req.json();
  let subtotal = items.reduce((acc: number, item: any) => acc + (item.quantity * item.rate), 0);
  const totalAmount = subtotal + (transportCharges || 0) + (otherCharges || 0);
  const balanceAmount = totalAmount - (paidAmount || 0);
  const count = await prisma.invoice.count();
  const invoiceNumber = "INV-" + new Date().getFullYear() + "-" + (count + 1).toString().padStart(4, "0");
  try {
    const result = await prisma.$transaction(async (tx: any) => {
      const inv = await tx.invoice.create({
        data: { invoiceNumber, date: new Date(date), customerId, transportCharges: transportCharges || 0, otherCharges: otherCharges || 0, totalAmount, paidAmount: paidAmount || 0, balanceAmount, status: balanceAmount <= 0 ? "PAID" : "PARTIAL",
          items: { create: items.map((i: any) => ({ productName: i.productName, brandName: i.brandName, quantity: i.quantity, rate: i.rate, total: i.quantity * i.rate })) }
        }
      });
      for (const item of items) {
        const inven = await tx.inventory.findFirst({ where: { product: { name: item.productName }, brand: { name: item.brandName } } });
        if (inven) { await tx.inventory.update({ where: { id: inven.id }, data: { quantity: { decrement: item.quantity } } }); }
      }
      return inv;
    });
    return NextResponse.json(result);
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
