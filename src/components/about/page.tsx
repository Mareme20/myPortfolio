// app/about/page.tsx
import FadeIn from '@/components/animations/FadeIn'
import Timeline from '@/components/about/Timeline'
import SkillsRadar from '@/components/about/SkillsRadar'
import EducationCard from '@/components/about/EducationCard'
import InterestsGrid from '@/components/about/InterestsGrid'
import { 
  GraduationCap, 
  Briefcase, 
  Target, 
  Heart,
  Code2,
  Globe,
  BookOpen,
  Sparkles
} from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary dark:bg-primary/20 mb-8">
                <Sparkles className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">
                  Étudiante en Génie Logiciel Passionnée
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Enchantée, je suis{' '}
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  [Votre Prénom]
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
                Développeuse full-stack en formation, passionnée par la création d'applications web innovantes 
                et l'optimisation des performances. Toujours à la recherche de nouveaux défis techniques.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex items-center">
                  <Code2 className="h-5 w-5 text-primary mr-2" />
                  <span className="font-medium">+3 ans d'expérience en développement</span>
                </div>
                <div className="flex items-center">
                  <Target className="h-5 w-5 text-secondary mr-2" />
                  <span className="font-medium">Spécialisée React/Next.js</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="font-medium">Français 🇫🇷 & Anglais 🇬🇧</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Timeline & Skills Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Timeline - 2/3 de largeur */}
            <div className="lg:col-span-2">
              <FadeIn delay={0.2}>
                <div className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 flex items-center">
                    <BookOpen className="h-8 w-8 mr-3 text-primary" />
                    Mon Parcours
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">
                    De mes débuts en programmation à mon parcours académique et professionnel, 
                    chaque étape a contribué à façonner ma passion pour le développement logiciel.
                  </p>
                </div>
              </FadeIn>
              <Timeline />
            </div>

            {/* Skills & Education - 1/3 de largeur */}
            <div className="space-y-12">
              <SkillsRadar />
              <EducationCard />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & Interests */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Philosophie */}
            <FadeIn>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary mr-4">
                    <Heart className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">Ma Philosophie</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                    <h3 className="font-bold text-lg mb-2 text-blue-700 dark:text-blue-300">
                      💡 Innovation & Apprentissage Continu
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Je crois que la technologie évolue constamment, et avec elle, notre façon de résoudre les problèmes. 
                      Je m'engage à apprendre et à m'adapter aux nouvelles technologies.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20">
                    <h3 className="font-bold text-lg mb-2 text-green-700 dark:text-green-300">
                      🎯 Qualité & Best Practices
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Un code propre, maintenable et bien testé n'est pas une option mais une nécessité. 
                      J'adopte les meilleures pratiques de développement et les principes SOLID.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                    <h3 className="font-bold text-lg mb-2 text-purple-700 dark:text-purple-300">
                      🤝 Collaboration & Communication
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Les meilleurs produits naissent de la collaboration. Je valorise la communication 
                      claire et le travail d'équipe pour atteindre des objectifs communs.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Centres d'intérêt */}
            <FadeIn delay={0.3}>
              <div>
                <h2 className="text-3xl font-bold mb-8 flex items-center">
                  <Sparkles className="h-8 w-8 mr-3 text-primary" />
                  Au-delà du code
                </h2>
                <InterestsGrid />
                
                {/* Fun Facts */}
                <div className="mt-12 bg-gradient-to-r from-primary/10 to-purple-600/10 dark:from-primary/20 dark:to-purple-600/20 rounded-2xl p-8">
                  <h3 className="text-xl font-bold mb-6">💡 Fun Facts</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Cafés par jour', value: '3 ☕' },
                      { label: 'Projets GitHub', value: '24+' },
                      { label: 'Stack préférée', value: 'Next.js' },
                      { label: 'Animal de code', value: 'Octocat 🐙' },
                    ].map((fact, index) => (
                      <div key={index} className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                        <div className="text-2xl font-bold text-primary mb-1">{fact.value}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{fact.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">
                Intéressé par mon profil ?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
                Que ce soit pour un stage, un projet collaboratif ou simplement échanger sur la tech, 
                je serais ravie de discuter avec vous !
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="/contact"
                  className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-lg"
                >
                  Me contacter
                </a>
                <a
                  href="/resume.pdf"
                  download
                  className="px-8 py-4 border-2 border-primary text-primary dark:text-white rounded-lg hover:bg-primary/10 transition-colors font-medium text-lg"
                >
                  Télécharger mon CV
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}