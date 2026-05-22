'use client'

import { FolderKanban, Eye, Mail, FileText } from 'lucide-react'

interface DashboardStats {
  totalProjects: number
  publishedProjects: number
  totalMessages: number
  unreadMessages: number
  totalVisits: number
  blogPosts: number
}

interface StatsCardsProps {
  stats: DashboardStats
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      label: 'Projets',
      value: stats.totalProjects,
      icon: FolderKanban,
    },
    {
      label: 'Visites',
      value: stats.totalVisits,
      icon: Eye,
    },
    {
      label: 'Messages non lus',
      value: stats.unreadMessages,
      icon: Mail,
    },
    {
      label: 'Articles',
      value: stats.blogPosts,
      icon: FileText,
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon

        return (
          <div key={card.label} className="rounded-xl bg-white p-5 shadow dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">{card.label}</p>
              <Icon className="h-5 w-5 text-gray-400" />
            </div>
            <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">{card.value}</p>
          </div>
        )
      })}
    </div>
  )
}
