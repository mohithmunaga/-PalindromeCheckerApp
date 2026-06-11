"use client"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Users, Tag, Package, ShoppingCart, CreditCard, Truck, BarChart3, FileSpreadsheet, Settings, LogOut, Search, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
const sidebarItems = [
  { icon: Users, label: "Customers", href: "/customers" },
  { icon: Tag, label: "Brands", href: "/brands" },
  { icon: Package, label: "Products", href: "/products" },
  { icon: ShoppingCart, label: "Inventory", href: "/inventory" },
  { icon: FileSpreadsheet, label: "Billing", href: "/billing" },
  { icon: CreditCard, label: "Payments", href: "/payments" },
  { icon: Truck, label: "Transport", href: "/transport" },
  { icon: BarChart3, label: "Reports", href: "/reports" },
  { icon: Settings, label: "Settings", href: "/settings" },
]
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const handleLogout = async () => { await fetch("/api/auth/logout", { method: "POST" }); router.push("/login") }
  return (
    <div className="flex h-screen bg-slate-50">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg"><Package size={24} /></div>
          <span className="font-bold text-xl tracking-tight text-slate-800">PULSES<span className="text-primary">PRO</span></span>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          {sidebarItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-primary transition-all group cursor-pointer">
                <item.icon size={20} />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <Button variant="ghost" className="w-full justify-start gap-4 px-4 py-6 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600" onClick={handleLogout}><LogOut size={20} /><span className="font-medium">Logout</span></Button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-xl w-96"><Search size={18} className="text-slate-400" /><input placeholder="Search..." className="bg-transparent border-none focus:outline-none text-sm w-full" /></div>
          <div className="flex items-center gap-4"><Button variant="outline" size="icon" className="rounded-full border-slate-200"><Bell size={20} /></Button><div className="w-8 h-8 rounded-full bg-slate-200 shadow-sm overflow-hidden"><img src="https://ui-avatars.com/api/?name=Admin" alt="User" /></div></div>
        </header>
        <div className="p-8 max-w-7xl mx-auto w-full">{children}</div>
      </main>
    </div>
  )
}
