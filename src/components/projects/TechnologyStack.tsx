'use client'

import { motion } from 'framer-motion'
import { 
  Cpu, Database, Globe, Palette, Server, 
  Layers, Zap, Sparkles, Hexagon 
} from 'lucide-react'
import type { Variants } from 'framer-motion'

interface TechnologyStackProps {
  technologies: string[]
}

function getIcon(tech: string) {
  const value = tech.toLowerCase()
  if (value.includes('react') || value.includes('next') || value.includes('vue')) return Globe
  if (value.includes('node') || value.includes('express') || value.includes('api') || value.includes('rest')) return Server
  if (value.includes('sql') || value.includes('mongo') || value.includes('postgres') || value.includes('prisma')) return Database
  if (value.includes('tailwind') || value.includes('css') || value.includes('figma') || value.includes('design')) return Palette
  if (value.includes('docker') || value.includes('aws') || value.includes('cloud') || value.includes('ci/cd')) return Layers
  return Cpu
}

function getCategory(tech: string): string {
  const value = tech.toLowerCase()
  if (value.includes('react') || value.includes('next') || value.includes('vue') || value.includes('tailwind') || value.includes('css')) return 'Frontend'
  if (value.includes('node') || value.includes('express') || value.includes('api') || value.includes('rest')) return 'Backend'
  if (value.includes('sql') || value.includes('mongo') || value.includes('postgres') || value.includes('prisma')) return 'Base de données'
  if (value.includes('docker') || value.includes('aws') || value.includes('cloud') || value.includes('ci/cd')) return 'DevOps'
  if (value.includes('figma') || value.includes('design')) return 'Design'
  return 'Outils'
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 10,
    },
  },
}

export default function TechnologyStack({ technologies }: TechnologyStackProps) {
  // Grouper les technologies par catégorie
  const groupedTechnologies = technologies.reduce((acc, tech) => {
    const category = getCategory(tech)
    if (!acc[category]) acc[category] = []
    acc[category].push(tech)
    return acc
  }, {} as Record<string, string[]>)

  return (
    <section className="panel p-6">
      {/* En-tête */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[hsl(var(--brand))] to-[hsl(var(--accent))] text-white shadow-lg"
          >
            <Hexagon className="h-5 w-5" />
          </motion.div>
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">
              Stack Technique
            </h3>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {technologies.length} technologies maîtrisées
            </p>
          </div>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-[hsl(var(--brand))]/10 to-[hsl(var(--accent))]/10 px-3 py-1.5"
        >
          <Zap className="h-3.5 w-3.5 text-[hsl(var(--brand))]" />
          <span className="text-xs font-bold text-[hsl(var(--brand))]">
            {Object.keys(groupedTechnologies).length} catégories
          </span>
        </motion.div>
      </div>

      {/* Liste des technologies par catégorie */}
      <div className="space-y-6">
        {Object.entries(groupedTechnologies).map(([category, techs]) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            {/* Titre de catégorie */}
            <div className="mb-2.5 flex items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300/50 to-transparent dark:via-slate-600/50" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {category}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300/50 to-transparent dark:via-slate-600/50" />
            </div>

            {/* Technologies de la catégorie */}
            <motion.div
              className="grid gap-2"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {techs.map((tech) => {
                const Icon = getIcon(tech)
                return (
                  <motion.div
                    key={tech}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.02,
                      x: 6,
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative overflow-hidden rounded-xl border border-slate-200/60 bg-white/50 px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:border-[hsl(var(--brand))]/30 hover:bg-white/80 hover:shadow-lg dark:border-slate-700/40 dark:bg-slate-900/40 dark:hover:border-[hsl(var(--brand))]/30 dark:hover:bg-slate-800/60"
                  >
                    {/* Effet de brillance au hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(var(--brand))]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    <div className="relative flex items-center gap-3">
                      {/* Icône avec fond dégradé */}
                      <div className="relative">
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[hsl(var(--brand))]/20 to-[hsl(var(--accent))]/20 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
                        <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 text-[hsl(var(--brand))] transition-all duration-300 group-hover:from-[hsl(var(--brand))]/10 group-hover:to-[hsl(var(--accent))]/10 group-hover:text-[hsl(var(--brand))] group-hover:shadow-md dark:from-slate-800 dark:to-slate-700/50">
                          <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                        </span>
                      </div>

                      {/* Nom de la technologie */}
                      <span className="text-sm font-semibold text-slate-700 transition-colors duration-300 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-slate-100">
                        {tech}
                      </span>

                      {/* Flèche décorative au hover */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="ml-auto opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--brand))]" />
                      </motion.div>
                    </div>

                    {/* Barre de progression subtile */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[hsl(var(--brand))]/0 via-[hsl(var(--brand))]/20 to-[hsl(var(--brand))]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Pied de carte */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-6 rounded-xl border border-dashed border-slate-300/40 bg-slate-50/50 p-3 text-center dark:border-slate-700/40 dark:bg-slate-900/40"
      >
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          🚀 Stack en constante évolution • Toujours à l'affût des meilleures pratiques
        </p>
      </motion.div>
    </section>
  )
}