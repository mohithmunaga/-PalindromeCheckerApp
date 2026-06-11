"use client"
import { useEffect, useState } from "react"
import DashboardLayout from "@/components/dashboard/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, User } from "lucide-react"
export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([])
  useEffect(() => { fetch("/api/customers").then(res => res.json()).then(setCustomers) }, [])
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div><h1 className="text-3xl font-bold text-slate-800">Customers</h1><p className="text-slate-500">Manage your business client records</p></div>
        <Button className="rounded-xl px-6 h-12 gap-2 shadow-lg"><Plus size={20} />Add Customer</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((c) => (
          <Card key={c.id} className="premium-card">
            <CardHeader><CardTitle>{c.name}</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-slate-500">{c.mobile}</p><p className="text-sm text-slate-500">{c.place}</p></CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
