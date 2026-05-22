'use client'

const items = [
  'Nouveau message reçu via le formulaire de contact',
  'Projet "Portfolio" mis a jour',
  'Connexion administrateur reussie',
]

export default function RecentActivity() {
  return (
    <section className="rounded-xl bg-white p-6 shadow dark:bg-gray-800">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Activite recente</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="rounded-lg border border-gray-100 px-4 py-3 text-sm text-gray-700 dark:border-gray-700 dark:text-gray-300">
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
