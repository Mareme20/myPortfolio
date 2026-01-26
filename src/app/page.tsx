// app/page.tsx
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import ContactCTA from '@/components/sections/ContactCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Skills />
      <ContactCTA />
    </>
  )
}