"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, History, Settings, User, TrendingUp, CreditCard } from "lucide-react"

interface DashboardNavProps {
    userType: "customer" | "lender"
}

export function DashboardNav({ userType }: DashboardNavProps) {
    const pathname = usePathname()

    const customerNavItems = [
        {
            title: "Dashboard",
            href: "/customer/dashboard",
            icon: LayoutDashboard,
        }
    ]

    const lenderNavItems = [
        {
            title: "Dashboard",
            href: "/lender/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "My Products",
            href: "/lender/products",
            icon: Package,
            badge: "4", // Could be dynamic
        },
    ]

    const navItems = userType === "customer" ? customerNavItems : lenderNavItems

    return (
        <nav className="space-y-2">
            {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                    <Link key={item.href} href={item.href}>
                        <div
                            className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors
                ${isActive
                                    ? "bg-[#3d000c] text-white"
                                    : "text-gray-700 hover:bg-[#6f0218] hover:text-white"}`}
                        >
                            <Icon className="h-4 w-4" />
                            {item.title}
                        </div>
                    </Link>
                )
            })}
        </nav>
    )
}
