import { notFound } from 'next/navigation'
import Link from 'next/link'
import { projects } from '@/lib/data'
import { 
  ArrowLeft, ExternalLink, Github, Calendar, ArrowRight,
  Sparkles, Target, Zap, Clock, Users, TrendingUp,
  Share2, Bookmark, Flag
} from 'lucide-react'
import ProjectChallenges from '@/components/projects/ProjectChallenges'
import TechnologyStack from '@/components/projects/TechnologyStack'
import ScreenshotGallery from '@/components/projects/ScreenshotGallery'
import FadeIn from '@/components/animations/FadeIn'
import styles from './ProjectPage.module.css'

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params
  const project = projects.find((item) => item.id === id)

  if (!project) return { title: 'Projet non trouvé' }

  return {
    title: `${project.title} - Portfolio`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const project = projects.find((item) => item.id === id)

  if (!project) notFound()

  const related = projects.filter((item) => item.id !== project.id).slice(0, 3)

  return (
    <div className={styles.page}>
      {/* Éléments décoratifs */}
      <div className={styles.backgroundDecor}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gridPattern} />
      </div>

      <div className={styles.container}>
        {/* Fil d'Ariane */}
        <FadeIn>
          <nav className={styles.breadcrumb}>
            <Link href="/projects" className={styles.breadcrumbLink}>
              <ArrowLeft className="h-4 w-4" />
              <span>Retour aux projets</span>
            </Link>
            <div className={styles.breadcrumbActions}>
              <button className={styles.breadcrumbAction} title="Partager">
                <Share2 className="h-4 w-4" />
              </button>
              <button className={styles.breadcrumbAction} title="Sauvegarder">
                <Bookmark className="h-4 w-4" />
              </button>
            </div>
          </nav>
        </FadeIn>

        {/* Hero Section */}
        <FadeIn delay={0.1}>
          <section className={styles.hero}>
            <div className={styles.heroContent}>
              {/* Badges */}
              <div className={styles.badges}>
                <span className={styles.categoryBadge}>
                  <Flag className="h-3.5 w-3.5" />
                  {project.category}
                </span>
                <span className={styles.dateBadge}>
                  <Calendar className="h-3.5 w-3.5" />
                  {project.year}
                </span>
                {project.features && (
                  <span className={styles.featuredBadge}>
                    <Sparkles className="h-3.5 w-3.5" />
                    Projet vedette
                  </span>
                )}
              </div>

              {/* Titre */}
              <h1 className={styles.title}>{project.title}</h1>

              {/* Description */}
              <p className={styles.description}>
                {project.longDescription}
              </p>

              {/* Statistiques rapides */}
              <div className={styles.quickStats}>
                <div className={styles.quickStat}>
                  <Clock className="h-4 w-4" />
                  <div>
                    <span className={styles.quickStatValue}>3 mois</span>
                    <span className={styles.quickStatLabel}>Développement</span>
                  </div>
                </div>
                <div className={styles.quickStat}>
                  <Users className="h-4 w-4" />
                  <div>
                    <span className={styles.quickStatValue}>Équipe de 4</span>
                    <span className={styles.quickStatLabel}>Collaborateurs</span>
                  </div>
                </div>
                <div className={styles.quickStat}>
                  <TrendingUp className="h-4 w-4" />
                  <div>
                    <span className={styles.quickStatValue}>100%</span>
                    <span className={styles.quickStatLabel}>Objectifs atteints</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className={styles.heroActions}>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryButton}
                >
                  <Github className="h-4 w-4" />
                  <span>Code source</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.secondaryButton}
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Démo en ligne</span>
                  </a>
                )}
              </div>
            </div>

            {/* Image décorative */}
            <div className={styles.heroDecoration}>
              <div className={styles.heroImagePlaceholder}>
                <Target className="h-16 w-16" />
                <span>Aperçu du projet</span>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Contenu principal */}
        <div className={styles.mainGrid}>
          {/* Colonne principale */}
          <div className={styles.mainColumn}>
            {/* Objectifs et périmètre */}
            <FadeIn delay={0.2}>
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIcon}>
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className={styles.sectionTitle}>Objectifs et périmètre</h2>
                    <p className={styles.sectionSubtitle}>
                      Ce projet a été conçu pour une qualité UX solide, une ingénierie scalable 
                      et des décisions produit maintenables.
                    </p>
                  </div>
                </div>

                <div className={styles.featuresGrid}>
                  {project.features.map((feature, index) => (
                    <div key={feature} className={styles.featureCard}>
                      <div className={styles.featureNumber}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className={styles.featureContent}>
                        <div className={styles.featureDot} />
                        <p>{feature}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* Galerie de captures */}
            <FadeIn delay={0.3}>
              <ScreenshotGallery projectId={project.id} />
            </FadeIn>

            {/* Défis et solutions */}
            <FadeIn delay={0.4}>
              <ProjectChallenges project={project} />
            </FadeIn>
          </div>

          {/* Colonne latérale */}
          <aside className={styles.sideColumn}>
            <FadeIn delay={0.25} direction="left">
              <TechnologyStack technologies={project.technologies} />
            </FadeIn>

            <FadeIn delay={0.35} direction="left">
              <section className={styles.actionsCard}>
                <div className={styles.actionsHeader}>
                  <Zap className="h-5 w-5" />
                  <h3 className={styles.actionsTitle}>Actions</h3>
                </div>
                
                <div className={styles.actionsList}>
                  <Link href="/contact" className={styles.actionLink}>
                    <div className={styles.actionContent}>
                      <span className={styles.actionLabel}>Discuter d'un projet similaire</span>
                      <span className={styles.actionDescription}>
                        Je suis disponible pour en parler
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  
                  <Link href="/projects" className={styles.actionLinkPrimary}>
                    <div className={styles.actionContent}>
                      <span className={styles.actionLabel}>Explorer plus de projets</span>
                      <span className={styles.actionDescription}>
                        Voir d'autres réalisations
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </section>
            </FadeIn>
          </aside>
        </div>

        {/* Projets similaires */}
        <FadeIn delay={0.5}>
          <section className={styles.relatedSection}>
            <div className={styles.relatedHeader}>
              <div>
                <h2 className={styles.relatedTitle}>Plus de projets</h2>
                <p className={styles.relatedSubtitle}>
                  Découvrez d'autres réalisations similaires
                </p>
              </div>
              <Link href="/projects" className={styles.viewAllLink}>
                Voir tout
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className={styles.relatedGrid}>
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/projects/${item.id}`}
                  className={styles.relatedCard}
                >
                  <div className={styles.relatedCardContent}>
                    <span className={styles.relatedCategory}>
                      {item.category}
                    </span>
                    <h3 className={styles.relatedCardTitle}>
                      {item.title}
                    </h3>
                    <p className={styles.relatedCardDescription}>
                      {item.description}
                    </p>
                  </div>
                  <div className={styles.relatedCardArrow}>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  )
}