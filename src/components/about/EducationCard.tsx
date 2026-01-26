// components/about/EducationCard.tsx
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react'
import FadeIn from '@/components/animations/FadeIn'

const educationData = {
  current: {
    degree: 'Licence en Génie Logiciel',
    school: 'Université de Technologie',
    period: '2021 - 2024',
    location: 'Paris, France',
    gpa: '15.8/20',
    description: 'Spécialisation en développement web, architecture logicielle et gestion de projet.',
    courses: ['Développement Web Avancé', 'Base de données', 'Algorithmique', 'Architecture Logicielle'],
    achievements: [
      'Mention Bien',
      'Projet de fin d\'études : Plateforme de e-learning',
      'Participation à 3 hackathons'
    ]
  },
  certifications: [
    {
      name: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2023',
      icon: Award
    },
    {
      name: 'React Developer',
      issuer: 'Meta',
      date: '2022',
      icon: Award
    },
    {
      name: 'JavaScript Algorithms',
      issuer: 'freeCodeCamp',
      date: '2022',
      icon: Award
    }
  ]
}

export default function EducationCard() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800/30">
      <div className="flex items-center mb-6">
        <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
          <GraduationCap className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Formation</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Parcours académique</p>
        </div>
      </div>

      {/* Formation actuelle */}
      <FadeIn>
        <div className="mb-8 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-bold text-lg">{educationData.current.degree}</h4>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
              En cours
            </span>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <BookOpen className="h-4 w-4 mr-2" />
              {educationData.current.school}
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-2" />
              {educationData.current.period}
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4 mr-2" />
              {educationData.current.location}
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Award className="h-4 w-4 mr-2" />
              Moyenne: {educationData.current.gpa}
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
            {educationData.current.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {educationData.current.courses.map((course, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs"
              >
                {course}
              </span>
            ))}
          </div>

          <div className="space-y-2">
            {educationData.current.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center text-sm">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-3" />
                {achievement}
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Certifications */}
      <div>
        <h4 className="font-bold mb-4 flex items-center">
          <Award className="h-5 w-5 mr-2 text-blue-500" />
          Certifications
        </h4>
        <div className="space-y-4">
          {educationData.certifications.map((cert, index) => {
            const Icon = cert.icon
            return (
              <FadeIn key={cert.name} delay={index * 0.1}>
                <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex items-center">
                    <Icon className="h-5 w-5 text-blue-500 mr-3" />
                    <div>
                      <div className="font-medium">{cert.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{cert.issuer}</div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{cert.date}</span>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>

      <FadeIn delay={0.3}>
        <div className="mt-6 pt-6 border-t border-blue-200 dark:border-blue-800/30">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Toujours en apprentissage actif via des cours en ligne, des projets personnels et des contributions open source.
          </p>
        </div>
      </FadeIn>
    </div>
  )
}