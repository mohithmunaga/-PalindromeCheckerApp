import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET() { const data = await prisma.customer.findMany({ orderBy: { createdAt: "desc" } }); return NextResponse.json(data); }
export async function POST(req: Request) { const body = await req.json(); const data = await prisma.customer.create({ data: body }); return NextResponse.json(data); }
