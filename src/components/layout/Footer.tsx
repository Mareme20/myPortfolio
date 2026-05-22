// components/layout/Footer.tsx
import { Heart } from 'lucide-react'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.separator} />
        
        <div className={styles.content}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Marième Ndiaye
          </p>
          
          <p className={styles.tagline}>
            <Heart className={styles.icon} />
            Conçu avec précision et passion
          </p>
        </div>
      </div>
    </footer>
  )
}