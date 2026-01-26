// components/about/InterestsGrid.tsx
'use client'

import { motion } from 'framer-motion'
import { 
  Coffee, 
  Music, 
  Book,
  Gamepad2,
  Camera,
  Plane,
  Utensils,
  Palette,
  Cpu,
  Headphones
} from 'lucide-react'

const interests = [
  { 
    icon: Coffee, 
    name: 'Café & Café', 
    description: 'Exploratrice de cafés artisanaux',
    color: 'bg-amber-500' 
  },
  { 
    icon: Music, 
    name: 'Playlists Coding', 
    description: 'Lofi hip-hop et synthwave',
    color: 'bg-purple-500' 
  },
  { 
    icon: Book, 
    name: 'Tech Books', 
    description: 'Clean Code & Design Patterns',
    color: 'bg-blue-500' 
  },
  { 
    icon: Gamepad2, 
    name: 'Jeux Indés', 
    description: 'Hollow Knight, Celeste',
    color: 'bg-green-500' 
  },
  { 
    icon: Camera, 
    name: 'Photographie', 
    description: 'Street & Architecture',
    color: 'bg-pink-500' 
  },
  { 
    icon: Plane, 
    name: 'Voyages', 
    description: 'Japon 🇯🇵 prochaine destination',
    color: 'bg-cyan-500' 
  },
  { 
    icon: Utensils, 
    name: 'Cuisine', 
    description: 'Pâtisserie & cuisine asiatique',
    color: 'bg-orange-500' 
  },
  { 
    icon: Palette, 
    name: 'Design', 
    description: 'UI/UX et design systems',
    color: 'bg-red-500' 
  },
  { 
    icon: Cpu, 
    name: 'Tech Gadgets', 
    description: 'Matériel & nouvelles tech',
    color: 'bg-indigo-500' 
  },
  { 
    icon: Headphones, 
    name: 'Podcasts', 
    description: 'Syntax.fm, Ladybug Podcast',
    color: 'bg-teal-500' 
  },
]

export default function InterestsGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {interests.map((interest, index) => {
        const Icon = interest.icon
        
        return (
          <motion.div
            key={interest.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="group relative"
          >
            <div className="aspect-square bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-4 flex flex-col items-center justify-center text-center hover:border-primary transition-all hover:shadow-xl cursor-pointer">
              {/* Icon avec background coloré */}
              <div className={`p-3 rounded-xl ${interest.color} text-white mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className="h-6 w-6" />
              </div>
              
              {/* Nom */}
              <h4 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">
                {interest.name}
              </h4>
              
              {/* Description */}
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {interest.description}
              </p>
            </div>
            
            {/* Tooltip au hover */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              {interest.description}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}