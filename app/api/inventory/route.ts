import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
export async function GET() { const data = await prisma.inventory.findMany({ include: { product: true, brand: true }, orderBy: { lastUpdated: "desc" } }); return NextResponse.json(data); }
export async function POST(req: Request) {
  const { productId, brandId, quantity, unit, purchasePrice, sellingPrice, type } = await req.json();
  const data = await prisma.inventory.upsert({
    where: { productId_brandId: { productId, brandId } },
    update: { quantity: type === "ADDITION" ? { increment: quantity } : { decrement: quantity }, purchasePrice, sellingPrice, lastUpdated: new Date() },
    create: { productId, brandId, quantity, unit, purchasePrice, sellingPrice }
  });
  return NextResponse.json(data);
}
