// lib/data.ts
export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  githubUrl: string
  liveUrl?: string
  imageUrl: string
  features: string[]
  category: 'web' | 'mobile' | 'backend' | 'fullstack' | 'ai'
  year: number
}

export const projects: Project[] = [
  {
    id: 'portfolio-nextjs',
    title: 'Portfolio Personnel',
    description: 'Portfolio moderne développé avec Next.js 14 et TypeScript',
    longDescription: 'Un portfolio full-stack avec animations, mode sombre, et formulaire de contact. Déployé sur Vercel avec CI/CD automatisé.',
    technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    githubUrl: 'https://github.com/votreusername/portfolio',
    liveUrl: 'https://votrenom.vercel.app',
    imageUrl: '/images/portfolio-project.png',
    features: [
      'Design responsive et moderne',
      'Animations fluides avec Framer Motion',
      'Mode sombre/clair',
      'Formulaire de contact avec Resend',
      'Optimisé SEO (100/100 Lighthouse)',
      'Dockerisé pour le déploiement'
    ],
    category: 'web',
    year: 2024
  },
  {
    id: 'task-manager-api',
    title: 'API de Gestion de Tâches',
    description: 'API REST complète avec authentification JWT',
    longDescription: 'Backend développé avec Node.js et Express, incluant système d\'authentification, CRUD complet, et tests unitaires.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Jest', 'Docker'],
    githubUrl: 'https://github.com/votreusername/task-manager-api',
    liveUrl: 'https://api-taskmanager.vercel.app',
    imageUrl: '/images/api-project.png',
    features: [
      'Authentification JWT avec refresh tokens',
      'CRUD complet pour les tâches',
      'Validation des données avec Zod',
      'Tests unitaires avec Jest (90% coverage)',
      'Documentation Swagger/OpenAPI',
      'Déploiement avec Docker Compose'
    ],
    category: 'backend',
    year: 2024
  },
  {
    id: 'ecommerce-react',
    title: 'Boutique E-commerce',
    description: 'Application e-commerce frontend avec panier dynamique',
    longDescription: 'Interface utilisateur complète avec gestion de panier, filtrage de produits, et simulation de paiement.',
    technologies: ['React', 'TypeScript', 'Redux Toolkit', 'Styled Components', 'Stripe'],
    githubUrl: 'https://github.com/votreusername/ecommerce-react',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    imageUrl: '/images/ecommerce-project.png',
    features: [
      'Gestion d\'état avec Redux Toolkit',
      'Panier persistant (localStorage)',
      'Filtres et recherche en temps réel',
      'Intégration Stripe pour paiement',
      'Design system réutilisable',
      'Responsive mobile-first'
    ],
    category: 'web',
    year: 2023
  }
]

export const skills = {
  languages: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL'],
  frontend: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Redux'],
  backend: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Redis'],
  tools: ['Git', 'Docker', 'AWS', 'Jest', 'Figma', 'Linux'],
  methodologies: ['Agile/Scrum', 'CI/CD', 'TDD', 'Microservices', 'REST APIs']
}

export const socialLinks = {
  github: 'https://github.com/votreusername',
  linkedin: 'https://linkedin.com/in/votrenom',
  email: 'contact@votredomaine.com'
}