import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
export async function GET() {
  const outstanding = await prisma.invoice.groupBy({ by: ['customerId'], where: { balanceAmount: { gt: 0 } }, _sum: { balanceAmount: true }, _count: { id: true } });
  const results = await Promise.all(outstanding.map(async (item: any) => {
    const customer = await prisma.customer.findUnique({ where: { id: item.customerId } });
    return { ...customer, pendingAmount: item._sum.balanceAmount, billCount: item._count.id };
  }));
  return NextResponse.json(results);
}
