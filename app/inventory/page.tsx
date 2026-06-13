"use client"
import { useEffect, useState } from "react"
import DashboardLayout from "@/components/dashboard/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Plus } from "lucide-react"
export default function InventoryPage() {
  const [inventory, setInventory] = useState<any[]>([])
  useEffect(() => { fetch("/api/inventory").then(res => res.json()).then(setInventory) }, [])
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div><h1 className="text-3xl font-bold text-slate-800">Inventory</h1><p className="text-slate-500">Track stock levels and prices</p></div>
        <Button className="rounded-xl px-6 h-12 gap-2 shadow-lg"><Plus size={20} />Add/Adjust Stock</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventory.map((item) => (
          <Card key={item.id} className="premium-card">
            <CardHeader><CardTitle className="text-lg">{item.product.name}</CardTitle></CardHeader>
            <CardContent>
                <div className="flex justify-between font-bold"><span className="text-slate-400">Stock:</span><span>{item.quantity} {item.unit}</span></div>
                <div className="flex justify-between mt-2"><span className="text-slate-400">Price:</span><span className="text-primary">₹{item.sellingPrice}</span></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}
