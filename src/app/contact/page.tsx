import { Mail, Linkedin, Github, Clock, Calendar, ArrowUpRight, Sparkles, Zap, MessageSquare } from 'lucide-react'
import FadeIn from '@/components/animations/FadeIn'
import ContactForm from '@/components/contact/ContactForm'
import { socialLinks } from '@/lib/data'
import styles from './ContactPage.module.css'

const contactBlocks = [
  {
    icon: Mail,
    title: 'Email',
    value: socialLinks.email,
    href: `mailto:${socialLinks.email}`,
    note: 'Réponse sous 48h',
    color: '#6366f1',
  },
  {
    icon: Linkedin,
    title: 'LinkedIn',
    value: 'Profil professionnel',
    href: socialLinks.linkedin, // https://www.linkedin.com/in/mari%C3%A8me-ndiaye-89a771259/,
    note: 'Opportunités et networking',
    color: '#0a66c2',
  },
  {
    icon: Github,
    title: 'GitHub',
    value: 'Code et projets',
    href: socialLinks.github,
    note: 'Historique technique',
    color: '#333333',
  },
  {
    icon: Calendar,
    title: 'Appel',
    value: 'Planifier un rendez-vous',
    href: 'https://cal.com/votrenom',
    note: 'Créneaux sur demande',
    color: '#10b981',
  },
]

export default function ContactPage() {
  return (
    <div className={styles.page}>
      {/* Éléments décoratifs */}
      <div className={styles.backgroundDecor}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gridPattern} />
      </div>

      <div className={styles.container}>
        {/* En-tête */}
        <FadeIn>
          <header className={styles.header}>
            <div className={styles.headerBadge}>
              <Sparkles className={styles.badgeIcon} />
              <span>Contact</span>
              <span className={styles.badgeDot} />
            </div>
            
            <h1 className={styles.title}>
              Discutons de votre
              <span className={styles.titleHighlight}> prochain projet.</span>
            </h1>
            
            <p className={styles.description}>
              Partagez votre contexte, vos objectifs et votre calendrier. 
              Je vous répondrai avec une proposition claire et concrète 
              pour avancer ensemble.
            </p>
          </header>
        </FadeIn>

        {/* Contenu principal */}
        <div className={styles.grid}>
          {/* Formulaire */}
          <div className={styles.formColumn}>
            <FadeIn delay={0.1}>
              <ContactForm />
            </FadeIn>
          </div>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            {/* Blocs de contact */}
            <div className={styles.contactBlocks}>
              {contactBlocks.map((item, index) => {
                const Icon = item.icon
                return (
                  <FadeIn key={item.title} delay={0.1 * (index + 1)}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={styles.contactBlock}
                    >
                      <div className={styles.contactBlockContent}>
                        <div 
                          className={styles.contactIcon}
                          style={{ 
                            background: `${item.color}15`,
                            color: item.color,
                            borderColor: `${item.color}30`,
                          }}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        
                        <div className={styles.contactInfo}>
                          <span className={styles.contactTitle}>{item.title}</span>
                          <span className={styles.contactValue}>{item.value}</span>
                          <span className={styles.contactNote}>{item.note}</span>
                        </div>
                      </div>
                      
                      <div className={styles.contactArrow}>
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </a>
                  </FadeIn>
                )
              })}
            </div>

            {/* Disponibilité */}
            <FadeIn delay={0.5}>
              <div className={styles.availability}>
                <div className={styles.availabilityHeader}>
                  <div className={styles.availabilityIcon}>
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className={styles.availabilityTitle}>Disponibilité actuelle</h3>
                    <p className={styles.availabilitySubtitle}>
                      Prête à collaborer
                    </p>
                  </div>
                  <span className={styles.availabilityDot} />
                </div>
                
                <div className={styles.availabilityList}>
                  <div className={styles.availabilityItem}>
                    <Zap className="h-3.5 w-3.5" />
                    <span>Stage & Alternance</span>
                  </div>
                  <div className={styles.availabilityItem}>
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Freelance sélectif</span>
                  </div>
                  <div className={styles.availabilityItem}>
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Projets open source</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </aside>
        </div>
      </div>
    </div>
  )
}