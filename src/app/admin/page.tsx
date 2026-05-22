// app/admin/page.tsx
'use client'

import { useEffect, useState } from 'react'
import StatsCards from '@/components/admin/dashboard/StatsCards'
import RecentActivity from '@/components/admin/dashboard/RecentActivity'
import QuickActions from '@/components/admin/dashboard/QuickActions'
import { motion } from 'framer-motion'

interface DashboardStats {
  totalProjects: number
  publishedProjects: number
  totalMessages: number
  unreadMessages: number
  totalVisits: number
  blogPosts: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Bienvenue dans votre espace d'administration
        </p>
      </div>

      {/* Stats Grid */}
      {stats && <StatsCards stats={stats} />}

      {/* Charts & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Visites récentes</h3>
            <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
              Graphique des visites (Chart.js ou Recharts)
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <QuickActions />
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <RecentActivity />
      </motion.div>
    </div>
  )
}