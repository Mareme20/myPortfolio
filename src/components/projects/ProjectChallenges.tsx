// components/projects/ProjectChallenges.tsx
'use client'
import { AnimatePresence } from "framer-motion";
import { useState } from 'react'
import { 
  Target, 
  Lightbulb, 
  Zap, 
  BookOpen,
  TrendingUp
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Project } from '@/lib/data'

interface ProjectChallengesProps {
  project: Project
}

const challengesData = {
  technical: [
    'Optimisation des performances avec Next.js Image',
    'Gestion d\'état complexe avec plusieurs fournisseurs de données',
    'Mise en place d\'un système d\'authentification sécurisé',
    'Tests end-to-end avec Cypress',
  ],
  solutions: [
    'Implémentation de lazy loading et de code splitting',
    'Utilisation de React Query pour la gestion du cache',
    'Mise en place de JWT avec refresh tokens',
    'Création d\'un pipeline CI/CD avec GitHub Actions',
  ],
  learnings: [
    'Architecture modulaire et scalable',
    'Bonnes pratiques de sécurité web',
    'Optimisation du Core Web Vitals',
    'Déploiement multi-environnements',
  ]
}

export default function ProjectChallenges({ project }: ProjectChallengesProps) {
  const [activeTab, setActiveTab] = useState<'challenges' | 'solutions' | 'learnings'>('challenges')

  return (
    <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
      <h2 className="text-2xl font-bold mb-8">
        Défis & Apprentissages
      </h2>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
        {[
          { id: 'challenges', label: 'Défis', icon: Target },
          { id: 'solutions', label: 'Solutions', icon: Lightbulb },
          { id: 'learnings', label: 'Apprentissages', icon: BookOpen },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-6 py-3 font-medium border-b-2 transition-colors ${
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Icon className="h-5 w-5 mr-2" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Contenu des tabs */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {activeTab === 'challenges' && (
            <div className="grid md:grid-cols-2 gap-6">
              {challengesData.technical.map((challenge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-100 dark:border-red-800/30"
                >
                  <div className="flex items-start mb-3">
                    <Target className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Défi technique #{index + 1}
                    </h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{challenge}</p>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'solutions' && (
            <div className="space-y-4">
              {challengesData.solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-100 dark:border-green-800/30"
                >
                  <div className="flex items-start">
                    <Lightbulb className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Solution innovante
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">{solution}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'learnings' && (
            <div className="grid md:grid-cols-2 gap-6">
              {challengesData.learnings.map((learning, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-100 dark:border-blue-800/30"
                >
                  <div className="flex items-center mb-4">
                    <BookOpen className="h-6 w-6 text-blue-500 mr-3" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Acquisition de compétence
                    </h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{learning}</p>
                  <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    <span>Niveau de maîtrise: {85 + index * 5}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Stats */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          <Zap className="h-5 w-5 mr-3 text-yellow-500" />
          Impact du projet
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Performance', value: '95%', color: 'text-green-600' },
            { label: 'Maintenabilité', value: '90%', color: 'text-blue-600' },
            { label: 'Sécurité', value: '98%', color: 'text-red-600' },
            { label: 'UX/UI', value: '92%', color: 'text-purple-600' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}