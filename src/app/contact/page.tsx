// app/contact/page.tsx
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare,
  Linkedin,
  Github,
  Calendar
} from 'lucide-react'
import FadeIn from '@/components/animations/FadeIn'
import ContactForm from '@/components/contact/ContactForm'
import { socialLinks } from '@/lib/data'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'contact@votredomaine.com',
    href: 'mailto:contact@votredomaine.com',
    description: 'Réponse sous 48h'
  },
  {
    icon: Linkedin,
    title: 'LinkedIn',
    value: 'linkedin.com/in/votrenom',
    href: socialLinks.linkedin,
    description: 'Connectons-nous'
  },
  {
    icon: Github,
    title: 'GitHub',
    value: 'github.com/votreusername',
    href: socialLinks.github,
    description: 'Voir mes projets'
  },
  {
    icon: Calendar,
    title: 'Disponibilité',
    value: 'Réunions',
    href: 'https://cal.com/votrenom',
    description: 'Planifier un appel'
  }
]

const faqs = [
  {
    question: 'Quel est votre délai de réponse?',
    answer: 'Je m\'efforce de répondre à tous les messages dans les 48 heures ouvrables.'
  },
  {
    question: 'Acceptez-vous des projets freelance?',
    answer: 'Oui, je suis ouverte à des projets freelance intéressants. Discutons de vos besoins!'
  },
  {
    question: 'Recherchez-vous un stage?',
    answer: 'Oui! Je suis actuellement à la recherche d\'un stage de fin d\'études en développement full-stack à partir de juin 2024.'
  },
  {
    question: 'Quelles sont vos technologies préférées?',
    answer: 'J\'adore travailler avec Next.js, TypeScript et Tailwind CSS, mais je suis toujours ouverte à apprendre de nouvelles technologies.'
  }
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Prenons <span className="text-primary">contact</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Que ce soit pour discuter d'une opportunité, collaborer sur un projet ou simplement échanger, n'hésitez pas à me contacter!
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Informations de contact */}
          <div className="space-y-8">
            {/* Cartes d'information */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <FadeIn key={info.title} delay={index * 0.1}>
                    <a
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group block p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary transition-all hover:shadow-lg"
                    >
                      <div className="flex items-start">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors mr-4">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                            {info.title}
                          </h3>
                          <p className="text-gray-900 dark:text-white font-medium mb-1">
                            {info.value}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </a>
                  </FadeIn>
                )
              })}
            </div>

            {/* FAQ */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <MessageSquare className="h-5 w-5 mr-3 text-primary" />
                Questions fréquentes
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                  >
                    <summary className="cursor-pointer font-medium text-gray-900 dark:text-white list-none">
                      <div className="flex justify-between items-center">
                        <span>{faq.question}</span>
                        <span className="text-primary transition-transform group-open:rotate-180">
                          ▼
                        </span>
                      </div>
                    </summary>
                    <p className="mt-3 text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            {/* CTA Réseaux sociaux */}
            <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 dark:from-primary/20 dark:to-purple-600/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Suivez mon travail</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Restez connecté et découvrez mes derniers projets et articles.
              </p>
              <div className="flex space-x-4">
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 p-3 bg-gray-900 text-white rounded-lg text-center hover:bg-black transition-colors font-medium"
                >
                  GitHub
                </a>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 p-3 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition-colors font-medium"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <FadeIn delay={0.6}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Projets réalisés', value: '15+' },
              { label: 'Clients satisfaits', value: '100%' },
              { label: 'Taux de réponse', value: '< 48h' },
              { label: 'Disponibilité', value: 'Immédiate' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700"
              >
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  )
}