'use client'

import { useSession } from 'next-auth/react'

export default function AdminHeader() {
  const { data: session } = useSession()

  return (
    <header className="border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-700 dark:bg-gray-800 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Administration</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">{session?.user?.email ?? 'Admin'}</p>
      </div>
    </header>
  )
}
