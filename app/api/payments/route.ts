import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
export async function GET() { const data = await prisma.payment.findMany({ include: { customer: true, invoice: true }, orderBy: { date: "desc" } }); return NextResponse.json(data); }
export async function POST(req: Request) {
  const { customerId, invoiceId, amount, date, method, notes } = await req.json();
  const res = await prisma.$transaction(async (tx: any) => {
    const p = await tx.payment.create({ data: { customerId, invoiceId, amount, date: new Date(date), method, notes } });
    if (invoiceId) {
      const inv = await tx.invoice.findUnique({ where: { id: invoiceId } });
      if (inv) {
        const newPaid = inv.paidAmount + amount;
        await tx.invoice.update({ where: { id: invoiceId }, data: { paidAmount: newPaid, balanceAmount: inv.totalAmount - newPaid, status: (inv.totalAmount - newPaid) <= 0 ? "PAID" : "PARTIAL" } });
      }
    }
    return p;
  });
  return NextResponse.json(res);
}
