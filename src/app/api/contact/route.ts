// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactFormSchema } from '@/lib/validations/contact'
export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validation des données
    const result = contactFormSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: result.error.format() },
        { status: 400 }
      )
    }

    // Vérification du honeypot (anti-spam)
    if (body.honeypot) {
      return NextResponse.json(
        { error: 'Requête bloquée' },
        { status: 400 }
      )
    }

    const { name, email, subject, message } = result.data

    // Envoi de l'email
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: [process.env.EMAIL_TO!],
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; color: white; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #667eea; display: block; margin-bottom: 5px; }
            .value { background: white; padding: 10px 15px; border-radius: 5px; border-left: 4px solid #667eea; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✉️ Nouveau message depuis votre portfolio</h1>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">👤 De :</span>
                <div class="value">${name} (${email})</div>
              </div>
              <div class="field">
                <span class="label">📌 Sujet :</span>
                <div class="value">${subject}</div>
              </div>
              <div class="field">
                <span class="label">💬 Message :</span>
                <div class="value" style="white-space: pre-wrap;">${message}</div>
              </div>
            </div>
            <div class="footer">
              <p>Cet email a été envoyé depuis le formulaire de contact de votre portfolio.</p>
              <p>🕐 ${new Date().toLocaleString('fr-FR')}</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Nouveau message depuis le portfolio :

De : ${name} (${email})
Sujet : ${subject}

Message :
${message}

---
Envoyé le ${new Date().toLocaleString('fr-FR')}
      `
    })

    if (error) {
      console.error('Erreur Resend:', error)
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Email envoyé avec succès!', data },
      { status: 200 }
    )

  } catch (error) {
    console.error('Erreur serveur:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}