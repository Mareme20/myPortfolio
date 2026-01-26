// components/sections/Skills.tsx
'use client'

import { motion } from 'framer-motion'
import { Code2, Palette, Server, Database, Cloud, Layers, CheckCircle } from 'lucide-react'

const skills = [
  { category: 'Frontend', level: 90, icon: Code2, color: '#3B82F6', technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind'] },
  { category: 'Backend', level: 85, icon: Server, color: '#10B981', technologies: ['Node.js', 'Express', 'Python', 'Java'] },
  { category: 'Base de données', level: 80, icon: Database, color: '#8B5CF6', technologies: ['MongoDB', 'PostgreSQL', 'Redis', 'SQL'] },
  { category: 'DevOps', level: 75, icon: Cloud, color: '#F59E0B', technologies: ['Docker', 'AWS', 'Git', 'CI/CD'] },
  { category: 'UI/UX', level: 70, icon: Palette, color: '#EC4899', technologies: ['Figma', 'Framer Motion', 'Storybook'] },
  { category: 'Architecture', level: 85, icon: Layers, color: '#06B6D4', technologies: ['Microservices', 'REST API', 'Design Patterns'] },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mes <span className="text-primary">Compétences</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Technologies et outils que j'utilise quotidiennement pour créer des applications performantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon
            
            return (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div 
                    className="p-3 rounded-lg mr-4"
                    style={{ backgroundColor: skill.color + '20' }}
                  >
                    <Icon className="h-6 w-6" style={{ color: skill.color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{skill.category}</h3>
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-3">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: skill.color }}
                        />
                      </div>
                      <span className="font-bold text-gray-700 dark:text-gray-300">{skill.level}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-900 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Soft Skills */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 to-purple-600/5 dark:from-primary/10 dark:to-purple-600/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Soft Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Communication claire',
              'Résolution de problèmes',
              'Travail d\'équipe',
              'Gestion du temps',
              'Adaptabilité',
              'Curiosité intellectuelle',
              'Esprit critique',
              'Créativité'
            ].map((skill, index) => (
              <div key={index} className="flex items-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}