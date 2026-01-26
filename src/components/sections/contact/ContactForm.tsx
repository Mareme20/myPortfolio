// components/contact/ContactForm.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast, Toaster } from 'sonner'
import { contactFormSchema, ContactFormData } from '@/lib/validations/contact'
const { register, handleSubmit, watch, formState: { errors } } = useForm();
export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const watchMessage = watch("message"); // "message" doit correspondre au nom dans register("message")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      honeypot: ''
    }
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Une erreur est survenue')
      }

      setIsSuccess(true)
      toast.success('Message envoyé avec succès! Je vous répondrai dans les plus brefs délais.')
      reset()

      // Réinitialiser le succès après 5 secondes
      setTimeout(() => setIsSuccess(false), 5000)

    } catch (error) {
      console.error('Erreur:', error)
      toast.error(error instanceof Error ? error.message : 'Échec de l\'envoi. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Toaster 
        position="top-right"
        expand={false}
        richColors
        closeButton
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-purple-600 p-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Envoyez-moi un message</h2>
          <p className="opacity-90">
            Discutons de votre projet, d'une opportunité ou simplement échangeons sur la tech!
          </p>
        </div>

        <div className="p-8">
          <AnimatePresence>
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
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
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
                >
                  Envoyer un autre message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Honeypot field (hidden) */}
                <div className="hidden">
                  <input
                    type="text"
                    {...register('honeypot')}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Nom & Email en ligne */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Votre nom *
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name')}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.name 
                          ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors`}
                      placeholder="John Doe"
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center"
                      >
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.name.message}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Votre email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email')}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.email 
                          ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors`}
                      placeholder="john@example.com"
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center"
                      >
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.email.message}
                      </motion.p>
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
                    {...register('subject')}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.subject 
                        ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors`}
                    placeholder="Proposition de stage / Projet collaboratif"
                    disabled={isSubmitting}
                  />
                  {errors.subject && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center"
                    >
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.subject.message}
                    </motion.p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register('message')}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.message 
                        ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors resize-none`}
                    placeholder="Décrivez votre projet, vos besoins ou posez-moi une question..."
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center"
                    >
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.message.message}
                    </motion.p>
                  )}
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-right">
                    {watchMessage ? watchMessage.length : 0}/1000 caractères
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg flex items-center justify-center gap-3"
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
                  
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    * Champs obligatoires. Je m'engage à répondre dans les 48h.
                  </p>
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  )
}