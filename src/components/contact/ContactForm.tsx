// components/contact/ContactForm.tsx
'use client'

import { useState } from 'react'
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis'
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) 
      newErrors.email = 'Email invalide'
    if (!formData.subject.trim()) newErrors.subject = 'Le sujet est requis'
    if (!formData.message.trim()) newErrors.message = 'Le message est requis'
    
    return newErrors
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi')
      }

      setIsSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setErrors({})
      
      setTimeout(() => setIsSuccess(false), 5000)

    } catch (error) {
      console.error('Erreur:', error)
      setErrors({ submit: 'Une erreur est survenue. Veuillez réessayer.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
          <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
          Message envoyé! 🎉
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Je vous répondrai dans les plus brefs délais. Merci pour votre message!
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nom & Email */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Votre nom *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.name 
                ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors`}
            placeholder="John Doe"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Votre email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email 
                ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors`}
            placeholder="john@example.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Sujet */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Sujet *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.subject 
              ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary'
          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors`}
          placeholder="Proposition de stage / Projet collaboratif"
          disabled={isSubmitting}
        />
        {errors.subject && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.message 
              ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary'
          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors resize-none`}
          placeholder="Décrivez votre projet, vos besoins ou posez-moi une question..."
          disabled={isSubmitting}
        />
        {errors.message && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.message}
          </p>
        )}
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-right">
          {formData.message.length}/1000 caractères
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg flex items-center justify-center gap-3"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Envoyer le message
            </>
          )}
        </button>
        
        {errors.submit && (
          <p className="mt-4 text-sm text-red-600 dark:text-red-400 text-center">
            {errors.submit}
          </p>
        )}
        
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          * Champs obligatoires. Je m'engage à répondre dans les 48h.
        </p>
      </div>
    </form>
  )
}