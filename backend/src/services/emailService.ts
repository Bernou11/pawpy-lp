import nodemailer, { Transporter } from 'nodemailer';
import { config } from '../config.js';
import { EmailConfig } from '../types.js';

class EmailService {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.SMTP_HOST,
            port: config.SMTP_PORT,
            secure: config.SMTP_SECURE,
            auth: {
                user: config.SMTP_USER,
                pass: config.SMTP_PASS,
            },
        });
    }

    async sendConfirmationEmail(email: string, confirmUrl: string): Promise<void> {
        const emailConfig: EmailConfig = {
            from: `"Pawpy" <${config.SMTP_FROM}>`,
            to: email,
            subject: 'Confirmez votre inscription à la newsletter Pawpy',
            html: this.getConfirmationEmailTemplate(confirmUrl, email),
        };

        await this.transporter.sendMail(emailConfig);
    }

    async sendReminderEmail(email: string, confirmUrl: string): Promise<void> {
        const emailConfig: EmailConfig = {
            from: `"Pawpy" <${config.SMTP_FROM}>`,
            to: email,
            subject: 'Rappel : Confirmez votre inscription à la newsletter Pawpy',
            html: this.getReminderEmailTemplate(confirmUrl, email),
        };

        await this.transporter.sendMail(emailConfig);
    }

    private getConfirmationEmailTemplate(confirmUrl: string, email: string): string {
        const unsubscribeUrl = `${config.APP_URL}/unsubscribe?email=${encodeURIComponent(email)}`;
        return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: white;
            border-radius: 8px;
            overflow: hidden;
          }
          .header {
            background-color: #1a1a1a;
            padding: 40px;
            text-align: center;
          }
          .logo {
            color: white;
            font-size: 28px;
            font-weight: bold;
            margin: 0;
          }
          .content {
            padding: 40px;
          }
          h1 {
            font-size: 24px;
            color: #1a1a1a;
            margin: 0 0 20px;
          }
          p {
            font-size: 16px;
            color: #555;
            line-height: 1.6;
            margin: 0 0 20px;
          }
          .button {
            display: inline-block;
            padding: 16px 40px;
            background-color: #1a1a1a;
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            margin: 20px 0;
          }
          .footer {
            padding: 30px;
            text-align: center;
            background-color: #f4f4f4;
            font-size: 13px;
            color: #999;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="logo">Pawpy</h1>
          </div>
          <div class="content">
            <h1>Confirmez votre inscription à notre newsletter</h1>
            <p>Bonjour,</p>
            <p>Merci de vous être inscrit à notre newsletter ! Pour finaliser votre inscription, veuillez cliquer sur le bouton ci-dessous :</p>
            <div style="text-align: center;">
              <a href="${confirmUrl}" class="button">Confirmer mon inscription</a>
            </div>
            <p>Si vous n'avez pas demandé cette inscription, ignorez simplement cet email ou cliquez sur le lien si dessous : .</p>
            <a href="${unsubscribeUrl}">Se désabonner</a>
          </div>
          <div class="footer">
            <p><strong>Pawpy</strong></p>
            <p>40 rue du Chemin Vert, 75011 Paris, France</p>
            <p>© 2026 Pawpy. Tous droits réservés.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    }

    private getReminderEmailTemplate(confirmUrl: string, email: string): string {
        const unsubscribeUrl = `${config.APP_URL}/unsubscribe?email=${encodeURIComponent(email)}`;
        return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f4f4f4;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          table {
            border-collapse: collapse;
          }
          img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            display: block;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
          }
          .header {
            background-color: #1a1a1a;
            padding: 40px 20px;
            text-align: center;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            color: #ffffff;
            margin: 0;
          }
          .content {
            padding: 40px 30px;
            color: #333333;
          }
          .content h1 {
            font-size: 24px;
            font-weight: 600;
            color: #1a1a1a;
            margin: 0 0 20px 0;
            line-height: 1.3;
          }
          .content p {
            font-size: 16px;
            line-height: 1.6;
            color: #555555;
            margin: 0 0 20px 0;
          }
          .button-container {
            text-align: center;
            margin: 30px 0;
          }
          .confirm-button {
            display: inline-block;
            padding: 16px 40px;
            background-color: #1a1a1a;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 600;
            transition: background-color 0.3s ease;
          }
          .confirm-button:hover {
            background-color: #333333;
          }
          .alt-link {
            padding: 20px 30px;
            background-color: #f9f9f9;
            border-top: 1px solid #e5e5e5;
          }
          .alt-link p {
            font-size: 14px;
            color: #777777;
            margin: 0 0 10px 0;
            line-height: 1.5;
          }
          .alt-link a {
            color: #1a1a1a;
            word-break: break-all;
          }
          .footer {
            padding: 30px;
            text-align: center;
            background-color: #f4f4f4;
          }
          .footer p {
            font-size: 13px;
            color: #999999;
            margin: 0 0 10px 0;
            line-height: 1.5;
          }
          .footer a {
            color: #1a1a1a;
            text-decoration: underline;
          }
          .divider {
            height: 1px;
            background-color: #e5e5e5;
            margin: 20px 0;
          }
          @media only screen and (max-width: 600px) {
            .email-container {
              width: 100% !important;
            }
            .content {
              padding: 30px 20px !important;
            }
            .content h1 {
              font-size: 22px !important;
            }
            .confirm-button {
              padding: 14px 30px !important;
              font-size: 15px !important;
            }
            .header {
              padding: 30px 20px !important;
            }
          }
        </style>
      </head>
      <body>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td align="center" style="padding: 20px 0;">
              <table class="email-container" role="presentation" width="600" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td class="header">
                    <h1 class="logo">Pawpy</h1>
                  </td>
                </tr>
                <tr>
                  <td class="content">
                    <h1>Confirmez votre inscription à notre newsletter</h1>
                    <p>Bonjour,</p>
                    <p>Nous vous rappelons que vous avez souscrit à notre newsletter.</p>
                    <p>Pour finaliser votre inscription et commencer à recevoir nos actualités, veuillez cliquer sur le bouton ci-dessous :</p>
                    <div class="button-container">
                      <a href="${confirmUrl}" class="confirm-button">
                        Confirmer mon inscription
                      </a>
                    </div>
                    <p>Si vous ne répondez pas d'ici 12h, votre inscription sera automatiquement annulée et vous devrez renvoyer votre mail pour vous inscrire.</p>
                    <p>Une fois votre inscription confirmée, vous recevrez régulièrement nos meilleures actualités, conseils et offres exclusives.</p>
                    <p>Si vous n'avez pas demandé cette inscription, ignorez simplement cet email ou cliquez sur le lien si dessous : .</p>
                     <a href="${unsubscribeUrl}">Se désabonner</a>
                    <div class="divider"></div>
                  </td>
                </tr>
                <tr>
                  <td class="footer">
                    <p><strong>Pawpy</strong></p>
                    <p>40 rue du Chemin Vert, 75011 Paris, France</p>
                    <p>
                      <a href="${confirmUrl}" class="confirm-button">Se désabonner</a>
                      <a href="https://pawpy.fr">Visiter notre site</a>
                    </p>
                    <p style="margin-top: 20px;">
                      © 2026 Pawpy. Tous droits réservés.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
    }

    async verifyConnection(): Promise<boolean> {
        try {
            await this.transporter.verify();
            return true;
        } catch (error) {
            console.error('SMTP connection error:', error);
            return false;
        }
    }
}

export const emailService = new EmailService();