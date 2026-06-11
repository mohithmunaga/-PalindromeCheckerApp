"use client"
import { useEffect, useState } from "react"
import DashboardLayout from "@/components/dashboard/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, FileText, CreditCard, Package, AlertTriangle, ArrowRight, Plus } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function DashboardPage() {
  const [stats, setStats] = useState<any>({ totalSales: 0, totalCollected: 0 })
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch("/api/reports/sales?range=today")
      .then(res => res.json())
      .then(data => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false))
  }, [])
  if (loading) return <DashboardLayout>Loading dashboard...</DashboardLayout>
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-10">
        <div><h1 className="text-3xl font-black text-slate-800 tracking-tight">System Dashboard</h1><p className="text-slate-500 font-medium">Business overview for today</p></div>
        <Link href="/billing"><Button className="rounded-2xl px-8 h-14 gap-3 shadow-xl text-md font-bold"><Plus size={22} />Create New Invoice</Button></Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Today's Sales", value: "₹" + (stats.totalSales || 0).toLocaleString(), icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Outstanding", value: "₹2,45,000", icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Total Collected", value: "₹" + (stats.totalCollected || 0).toLocaleString(), icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Total Customers", value: "48", icon: Users, color: "text-violet-600", bg: "bg-violet-50" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="premium-card border-none">
              <CardContent className="pt-8"><div className="flex flex-col items-start gap-4"><div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}><stat.icon size={24} /></div><div><p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p><h3 className="text-2xl font-black text-slate-800 tracking-tight">{stat.value}</h3></div></div></CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  )
}
