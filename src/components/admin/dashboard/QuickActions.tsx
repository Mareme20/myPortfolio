'use client'

import Link from 'next/link'

const actions = [
  { label: 'Nouveau projet', href: '/admin/projects/new' },
  { label: 'Voir les messages', href: '/admin/messages' },
  { label: 'Parametres', href: '/admin/settings' },
]

export default function QuickActions() {
  return (
    <section className="rounded-xl bg-white p-6 shadow dark:bg-gray-800">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Actions rapides</h3>
      <div className="mt-4 space-y-2">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="block rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            {action.label}
          </Link>
        ))}
      </div>
    </section>
  )
}
