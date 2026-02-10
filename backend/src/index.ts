import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { config } from './config.js';
import { emailService } from './services/emailService.js';
import { senderNetService } from './services/senderService.js';
import { confirmationService } from './services/confirmationService.js';
import { SubscribeRequest, SubscribeResponse, ErrorResponse, CampaignData } from './types.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Email validation
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Subscribe endpoint
app.post('/api/subscribe', async (
    req: Request<{}, SubscribeResponse | ErrorResponse, SubscribeRequest>,
    res: Response<SubscribeResponse | ErrorResponse>
): Promise<void> => {
    try {
        const { email } = req.body;

        // Validate email
        if (!email) {
            res.status(400).json({ error: 'Email is required' });
            return;
        }

        if (!isValidEmail(email)) {
            res.status(400).json({ error: 'Invalid email format' });
            return;
        }

        // Generate confirmation token
        const token = confirmationService.generateToken();
        const confirmUrl = `${config.FRONTEND_URL}/confirmation?email=${encodeURIComponent(email)}&token=${token}`;

        // Store pending confirmation
        confirmationService.addPendingConfirmation(token, email);

        // Send confirmation email
        await emailService.sendConfirmationEmail(email, confirmUrl);

        // Add to Sender.net temporary group
        await senderNetService.addToTempGroup(email);

        res.json({ success: true });
    } catch (error) {
        console.error('Subscribe error:', error);
        res.status(500).json({ error: 'Subscription failed' });
    }
});

app.post('/api/createCampaign', async (
    req: Request<{}, SubscribeResponse | ErrorResponse, CampaignData>,
    res: Response<SubscribeResponse | ErrorResponse>
): Promise<void> => {
    try {
        const { title, subject, content, preheader } = req.body;

        // Validate email
        if (!title || !subject || !content) {
            res.status(400).json({ error: "Le titre, l'objet et le contenu sont requis" });
            return;
        }

        await senderNetService.createEmailCampaign(title, subject, content, preheader);

        res.json({ success: true });
    } catch (error) {
        console.error('Un soucis est survenu lors de la création de la campagne:', error);
        res.status(500).json({ error: 'Un soucis est survenu lors de la création de la campagne' });
    }
});

app.delete('/api/unsubscribeTempGroup', async (
    req: Request<{}, SubscribeResponse | ErrorResponse, SubscribeRequest>,
    res: Response<SubscribeResponse | ErrorResponse>
): Promise<void> => {
    try {
        const { email } = req.body;

        // Validate email
        if (!email) {
            res.status(400).json({ error: 'Email is required' });
            return;
        }

        if (!isValidEmail(email)) {
            res.status(400).json({ error: 'Invalid email format' });
            return;
        }

        await senderNetService.removeFromTempGroup(email);

        res.json({ success: true });
    } catch (error) {
        console.error('Unsubscribe error:', error);
        res.status(500).json({ error: 'Unsubscription failed' });
    }
});

app.delete('/api/unsubscribeNewsletterGroup', async (
    req: Request<{}, SubscribeResponse | ErrorResponse, SubscribeRequest>,
    res: Response<SubscribeResponse | ErrorResponse>
): Promise<void> => {
    try {
        const { email } = req.body;

        // Validate email
        if (!email) {
            res.status(400).json({ error: 'Email is required' });
            return;
        }

        if (!isValidEmail(email)) {
            res.status(400).json({ error: 'Invalid email format' });
            return;
        }

        await senderNetService.removeFromNewsletterGroup(email);

        res.json({ success: true });
    } catch (error) {
        console.error('Unsubscribe error:', error);
        res.status(500).json({ error: 'Unsubscription failed' });
    }
});

// Confirm endpoint
app.get('/api/confirm', async (req: Request, res: Response): Promise<void> => {
    try {
        const { token } = req.query;

        if (!token || typeof token !== 'string') {
            res.status(400).send('Invalid confirmation link');
            return;
        }

        const confirmation = confirmationService.getConfirmation(token);

        if (!confirmation) {
            res.status(400).send('Invalid or expired confirmation link');
            return;
        }

        // Check if expired
        if (confirmationService.isExpired(confirmation)) {
            confirmationService.removeConfirmation(token);
            res.status(400).send('Confirmation link has expired');
            return;
        }

        // Move subscriber to Newsletter group in Sender.net
        await senderNetService.moveToNewsletterGroup(confirmation.email);

        // Remove from pending confirmations
        confirmationService.removeConfirmation(token);

        res.json({ success: true, email: confirmation.email });
    } catch (error) {
        console.error('Confirm error:', error);
        res.status(500).send('Confirmation failed');
    }
});

// Health check endpoint
app.get('/api/health', async (_req: Request, res: Response): Promise<void> => {
    const smtpOk = await emailService.verifyConnection();
    const pendingCount = confirmationService.getPendingCount();

    res.json({
        status: 'ok',
        smtp: smtpOk ? 'connected' : 'disconnected',
        pendingConfirmations: pendingCount,
    });
});

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Backend running on port ${PORT}`);
    console.log(`📧 SMTP: ${config.SMTP_HOST}:${config.SMTP_PORT}`);
    console.log(`🌐 App URL: ${config.APP_URL}`);
});