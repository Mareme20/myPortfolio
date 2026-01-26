import FadeIn from '@/components/animations/FadeIn'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-20">
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              À propos de moi
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
              Étudiante en génie logiciel passionnée par le développement web moderne.
            </p>
          </div>
        </FadeIn>
        
        <div className="mt-20 max-w-3xl mx-auto">
          <FadeIn delay={0.2}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6">Mon parcours</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Actuellement en 3ème année de génie logiciel, je me spécialise dans le développement 
                full-stack avec React, Next.js et TypeScript. Mon intérêt pour la tech a commencé 
                il y a plusieurs années et n'a cessé de grandir depuis.
              </p>
              
              <h3 className="text-xl font-bold mb-4">Compétences principales</h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'MongoDB'].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-primary/10 text-primary rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
              
              <h3 className="text-xl font-bold mb-4">Objectifs</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li>• Trouver un stage de fin d'études en développement full-stack</li>
                <li>• Contribuer à des projets open source significatifs</li>
                <li>• Approfondir mes connaissances en architecture logicielle</li>
                <li>• Développer des applications qui résolvent des problèmes réels</li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}