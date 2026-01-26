// components/sections/Hero.tsx
'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowDown, Sparkles } from 'lucide-react'
import { socialLinks } from '@/lib/data'
import FadeIn from '@/components/animations/FadeIn'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-900 dark:to-gray-800" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <FadeIn delay={0.2}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary dark:bg-primary/20 mb-8">
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">
                Étudiante en 3ème année de Génie Logiciel
              </span>
            </div>
          </FadeIn>

          {/* Titre principal */}
          <FadeIn delay={0.4} direction="up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Passionnée
              </span>{' '}
              par le{' '}
              <span className="bg-gradient-to-r from-secondary to-blue-500 bg-clip-text text-transparent">
                développement
              </span>{' '}
              et l'<span className="underline decoration-wavy decoration-primary">innovation</span>
            </h1>
          </FadeIn>

          {/* Sous-titre */}
          <FadeIn delay={0.6} direction="up">
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              Je crée des applications web modernes avec React, Next.js et TypeScript.
              Actuellement à la recherche d'un stage de fin d'études en développement full-stack.
            </p>
          </FadeIn>

          {/* CTA Buttons */}
          <FadeIn delay={0.8} direction="up">
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <a
                href="#projects"
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all transform hover:-translate-y-1 font-medium text-lg shadow-lg hover:shadow-xl"
              >
                Voir mes projets
              </a>
              <a
                href="/contact"
                className="px-8 py-3 border-2 border-primary text-primary dark:text-white rounded-lg hover:bg-primary/10 transition-all font-medium text-lg"
              >
                Me contacter
              </a>
            </div>
          </FadeIn>

          {/* Social Links */}
          <FadeIn delay={1} direction="up">
            <div className="flex justify-center space-x-6">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href={`mailto:${socialLinks.email}`}
                className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </FadeIn>

          {/* Scroll Indicator */}
          <FadeIn delay={1.2} direction="up">
            <div className="mt-16">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-block"
              >
                <ArrowDown className="h-8 w-8 text-gray-400" />
              </motion.div>
              <p className="text-sm text-gray-500 mt-2">Scroll pour découvrir</p>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
    </section>
  )
}