"use client"
import { useEffect, useState } from "react"
import DashboardLayout from "@/components/dashboard/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText } from "lucide-react"
export default function BillingPage() {
  const [invoices, setInvoices] = useState<any[]>([])
  useEffect(() => { fetch("/api/billing").then(res => res.json()).then(setInvoices) }, [])
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div><h1 className="text-3xl font-bold text-slate-800">Billing</h1><p className="text-slate-500">Create and manage customer invoices</p></div>
        <Button className="rounded-xl px-6 h-12 gap-2 shadow-lg"><Plus size={20} />Create New Bill</Button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {invoices.map((inv) => (
          <Card key={inv.id} className="premium-card">
            <CardContent className="p-6 flex justify-between items-center">
                <div className="flex items-center gap-4"><FileText className="text-primary" /><p className="font-bold">{inv.invoiceNumber}</p></div>
                <div className="text-right"><p className="font-bold">₹{inv.totalAmount.toLocaleString()}</p><p className="text-xs text-slate-400">{inv.status}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
