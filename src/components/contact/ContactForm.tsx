'use client'

import { useState, useRef } from 'react'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
  Send, Loader2, CheckCircle2, AlertCircle, 
  User, Mail, FileText, MessageSquare, 
  Sparkles, ArrowRight, Clock, Shield
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact'
import styles from './ContactForm.module.css'

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      honeypot: '',
    },
  })

  const messageLength = watch('message')?.length ?? 0
  const formValues = watch()

  // Calculer la complétion du formulaire
  const completionPercentage = (() => {
    const fields = [formValues.name, formValues.email, formValues.subject, formValues.message]
    const filledFields = fields.filter(field => field && field.length > 0).length
    return Math.round((filledFields / fields.length) * 100)
  })()

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Échec de l\'envoi du message')
      }
      setIsSuccess(true)
      reset()
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const successVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 25 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: -20,
      transition: { duration: 0.2 }
    },
  }

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            variants={successVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={styles.successMessage}
          >
            <motion.div 
              className={styles.successIcon}
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CheckCircle2 className="h-10 w-10" />
            </motion.div>
            
            <motion.h3 
              className={styles.successTitle}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Message envoyé avec succès !
            </motion.h3>
            
            <motion.p 
              className={styles.successDescription}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Merci de m'avoir contactée. Je vous répondrai dans les plus brefs délais.
            </motion.p>

            <motion.div 
              className={styles.successDetails}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className={styles.successDetailItem}>
                <Clock className="h-4 w-4" />
                <span>Réponse sous 24-48h</span>
              </div>
              <div className={styles.successDetailItem}>
                <Shield className="h-4 w-4" />
                <span>Message envoyé en toute sécurité</span>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit(onSubmit)}
            className={styles.form}
          >
            {/* Champ Honeypot caché */}
            <div className={styles.hidden}>
              <input type="text" {...register('honeypot')} tabIndex={-1} autoComplete="off" />
            </div>

            {/* En-tête du formulaire */}
            <div className={styles.header}>
              <div className={styles.headerContent}>
                <motion.div 
                  className={styles.headerIcon}
                  whileHover={{ rotate: 15 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Sparkles className="h-5 w-5" />
                </motion.div>
                <div>
                  <h2 className={styles.title}>Parlons de votre projet</h2>
                  <p className={styles.subtitle}>
                    Remplissez le formulaire ci-dessous et je vous répondrai rapidement.
                  </p>
                </div>
              </div>

              {/* Barre de progression */}
              <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                  <motion.div 
                    className={styles.progressFill}
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                </div>
                <span className={styles.progressText}>
                  {completionPercentage}% complété
                </span>
              </div>
            </div>

            {/* Champs du formulaire */}
            <div className={styles.fieldsGrid}>
              <Field
                label="Nom complet"
                icon={User}
                error={errors.name?.message}
                isFocused={focusedField === 'name'}
                input={
                  <input
                    {...register('name')}
                    className={styles.input}
                    placeholder="Votre nom et prénom"
                    disabled={isSubmitting}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                  />
                }
              />

              <Field
                label="Email"
                icon={Mail}
                error={errors.email?.message}
                isFocused={focusedField === 'email'}
                input={
                  <input
                    type="email"
                    {...register('email')}
                    className={styles.input}
                    placeholder="vous@domaine.com"
                    disabled={isSubmitting}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                  />
                }
              />
            </div>

            <Field
              label="Sujet"
              icon={FileText}
              error={errors.subject?.message}
              isFocused={focusedField === 'subject'}
              input={
                <input
                  {...register('subject')}
                  className={styles.input}
                  placeholder="Stage, projet, collaboration..."
                  disabled={isSubmitting}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                />
              }
            />

            <Field
              label="Message"
              icon={MessageSquare}
              error={errors.message?.message}
              isFocused={focusedField === 'message'}
              input={
                <div className={styles.textareaContainer}>
                  <textarea
                    rows={6}
                    {...register('message')}
                    className={`${styles.input} ${styles.textarea}`}
                    placeholder="Décrivez votre projet, vos objectifs et le contexte..."
                    disabled={isSubmitting}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <div className={styles.textareaFooter}>
                    <span className={styles.charCount}>
                      {messageLength}/1000 caractères
                    </span>
                    {messageLength > 800 && (
                      <motion.span 
                        className={styles.charWarning}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        Plus que {1000 - messageLength} caractères
                      </motion.span>
                    )}
                  </div>
                </div>
              }
            />

            {/* Bouton de soumission */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className={`h-5 w-5 ${styles.spinner}`} />
                  <span>Envoi en cours...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Envoyer le message</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
              <span className={styles.submitGlow} />
            </motion.button>

            {/* Note de confidentialité */}
            <p className={styles.privacy}>
              <Shield className="h-3.5 w-3.5" />
              Vos informations sont sécurisées et ne seront jamais partagées.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

function Field({
  label,
  icon: Icon,
  input,
  error,
  isFocused,
}: {
  label: string
  icon: any
  input: ReactNode
  error?: string
  isFocused?: boolean
}) {
  return (
    <motion.label 
      className={`${styles.field} ${error ? styles.fieldError : ''} ${isFocused ? styles.fieldFocused : ''}`}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <span className={styles.fieldLabel}>
        <span className={styles.fieldIcon}>
          <Icon className="h-4 w-4" />
        </span>
        {label}
      </span>
      {input}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={styles.errorMessage}
          >
            <AlertCircle className="h-3.5 w-3.5" />
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.label>
  )
}