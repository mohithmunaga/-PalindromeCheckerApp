"use client"
import { useEffect, useState } from "react"
import DashboardLayout from "@/components/dashboard/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Tag, MoreVertical } from "lucide-react"
import { motion } from "framer-motion"
export default function BrandsPage() {
  const [brands, setBrands] = useState<any[]>([])
  const [newBrand, setNewBrand] = useState("")
  useEffect(() => { fetch("/api/brands").then(res => res.json()).then(setBrands) }, [])
  const handleAddBrand = async (e: any) => {
    e.preventDefault()
    if (!newBrand) return
    const res = await fetch("/api/brands", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: newBrand }) })
    if (res.ok) { setNewBrand(""); fetch("/api/brands").then(res => res.json()).then(setBrands) }
  }
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8"><div><h1 className="text-3xl font-bold text-slate-800">Brands</h1><p className="text-slate-500">Manage pulse brands and labels</p></div></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="premium-card sticky top-28">
            <CardHeader><CardTitle>Add New Brand</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleAddBrand} className="space-y-4">
                <div className="space-y-2"><label className="text-sm font-medium text-slate-700">Brand Name</label><Input placeholder="e.g. Premium Gold" value={newBrand} onChange={(e) => setNewBrand(e.target.value)} className="h-12 rounded-xl" /></div>
                <Button className="w-full h-12 rounded-xl gap-2" type="submit"><Plus size={18} />Save Brand</Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {brands.map((brand, index) => (
              <motion.div key={brand.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-4"><div className="bg-slate-50 p-3 rounded-xl group-hover:bg-primary/10 group-hover:text-primary transition-colors"><Tag size={20} /></div><div><h3 className="font-bold text-slate-800">{brand.name}</h3><p className="text-xs text-slate-400">Active</p></div></div>
                <Button variant="ghost" size="icon" className="rounded-full"><MoreVertical size={18} className="text-slate-400" /></Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
