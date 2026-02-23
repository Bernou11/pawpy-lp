import { config } from '../config.js';

interface SenderSubscriberResponse {
    data: {
        id: string;
        email: string;
        subscriber_tags: Array<{
            id: string;
            title: string;
        }>;
    };
}

interface CampaignResponse {
    data: {
        id: string;
    };
}

class SenderService {
    private baseUrl = 'https://api.sender.net/v2';
    private headers = {
        'Authorization': `Bearer ${config.SENDER_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    async addToTempGroup(email: string, reactivate: boolean = true): Promise<void> {
        const data: any = {
            email,
            groups: [config.SENDER_TEMP_GROUP_ID],
        };

        // Always try to reactivate in case they were previously unsubscribed
        if (reactivate) {
            data.subscriber_status = 'ACTIVE';
        }

        const response = await fetch(`${this.baseUrl}/subscribers`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Failed to add subscriber: ${error}`);
        }
    }

    async moveToNewsletterGroup(email: string): Promise<void> {
        try {
            // Get subscriber ID and current groups
            const getResponse = await fetch(
                `${this.baseUrl}/subscribers/${encodeURIComponent(email)}`,
                { method: 'GET', headers: this.headers }
            );

            if (!getResponse.ok) {
                throw new Error('Subscriber not found');
            }

            const subscriberData = await getResponse.json() as SenderSubscriberResponse;
            const subscriberId = subscriberData.data.id;

            console.log('Subscriber ID:', subscriberId);

            // Remove from "New subscriber" group
            const removeResponse = await fetch(
                `${this.baseUrl}/subscribers/groups/${config.SENDER_TEMP_GROUP_ID}`,
                {
                    method: 'DELETE',
                    headers: this.headers,
                    body: JSON.stringify({
                        subscribers: [email]
                    }),
                }
            );

            if (!removeResponse.ok) {
                const error = await removeResponse.text();
                console.warn('Failed to remove from New subscriber group:', error);
            } else {
                console.log(`✅ Removed from New subscriber group`);
            }

            // Add to Newsletter group AND reactivate if unsubscribed
            const patchResponse = await fetch(
                `${this.baseUrl}/subscribers/${subscriberId}`,
                {
                    method: 'PATCH',
                    headers: this.headers,
                    body: JSON.stringify({
                        groups: [config.SENDER_NEWSLETTER_GROUP_ID],
                        subscriber_status: 'ACTIVE'  // Reactivate if they were unsubscribed
                    }),
                }
            );

            if (!patchResponse.ok) {
                const error = await patchResponse.text();
                throw new Error(`Failed to add to Newsletter: ${error}`);
            }

            console.log(`✅ Moved ${email} to Newsletter group`);
        } catch (error) {
            console.error('Error moving subscriber:', error);
            throw error;
        }
    }

    async getSubscriberData(email: string): Promise<any> {
        const response = await fetch(
            `${this.baseUrl}/subscribers/${encodeURIComponent(email)}`,
            {
                method: 'GET',
                headers: this.headers,
            }
        );

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Failed to get subscriber: ${error}`);
        }

        const data = await response.json() as SenderSubscriberResponse;
        return data.data; // Return just the data object
    }

    async createEmailCampaign(title: string, subject: string, content: string, preview?: string): Promise<void> {
        const fullHtmlContent = this.buildEmailTemplate(content);

        const data = {
            title: title,
            subject: subject,
            from: "Pawpy",
            preheader: preview || "",
            reply_to: "contact@pawpy.fr",
            content_type: "html",
            google_analytics: 1,
            groups: [config.SENDER_NEWSLETTER_GROUP_ID],
            content: fullHtmlContent
        };

        // Step 1: Create the campaign
        const response = await fetch(`${this.baseUrl}/campaigns`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Failed to create campaign: ${error}`);
        }

        const responseData = await response.json() as CampaignResponse;
        const campaignId = responseData.data.id;

        console.log(`✅ Campaign created with ID: ${campaignId}`);

        // Step 2: Send the campaign
        const sendResponse = await fetch(`${this.baseUrl}/campaigns/${campaignId}/send`, {
            method: 'POST',
            headers: this.headers,
        });

        if (!sendResponse.ok) {
            const error = await sendResponse.text();
            throw new Error(`Campaign created but failed to send: ${error}`);
        }

        console.log(`✅ Campaign sent successfully`);
    }

    private buildEmailTemplate(content: string): string {
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
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        .header {
            background-color: #2563eb;
            padding: 30px 20px;
            text-align: center;
        }
        .header img {
            max-width: 150px;
            height: auto;
        }
        .content {
            padding: 40px 20px;
            color: #333333;
            line-height: 1.6;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666666;
            border-top: 1px solid #e5e7eb;
        }
        .footer a {
            color: #2563eb;
            text-decoration: none;
        }
        .social-links {
            margin: 15px 0;
        }
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #666666;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <img src="https://your-domain.com/logo.png" alt="Pawpy Logo">
        </div>
        
        <!-- Content -->
        <div class="content">
            ${content}
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="social-links">
                <a href="https://facebook.com/yourpage">Facebook</a>
                <a href="https://instagram.com/yourpage">Instagram</a>
                <a href="https://twitter.com/yourpage">Twitter</a>
            </div>
            <p>
                © ${new Date().getFullYear()} Pawpy. Tous droits réservés.
            </p>
            <p>
                <a href="{{unsubscribe_link}}">Se désinscrire</a> | 
                <a href="https://pawpy.fr">Visiter notre site</a>
            </p>
            <p style="margin-top: 15px; font-size: 11px;">
                Pawpy, 40 rue du Chemin Vert<br>
                75011 Paris, France
            </p>
        </div>
    </div>
</body>
</html>
        `.trim();
    }
}

export const senderNetService = new SenderService();