// components/sections/ContactCTA.tsx
'use client'

import { motion } from 'framer-motion'
import { Mail, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function ContactCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-purple-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full mb-6">
              <Mail className="h-5 w-5 mr-2" />
              <span className="font-medium">Disponible pour de nouvelles opportunités</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Travaillons ensemble !
            </h2>
            
            <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
              Que vous ayez un projet en tête, une question technique ou simplement envie d'échanger sur le développement, n'hésitez pas à me contacter.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg inline-flex items-center"
            >
              Me contacter
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
            
            <a
              href="/resume.pdf"
              download
              className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium text-lg"
            >
              Télécharger mon CV
            </a>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-10 text-white/80"
          >
            Réponse garantie sous 48h
          </motion.p>
        </div>
      </div>
    </section>
  )
}