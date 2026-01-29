// components/admin/layout/Sidebar.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  FolderKanban, 
  FileText, 
  MessageSquare,
  BarChart3,
  Settings,
  Users,
  Code2,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import { motion } from 'framer-motion'

const navItems = [
  { 
    name: 'Dashboard', 
    href: '/admin', 
    icon: LayoutDashboard 
  },
  { 
    name: 'Projets', 
    href: '/admin/projects', 
    icon: FolderKanban 
  },
  { 
    name: 'Articles', 
    href: '/admin/blog', 
    icon: FileText 
  },
  { 
    name: 'Compétences', 
    href: '/admin/skills', 
    icon: Code2 
  },
  { 
    name: 'Messages', 
    href: '/admin/messages', 
    icon: MessageSquare,
    badge: 3 
  },
  { 
    name: 'Analytics', 
    href: '/admin/analytics', 
    icon: BarChart3 
  },
  { 
    name: 'Utilisateurs', 
    href: '/admin/users', 
    icon: Users 
  },
  { 
    name: 'Paramètres', 
    href: '/admin/settings', 
    icon: Settings 
  },
]

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Overlay mobile */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity ${
          collapsed ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setCollapsed(false)}
      />
      
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: collapsed ? -300 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed inset-y-0 left-0 z-50 w-64 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out ${
          collapsed ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <Link href="/admin" className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary text-white">
                <Code2 className="h-6 w-6" />
              </div>
              {!collapsed && (
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Admin Panel
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {!collapsed && (
                    <>
                      <span className="ml-3 font-medium">{item.name}</span>
                      {item.badge && (
                        <span className="ml-auto px-2 py-1 text-xs font-medium bg-red-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* User & Logout */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center text-white font-bold">
                A
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    admin@example.com
                  </p>
                </div>
              )}
            </div>
            
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className={`mt-4 flex items-center w-full px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                collapsed ? 'justify-center' : ''
              }`}
            >
              <LogOut className="h-5 w-5" />
              {!collapsed && (
                <span className="ml-3 font-medium">Déconnexion</span>
              )}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Toggle button pour desktop */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:fixed lg:flex items-center justify-center top-4 left-4 z-40 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
      >
        {collapsed ? (
          <ChevronRight className="h-5 w-5" />
        ) : (
          <ChevronLeft className="h-5 w-5" />
        )}
      </button>
    </>
  )
}