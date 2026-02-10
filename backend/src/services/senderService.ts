import { config } from '../config.js';
import { SenderNetSubscriber } from '../types.js';
import {CampaignResponse} from "../types.js";

type HeadersInit = Record<string, string> | [string, string][] | Headers;

class SenderService {
    private readonly baseUrl = 'https://api.sender.net/v2';
    private readonly headers: HeadersInit;

    constructor() {
        this.headers = {
            'Authorization': `Bearer ${config.SENDER_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
    }

    async addToTempGroup(email: string): Promise<void> {
        const subscriber: SenderNetSubscriber = {
            email,
            groups: [config.SENDER_TEMP_GROUP_ID],
        };

        const response = await fetch(`${this.baseUrl}/subscribers`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(subscriber),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Failed to add subscriber to temp group: ${error}`);
        }
    }

    async removeFromTempGroup(email: string): Promise<void> {
        const subscriber: SenderNetSubscriber = {
            email,
            groups: [config.SENDER_TEMP_GROUP_ID]
        };

        const response = await fetch(`${this.baseUrl}/subscribers`, {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify(subscriber),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Failed to remove subscriber from temp group: ${error}`);
        }
    }

    async removeFromNewsletterGroup(email: string): Promise<void> {
        const subscriber: SenderNetSubscriber = {
            email,
            groups: [config.SENDER_NEWSLETTER_GROUP_ID]
        };

        const response = await fetch(`${this.baseUrl}/subscribers`, {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify(subscriber),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Failed to remove subscriber from newsletter group: ${error}`);
        }
    }

    async moveToNewsletterGroup(email: string): Promise<void> {
        try {
            // Step 1: Get the subscriber's ID
            const getResponse = await fetch(
                `${this.baseUrl}/subscribers/${encodeURIComponent(email)}`,
                {
                    method: 'GET',
                    headers: this.headers,
                }
            );

            if (!getResponse.ok) {
                throw new Error('Subscriber not found');
            }

            const subscriberData = await getResponse.json() as { data: { id: string } };
            const subscriberId = subscriberData.data.id;

            console.log('Subscriber ID:', subscriberId);

            // Step 2: Remove from "New subscriber" group
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
                console.log(`✅ Removed ${email} from New subscriber group`);
            }

            // Step 3: Add to Newsletter group using PATCH
            const patchResponse = await fetch(
                `${this.baseUrl}/subscribers/${subscriberId}`,
                {
                    method: 'PATCH',
                    headers: this.headers,
                    body: JSON.stringify({
                        groups: [config.SENDER_NEWSLETTER_GROUP_ID]
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

    async createEmailCampaign(title: string, subject: string, content: string, preview?: string): Promise<void> {
        const data = {
            title: title,
            subject: subject,
            from: "Pawpy",
            preheader: preview || "",
            reply_to: "contact@pawpy.fr",
            content_type: "html",
            google_analytics: 1,
            groups: [config.SENDER_NEWSLETTER_GROUP_ID],
            content: content
        };

        const response = await fetch(`${this.baseUrl}/campaigns`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Failed to create campaign: ${error}`);
        } else {
            const responseData = await response.json() as CampaignResponse;

            await fetch(`${this.baseUrl}/campaigns/${responseData.data.id}`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(data),
            });
        }
    }
}

export const senderNetService = new SenderService();